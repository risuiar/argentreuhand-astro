
interface LegalContent {
  id: number;
  documentId: string;
  title: string;
  content: string;
  key: string;
  slug: string;
  locale: string;
}

const getProcessEnv = (key: string): string | undefined => {
  return typeof process !== "undefined" && process.env
    ? process.env[key]
    : undefined;
};

export async function fetchLegalContent(key: string, locale: "de" | "es"): Promise<LegalContent | null> {
  const CMS_API_URL = `${import.meta.env.VITE_CMS_URL}/api`;
  const CMS_BEARER_TOKEN = getProcessEnv("CMS_BEARER_TOKEN") || import.meta.env.CMS_BEARER_TOKEN;

  if (!CMS_BEARER_TOKEN) {
    throw new Error("CMS_BEARER_TOKEN environment variable is not set");
  }

  const url = `${CMS_API_URL}/arg-contents?filters[key][$eq]=${key}&locale=${locale}`;
  console.log(`🔍 Fetching legal content: ${url}`);

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${CMS_BEARER_TOKEN}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    console.log(`📡 Response status: ${response.status}`);

    if (!response.ok) {
      console.error(`Error fetching legal content: ${response.status} ${response.statusText}`);
      return null;
    }

    const json = await response.json();
    console.log(`📦 API Response Data:`, JSON.stringify(json, null, 2));
    
    // In Strapi, collection types return data as an array
    if (json.data && json.data.length > 0) {
      const item = json.data[0];
      let data = item.attributes ? { id: item.id, ...item.attributes } : item;

      // Transform newlines to <br> to respect breaks from Strapi
      if (data.content && typeof data.content === "string") {
        data.content = data.content.replace(/\n/g, "<br>");
      }

      return data;
    }
    
    console.warn(`⚠️ No document found for key: ${key} and locale: ${locale}`);
    return null;
  } catch (error) {
    console.error("Error fetching legal content:", error);
    return null;
  }
}
