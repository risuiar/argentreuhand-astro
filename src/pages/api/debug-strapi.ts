import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url }) => {
  try {
    const locale = url.searchParams.get("locale") || "de";

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

    const strapiUrl = `${CMS_API_URL}/arg-home?filters[locale][$eq]=${locale}&populate[hero][populate]=image&populate[services][populate][service][populate]=feature&populate[whyChooseUs][populate]=why_point&populate[testimonials][populate][testimonialItem][populate]=photo&populate[contact][populate]=contacts`;

    console.log(`🔍 Fetching raw data from Strapi: ${strapiUrl}`);

    const response = await fetch(strapiUrl, {
      headers: {
        Authorization: `Bearer ${CMS_BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Strapi API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    // Extract just the hero title for debugging
    const heroTitle = data.data?.hero?.title || "No title found";

    return new Response(
      JSON.stringify({
        success: true,
        heroTitle,
        fullData: data.data,
        strapiUrl,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching from Strapi:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
        success: false,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
