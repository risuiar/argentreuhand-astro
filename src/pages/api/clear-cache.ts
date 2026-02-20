import type { APIRoute } from "astro";

export const prerender = false;
import { clearHomeCache, getCacheStatus } from "../../utils/home";

// Helper function to validate secret
const validateSecret = (request: Request): boolean => {
  const secret = 
    request.headers.get("x-cache-secret") || 
    new URL(request.url).searchParams.get("secret");
  
  const expectedSecret = import.meta.env.CACHE_CLEAR_SECRET;
  
  // If no secret is configured, allow (backward compatibility)
  if (!expectedSecret) {
    console.warn("⚠️ CACHE_CLEAR_SECRET not configured - endpoint is unprotected!");
    return true;
  }
  
  return secret === expectedSecret;
};

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log("🔄 Clear cache request received (POST)");

    // Validate secret
    if (!validateSecret(request)) {
      console.log("❌ Unauthorized access attempt");
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

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

export const GET: APIRoute = async ({ request }) => {
  try {
    console.log("🔄 Clear cache request received (GET)");

    // Validate secret
    if (!validateSecret(request)) {
      console.log("❌ Unauthorized access attempt");
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Clear all cache
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
