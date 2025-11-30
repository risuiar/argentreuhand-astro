export interface BlogPost {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  title: string;
  description?: any[];
  body?: any[];
  image1?: Array<{
    id: number;
    documentId: string;
    name: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: any;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider: string;
    provider_metadata?: any;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }>;
  image2?: Array<{
    id: number;
    documentId: string;
    name: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: any;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl?: string;
    provider: string;
    provider_metadata?: any;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }>;
}

export interface BlogResponse {
  data: BlogPost[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiImageObject {
  id?: number;
  url: string;
  width?: number;
  height?: number;
  alternativeText?: string;
  caption?: string;
  formats?: {
    thumbnail?: { url: string; width: number; height: number };
    small?: { url: string; width: number; height: number };
    medium?: { url: string; width: number; height: number };
    large?: { url: string; width: number; height: number };
    [key: string]: { url: string; width: number; height: number } | undefined;
  } | null;
}

export interface BlogPostData {
  id: number;
  documentId: string;
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  publishedAt: string;
  updatedAt: string;
  createdAt: string;
  featuredImage?: StrapiImageObject;
  image2?: StrapiImageObject;
  author?: string;
  tags?: string[];
}
