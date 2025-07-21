import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  try {
    const cmsUrl = import.meta.env.VITE_CMS_URL || "https://cms.mateando.com";

    console.log("🔍 Testing CMS connectivity to:", cmsUrl);

    // Test basic connectivity without authentication
    const response = await fetch(cmsUrl, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Astro-Test/1.0)",
      },
    });

    console.log(
      "📡 CMS Response Status:",
      response.status,
      response.statusText
    );

    if (response.ok) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "CMS is reachable",
          status: response.status,
          url: cmsUrl,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: "CMS responded with error",
          status: response.status,
          statusText: response.statusText,
          url: cmsUrl,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("❌ Error testing CMS:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to connect to CMS",
        error: error instanceof Error ? error.message : "Unknown error",
        url: import.meta.env.VITE_CMS_URL || "https://cms.mateando.com",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
