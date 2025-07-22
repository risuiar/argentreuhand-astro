import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url }) => {
  try {
    const locale = url.searchParams.get("locale") || "es";

    // Use the correct CMS URL
    const CMS_API_URL = `${import.meta.env.VITE_CMS_URL}/api`;
    const CMS_BEARER_TOKEN = import.meta.env.CMS_BEARER_TOKEN;

    if (!CMS_BEARER_TOKEN) {
      return new Response(
        JSON.stringify({ error: "CMS_BEARER_TOKEN not set" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Test the blogs API endpoint
    const blogsUrl = `${CMS_API_URL}/arg-blogs/?filters[locale][$eq]=${locale}&sort=publishedAt:desc&pagination[page]=1&pagination[pageSize]=10&populate[0]=image1&populate[1]=image2`;

    console.log("🔍 Testing blogs API:", blogsUrl);

    const response = await fetch(blogsUrl, {
      headers: {
        Authorization: `Bearer ${CMS_BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(
        "❌ Blogs API response not ok:",
        response.status,
        response.statusText
      );
      return new Response(
        JSON.stringify({
          error: "Failed to fetch blogs from API",
          status: response.status,
          statusText: response.statusText,
          url: blogsUrl,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();

    console.log("✅ Blogs data received:", JSON.stringify(data, null, 2));

    return new Response(
      JSON.stringify({
        success: true,
        data: data,
        locale: locale,
        url: blogsUrl,
        totalPosts: data.meta?.pagination?.total || 0,
        postsCount: data.data?.length || 0,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("❌ Error fetching blogs:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
