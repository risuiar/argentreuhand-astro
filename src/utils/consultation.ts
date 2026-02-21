declare const process: any;

export interface ConsultationData {
  title: string;
  description: string;
  price: string;
}

import { fallbackConsultationData } from "./fallback-data";

// Helper para acceder a process.env solo si existe
const getProcessEnv = (key: string): string | undefined => {
  return typeof process !== "undefined" && process.env
    ? process.env[key]
    : undefined;
};

export async function fetchConsultationData(locale: "de" | "es"): Promise<ConsultationData> {
  // Use the correct CMS URL
  const CMS_API_URL = `${import.meta.env.VITE_CMS_URL}/api`;
  const CMS_BEARER_TOKEN =
    getProcessEnv("CMS_BEARER_TOKEN") || import.meta.env.CMS_BEARER_TOKEN;

  // Validate environment variables
  if (!CMS_BEARER_TOKEN) {
    throw new Error("CMS_BEARER_TOKEN environment variable is not set");
  }

  const url = `${CMS_API_URL}/arg-consultation?locale=${locale}`;

  console.log(`🔄 Fetching consultation data for ${locale} from API...`);

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${CMS_BEARER_TOKEN}`,
      "Content-Type": "application/json",
    },
    cache: "no-store", // We want the latest price/text
  });

  if (!response.ok) {
    console.warn(`⚠️ Failed to fetch consultation data: ${response.status}. Using fallback.`);
    return fallbackConsultationData[locale];
  }

  const json = await response.json();
  
  if (!json.data) {
    console.warn(`⚠️ No data received from API for consultation. Using fallback.`);
    return fallbackConsultationData[locale];
  }

  const data = json.data;
  
  // Strapi might return attributes nested or direct depending on version/config
  const attrs = data.attributes || data;

  return {
    title: attrs.title || fallbackConsultationData[locale].title,
    description: attrs.description || fallbackConsultationData[locale].description,
    price: attrs.price || fallbackConsultationData[locale].price,
  };
}

