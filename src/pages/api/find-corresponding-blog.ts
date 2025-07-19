import type { APIRoute } from "astro";
import { findCorrespondingBlogPost } from "../../utils/blog";

export const GET: APIRoute = async ({ url }) => {
  try {
    const searchParams = url.searchParams;
    const currentId = searchParams.get("currentId");
    const currentLang = searchParams.get("currentLang") as "de" | "es";
    const targetLang = searchParams.get("targetLang") as "de" | "es";

    console.log("API Debug - currentId:", currentId);
    console.log("API Debug - currentLang:", currentLang);
    console.log("API Debug - targetLang:", targetLang);

    if (!currentId || !currentLang || !targetLang) {
      console.log("API Debug - Missing parameters detected");
      return new Response(
        JSON.stringify({ error: "Missing required parameters" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const correspondingId = await findCorrespondingBlogPost(
      currentId,
      currentLang,
      targetLang
    );

    console.log("API Debug - correspondingId:", correspondingId);

    return new Response(
      JSON.stringify({
        correspondingId,
        success: true,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in find-corresponding-blog API:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        success: false,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
