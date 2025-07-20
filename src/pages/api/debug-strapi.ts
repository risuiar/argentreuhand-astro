import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url }) => {
  try {
    const locale = url.searchParams.get("locale") || "es";

    // Use the correct CMS URL
    const CMS_API_URL = "https://cms.mateando.com/api";
    const CMS_BEARER_TOKEN =
      process.env.CMS_BEARER_TOKEN || import.meta.env.CMS_BEARER_TOKEN;

    if (!CMS_BEARER_TOKEN) {
      return new Response(
        JSON.stringify({ error: "CMS_BEARER_TOKEN not set" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const strapiUrl = `${CMS_API_URL}/arg-home?filters[locale][$eq]=${locale}&populate[hero]=*&populate[slider][populate][slides][populate]=image&populate[services][populate][service][populate]=feature&populate[whyChooseUs][populate]=why_point&populate[testimonials][populate][testimonialItem][populate]=photo&populate[contact][populate]=contacts`;

    console.log("🔍 Fetching from Strapi:", strapiUrl);

    const response = await fetch(strapiUrl, {
      headers: {
        Authorization: `Bearer ${CMS_BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(
        "❌ Strapi response not ok:",
        response.status,
        response.statusText
      );
      return new Response(
        JSON.stringify({
          error: "Failed to fetch from Strapi",
          status: response.status,
          statusText: response.statusText,
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();

    console.log("✅ Strapi data received:", JSON.stringify(data, null, 2));

    return new Response(
      JSON.stringify({
        success: true,
        data: data,
        locale: locale,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("❌ Error fetching from Strapi:", error);
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
