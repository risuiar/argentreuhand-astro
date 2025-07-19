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
  featuredImage?: string;
  featuredImageLarge?: string;
  image2?: string;
  author?: string;
  tags?: string[];
}
