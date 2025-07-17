import { useState, useEffect } from "react";

interface StrapiResponse<T = any> {
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

interface StrapiContent {
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

interface UseStrapiOptions {
  contentType: string;
  slug?: string;
  id?: string;
  locale?: "es" | "de";
  populate?: string;
  filters?: Record<string, any>;
  sort?: string;
  pagination?: {
    page?: number;
    pageSize?: number;
  };
}

export function useStrapi<T = StrapiContent>(options: UseStrapiOptions) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    contentType,
    slug,
    id,
    locale = "es",
    populate = "*",
    filters = {},
    sort,
    pagination,
  } = options;

  // Strapi configuration
  const STRAPI_URL =
    import.meta.env.PUBLIC_STRAPI_URL || "http://localhost:1337";
  const STRAPI_TOKEN = import.meta.env.STRAPI_TOKEN;
  const isDev = import.meta.env.DEV;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Build the API endpoint
        let endpoint = `${STRAPI_URL}/api/${contentType}s`;

        if (id) {
          endpoint += `/${id}`;
        }

        // Build query parameters
        const params = new URLSearchParams();

        if (slug && !id) {
          params.append("filters[slug][$eq]", slug);
        }

        // Add locale filter
        params.append("locale", locale);

        // Add populate
        if (populate) {
          params.append("populate", populate);
        }

        // Add custom filters
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(`filters[${key}]`, value.toString());
          }
        });

        // Add sorting
        if (sort) {
          params.append("sort", sort);
        }

        // Add pagination
        if (pagination) {
          if (pagination.page) {
            params.append("pagination[page]", pagination.page.toString());
          }
          if (pagination.pageSize) {
            params.append(
              "pagination[pageSize]",
              pagination.pageSize.toString()
            );
          }
        }

        // Add query string if we have parameters
        if (params.toString()) {
          endpoint += `?${params.toString()}`;
        }

        const headers: HeadersInit = {
          "Content-Type": "application/json",
        };

        if (STRAPI_TOKEN) {
          headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;
        }

        const response = await fetch(endpoint, {
          headers,
          // In development, don't cache. In production, cache for 1 hour
          cache: isDev ? "no-store" : "force-cache",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: StrapiResponse<T> = await response.json();

        // Handle different response structures
        if (result.data) {
          if (Array.isArray(result.data)) {
            setData(result.data[0] as T); // Take first item if array
          } else {
            setData(result.data as T);
          }
        } else {
          throw new Error("No data received from Strapi");
        }
      } catch (err) {
        console.error("Error fetching Strapi content:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    contentType,
    slug,
    id,
    locale,
    populate,
    JSON.stringify(filters),
    sort,
    JSON.stringify(pagination),
    STRAPI_URL,
    STRAPI_TOKEN,
    isDev,
  ]);

  return { data, loading, error };
}

// Helper function to fetch multiple items
export function useStrapiList<T = StrapiContent>(
  options: Omit<UseStrapiOptions, "id" | "slug">
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<any>(null);

  const {
    contentType,
    locale = "es",
    populate = "*",
    filters = {},
    sort,
    pagination: paginationOptions,
  } = options;

  // Strapi configuration
  const STRAPI_URL =
    import.meta.env.PUBLIC_STRAPI_URL || "http://localhost:1337";
  const STRAPI_TOKEN = import.meta.env.STRAPI_TOKEN;
  const isDev = import.meta.env.DEV;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Build the API endpoint
        let endpoint = `${STRAPI_URL}/api/${contentType}s`;

        // Build query parameters
        const params = new URLSearchParams();

        // Add locale filter
        params.append("locale", locale);

        // Add populate
        if (populate) {
          params.append("populate", populate);
        }

        // Add custom filters
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(`filters[${key}]`, value.toString());
          }
        });

        // Add sorting
        if (sort) {
          params.append("sort", sort);
        }

        // Add pagination
        if (paginationOptions) {
          if (paginationOptions.page) {
            params.append(
              "pagination[page]",
              paginationOptions.page.toString()
            );
          }
          if (paginationOptions.pageSize) {
            params.append(
              "pagination[pageSize]",
              paginationOptions.pageSize.toString()
            );
          }
        }

        // Add query string if we have parameters
        if (params.toString()) {
          endpoint += `?${params.toString()}`;
        }

        const headers: HeadersInit = {
          "Content-Type": "application/json",
        };

        if (STRAPI_TOKEN) {
          headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;
        }

        const response = await fetch(endpoint, {
          headers,
          // In development, don't cache. In production, cache for 1 hour
          cache: isDev ? "no-store" : "force-cache",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: StrapiResponse<T[]> = await response.json();

        if (result.data) {
          setData(Array.isArray(result.data) ? result.data : [result.data]);
          setPagination(result.meta.pagination || null);
        } else {
          throw new Error("No data received from Strapi");
        }
      } catch (err) {
        console.error("Error fetching Strapi content:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    contentType,
    locale,
    populate,
    JSON.stringify(filters),
    sort,
    JSON.stringify(paginationOptions),
    STRAPI_URL,
    STRAPI_TOKEN,
    isDev,
  ]);

  return { data, loading, error, pagination };
}
