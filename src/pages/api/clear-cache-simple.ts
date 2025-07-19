import type { APIRoute } from "astro";
import { clearHomeCache, getCacheStatus } from "../../utils/home";

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log("🔄 Simple clear cache request received");

    // Get secret from headers only
    const secret = request.headers.get("x-cache-secret");

    console.log("🔑 Secret provided:", secret ? "***" : "undefined");

    // Simple secret validation
    const expectedSecret =
      "your-super-secret-cache-key-change-this-in-production";

    if (secret !== expectedSecret) {
      console.log("❌ Unauthorized access attempt");
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Get locale from headers
    const locale = request.headers.get("x-cache-locale") as "de" | "es" | null;

    // Clear cache
    console.log("🧹 Clearing cache for:", locale || "all locales");
    if (locale) {
      clearHomeCache(locale);
    } else {
      clearHomeCache();
    }

    // Return cache status
    const status = getCacheStatus();
    console.log("📊 Cache status after clearing:", status);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Cache cleared for ${locale || "all locales"}`,
        cacheStatus: status,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error clearing cache:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

export const GET: APIRoute = async () => {
  try {
    const status = getCacheStatus();

    return new Response(
      JSON.stringify({
        cacheStatus: status,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error getting cache status:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
