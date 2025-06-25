import type { BlogResponse, BlogPostData } from "../types/blog";

const CMS_API_URL = import.meta.env.PUBLIC_CMS_API_URL;
const CMS_BEARER_TOKEN = import.meta.env.CMS_BEARER_TOKEN;

export async function fetchBlogPosts(
  locale: "de-CH" | "es-AR",
  page: number = 1,
  pageSize: number = 10
): Promise<BlogResponse> {
  const url = `${CMS_API_URL}/blogs/?filters[locale][$eq]=${locale}&sort=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate[0]=image&populate[1]=image2`;

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
  locale: "de-CH" | "es-AR"
): Promise<BlogPostData | null> {
  const url = `${CMS_API_URL}/blogs/?filters[documentId][$eq]=${documentId}&filters[locale][$eq]=${locale}&populate[0]=image&populate[1]=image2`;

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

export function transformBlogPost(post: any): BlogPostData {
  const baseUrl = "https://cms.mateando.com";

  return {
    id: post.id,
    documentId: post.documentId,
    title: post.title,
    content: convertToHtml(post.body || []),
    excerpt: stripHtmlTags(convertToHtml(post.description || [])),
    slug: post.documentId,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    createdAt: post.createdAt,
    featuredImage:
      post.image && post.image.length > 0
        ? `${baseUrl}${
            post.image[0].formats?.thumbnail?.url || post.image[0].url
          }`
        : undefined,
    featuredImageLarge:
      post.image && post.image.length > 0
        ? `${baseUrl}${post.image[0].formats?.large?.url || post.image[0].url}`
        : undefined,
    image2:
      post.image2 && post.image2.length > 0
        ? `${baseUrl}${
            post.image2[0].formats?.large?.url || post.image2[0].url
          }`
        : undefined,
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

export function formatDate(
  dateString: string,
  locale: "de-CH" | "es-AR"
): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const localeMap = {
    "de-CH": "de-CH",
    "es-AR": "es-AR",
  };

  return date.toLocaleDateString(localeMap[locale], options);
}

export function truncateText(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
}
