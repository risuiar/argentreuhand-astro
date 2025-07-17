// Strapi configuration
export const STRAPI_CONFIG = {
  // Base URL for Strapi API
  URL: import.meta.env.PUBLIC_STRAPI_URL || "http://localhost:1337",

  // API token for authenticated requests
  TOKEN: import.meta.env.STRAPI_TOKEN,

  // Environment detection
  IS_DEV: import.meta.env.DEV,

  // Cache settings
  CACHE_DURATION: 3600, // 1 hour in seconds

  // Default locale
  DEFAULT_LOCALE: "es" as const,

  // Supported locales
  SUPPORTED_LOCALES: ["es", "de"] as const,

  // Content types
  CONTENT_TYPES: {
    PAGE: "page",
    BLOG: "blog",
    SERVICE: "service",
    TESTIMONIAL: "testimonial",
    FAQ: "faq",
    HERO: "hero",
    WHY_CHOOSE_US: "why-choose-us",
    FOOTER: "footer",
  } as const,
};

// Helper function to build Strapi API URLs
export function buildStrapiUrl(
  endpoint: string,
  params?: Record<string, any>
): string {
  const url = new URL(`${STRAPI_CONFIG.URL}/api/${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value.toString());
      }
    });
  }

  return url.toString();
}

// Helper function to get headers for Strapi requests
export function getStrapiHeaders(): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (STRAPI_CONFIG.TOKEN) {
    headers["Authorization"] = `Bearer ${STRAPI_CONFIG.TOKEN}`;
  }

  return headers;
}

// Helper function to get cache options
export function getCacheOptions(): RequestInit {
  return {
    cache: STRAPI_CONFIG.IS_DEV ? "no-store" : "force-cache",
  };
}

// Type definitions for Strapi content
export interface StrapiContent {
  id: number;
  attributes: {
    title: string;
    content: string;
    slug?: string;
    excerpt?: string;
    publishedAt: string;
    updatedAt: string;
    locale: string;
    [key: string]: any;
  };
}

export interface StrapiResponse<T = any> {
  data: T | T[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
