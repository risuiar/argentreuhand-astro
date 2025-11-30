declare const process: any;
import type { BlogResponse, BlogPostData } from "../types/blog";

// Helper para acceder a process.env solo si existe
const getProcessEnv = (key: string): string | undefined => {
  return typeof process !== "undefined" && process.env
    ? process.env[key]
    : undefined;
};

export async function fetchBlogPosts(
  locale: "de" | "es",
  page: number = 1,
  pageSize: number = 10
): Promise<BlogResponse> {
  // Use the correct CMS URL
  const CMS_API_URL = `${import.meta.env.VITE_CMS_URL}/api`;
  const CMS_BEARER_TOKEN =
    getProcessEnv("CMS_BEARER_TOKEN") || import.meta.env.CMS_BEARER_TOKEN;

  // Validate environment variables
  if (!CMS_BEARER_TOKEN) {
    throw new Error("CMS_BEARER_TOKEN environment variable is not set");
  }

  const url = `${CMS_API_URL}/arg-blogs/?filters[locale][$eq]=${locale}&sort=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate[0]=image1&populate[1]=image2`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${CMS_BEARER_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch blog posts: ${response.status} ${response.statusText}`
    );
  }

  return await response.json();
}

export async function fetchBlogPost(
  documentId: string,
  locale: "de" | "es"
): Promise<BlogPostData | null> {
  // Use the correct CMS URL
  const CMS_API_URL = `${import.meta.env.VITE_CMS_URL}/api`;
  const CMS_BEARER_TOKEN =
    getProcessEnv("CMS_BEARER_TOKEN") || import.meta.env.CMS_BEARER_TOKEN;

  // Validate environment variables
  if (!CMS_BEARER_TOKEN) {
    throw new Error("CMS_BEARER_TOKEN environment variable is not set");
  }

  const url = `${CMS_API_URL}/arg-blogs/?filters[documentId][$eq]=${documentId}&filters[locale][$eq]=${locale}&populate[0]=image1&populate[1]=image2`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${CMS_BEARER_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch blog post: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();

  if (!data.data || data.data.length === 0) {
    return null;
  }

  return transformBlogPost(data.data[0]);
}

export async function findCorrespondingBlogPost(
  currentDocumentId: string,
  currentLocale: "de" | "es",
  targetLocale: "de" | "es"
): Promise<string | null> {
  // If we're looking for the same locale, return the same documentId
  if (currentLocale === targetLocale) {
    return currentDocumentId;
  }

  try {
    // First, get the current post to extract its title
    const currentPost = await fetchBlogPost(currentDocumentId, currentLocale);
    if (!currentPost) {
      return null;
    }

    // Get all posts in the target locale
    const targetPosts = await fetchBlogPosts(targetLocale, 1, 100); // Get up to 100 posts

    // Try to find a post with the same title (case-insensitive)
    const matchingPost = targetPosts.data.find((post) => {
      const currentTitle = currentPost.title.toLowerCase().trim();
      const targetTitle = post.title.toLowerCase().trim();
      return currentTitle === targetTitle;
    });

    if (matchingPost) {
      return matchingPost.documentId;
    }

    // If no exact title match, try to find by similar content
    // This is a fallback for when titles are translated differently
    const currentExcerpt = currentPost.excerpt?.toLowerCase().trim() || "";

    const similarPost = targetPosts.data.find((post) => {
      const targetExcerpt = convertToHtml(post.description || [])
        .toLowerCase()
        .trim();
      // Simple similarity check - if they share significant words
      const currentWords = currentExcerpt
        .split(/\s+/)
        .filter((word) => word.length > 3);
      const targetWords = targetExcerpt
        .split(/\s+/)
        .filter((word) => word.length > 3);

      const commonWords = currentWords.filter((word) =>
        targetWords.includes(word)
      );
      return (
        commonWords.length >=
        Math.min(2, Math.min(currentWords.length, targetWords.length) * 0.3)
      );
    });

    if (similarPost) {
      return similarPost.documentId;
    }

    return null;
  } catch (error) {
    console.error("Error finding corresponding blog post:", error);
    return null;
  }
}

export function transformBlogPost(post: any): BlogPostData {
  // Helper to extract image object
  const extractImageObject = (img: any) => {
    if (!img) return undefined;
    return {
      id: img.id,
      url: img.url,
      width: img.width,
      height: img.height,
      alternativeText: img.alternativeText,
      caption: img.caption,
      formats: img.formats || null,
    };
  };

  // Get images (can be object or array)
  const img1 = post.image1 ? (Array.isArray(post.image1) ? post.image1[0] : post.image1) : null;
  const img2 = post.image2 ? (Array.isArray(post.image2) ? post.image2[0] : post.image2) : null;

  const featuredImage = extractImageObject(img1 || img2);
  const image2 = extractImageObject(img2);

  return {
    id: post.id,
    documentId: post.documentId,
    title: post.title,
    content:
      convertToHtml(post.body || []) ||
      (post.Content1 || "") + (post.Content2 ? "\n\n" + post.Content2 : ""),
    excerpt:
      stripHtmlTags(convertToHtml(post.description || [])) ||
      stripHtmlTags(post.description || ""),
    slug: post.documentId,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    createdAt: post.createdAt,
    featuredImage,
    image2,
    author: undefined,
    tags: [],
  };
}

function convertToHtml(content: any[]): string {
  if (!Array.isArray(content)) return "";

  return content
    .map((block) => {
      if (block.type === "paragraph") {
        const text =
          block.children
            ?.map((child: any) => {
              if (child.bold) {
                return `<strong>${child.text}</strong>`;
              }
              return child.text || "";
            })
            .join("") || "";
        return `<p>${text}</p>`;
      }
      return "";
    })
    .join("");
}

function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

export function formatDate(dateString: string, locale: "de" | "es"): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const localeMap = {
    de: "de-DE",
    es: "es-ES",
  };

  return date.toLocaleDateString(localeMap[locale], options);
}

export function truncateText(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
}
