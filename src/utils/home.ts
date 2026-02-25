declare const process: any;
// Import the HomeData interface from the hook file
interface FounderImage {
  id: number;
  url: string;
  formats?: {
    small?: { url: string };
    medium?: { url: string };
    thumbnail?: { url: string };
    [key: string]: any;
  };
}

interface FounderCredential {
  id: number;
  credential: string;
}

interface Founder {
  id: number;
  name: string;
  title: string;
  description: string;
  image: FounderImage;
  founder_credential: FounderCredential[];
}

interface WhyPoint {
  id: number;
  title: string;
  text: string;
  icon?: string | null;
}

interface WhyChooseUs {
  id: number;
  sectionTitle: string;
  description: string;
  why_point: WhyPoint[];
  founder?: Founder;
}

interface HomeData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  hero: any;
  services: any;
  whyChooseUs: WhyChooseUs;
  testimonials: any;
  contact: any;
}

// Helper para acceder a process.env solo si existe
const getProcessEnv = (key: string): string | undefined => {
  return typeof process !== "undefined" && process.env
    ? process.env[key]
    : undefined;
};

// Cache in memory for development
const cache = new Map<string, { data: HomeData; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

export async function fetchHomeData(locale: "de" | "es"): Promise<HomeData> {
  const cacheKey = `home-${locale}`;
  const now = Date.now();

  // Check cache first
  const cached = cache.get(cacheKey);
  if (cached && now - cached.timestamp < CACHE_DURATION) {
    console.log(
      `📦 Using cached data for ${locale} (age: ${Math.round(
        (now - cached.timestamp) / 1000
      )}s)`
    );
    return cached.data;
  }

  // Use the correct CMS URL
  const CMS_API_URL = `${import.meta.env.VITE_CMS_URL}/api`;
  const CMS_BEARER_TOKEN =
    getProcessEnv("CMS_BEARER_TOKEN") || import.meta.env.CMS_BEARER_TOKEN;

  // Validate environment variables
  if (!CMS_BEARER_TOKEN) {
    throw new Error("CMS_BEARER_TOKEN environment variable is not set");
  }

  const url = `${CMS_API_URL}/arg-home?filters[locale][$eq]=${locale}&populate[hero]=*&populate[slider][populate][slides][populate]=image&populate[services][populate][service][populate]=feature&populate[whyChooseUs][populate][why_point]=true&populate[whyChooseUs][populate][founder][populate][image]=true&populate[whyChooseUs][populate][founder][populate][founder_credential]=true&populate[testimonials][populate][testimonialItem][populate]=photo&populate[contact][populate]=contacts`;

  console.log(`🔄 Fetching fresh data for ${locale} from API...`);

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${CMS_BEARER_TOKEN}`,
      "Content-Type": "application/json",
    },
    // Do not use force-cache, as we manage our own in-memory cache.
    // Using no-store ensures that when we DO hit the network, we get fresh data.
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch home data: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();

  if (!data.data) {
    throw new Error("No data received from API");
  }

  // Cache the result
  cache.set(cacheKey, { data: data.data, timestamp: now });
  console.log(`✅ Cached fresh data for ${locale}`);

  return data.data;
}

// Function to clear cache manually (useful for webhooks)
export function clearHomeCache(locale?: "de" | "es") {
  if (locale) {
    cache.delete(`home-${locale}`);
    console.log(`🗑️ Cleared cache for ${locale}`);
  } else {
    cache.clear();
    console.log(`🗑️ Cleared all home cache`);
  }
}

// Function to get cache status
export function getCacheStatus() {
  const now = Date.now();
  const status: { [key: string]: any } = {};

  for (const [key, value] of cache.entries()) {
    const age = Math.round((now - value.timestamp) / 1000);
    const isValid = now - value.timestamp < CACHE_DURATION;
    status[key] = { age: `${age}s`, valid: isValid };
  }

  return status;
}
