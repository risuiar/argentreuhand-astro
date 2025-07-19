import type { APIRoute } from "astro";
import { clearHomeCache, getCacheStatus } from "../../utils/home";

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log("🔄 Clear cache request received");

    // Clear all cache (simplified for now)
    console.log("🧹 Clearing all cache");
    clearHomeCache();

    // Return cache status
    const status = getCacheStatus();
    console.log("📊 Cache status after clearing:", status);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Cache cleared successfully",
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
