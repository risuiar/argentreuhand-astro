// Base Strapi content interface
export interface StrapiBaseContent {
  id: number;
  attributes: {
    locale: string;
    publishedAt: string;
    updatedAt: string;
    createdAt: string;
  };
}

// Hero Section
export interface HeroContent extends StrapiBaseContent {
  attributes: StrapiBaseContent["attributes"] & {
    title: string;
    titleHighlight1: string;
    titleHighlight2: string;
    subtitle: string;
    badge: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: {
      clients: string;
      savings: string;
      experience: string;
    };
  };
}

// Services Section
export interface ServiceItem {
  title: string;
  description: string;
  features: string[];
  icon: string;
  color: string;
}

export interface ServicesContent extends StrapiBaseContent {
  attributes: StrapiBaseContent["attributes"] & {
    title: string;
    subtitle: string;
    cta: string;
    items: {
      taxes: ServiceItem;
      company: ServiceItem;
      planning: ServiceItem;
      accounting: ServiceItem;
      consulting: ServiceItem;
      defense: ServiceItem;
    };
  };
}

// Why Choose Us Section
export interface ReasonItem {
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface Stats {
  clients: string;
  satisfaction: string;
  savings: string;
  response: string;
}

export interface WhyChooseUsContent extends StrapiBaseContent {
  attributes: StrapiBaseContent["attributes"] & {
    title: string;
    subtitle: string;
    reasons: {
      experience: ReasonItem;
      response: ReasonItem;
      personal: ReasonItem;
      technology: ReasonItem;
      security: ReasonItem;
      commitment: ReasonItem;
    };
    stats: Stats;
  };
}

// Testimonials Section
export interface TestimonialItem {
  name: string;
  role: string;
  content: string;
  rating: number;
  company?: string;
}

export interface TestimonialsContent extends StrapiBaseContent {
  attributes: StrapiBaseContent["attributes"] & {
    title: string;
    subtitle: string;
    items: TestimonialItem[];
  };
}

// Footer Section
export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterContent extends StrapiBaseContent {
  attributes: StrapiBaseContent["attributes"] & {
    description: string;
    services: {
      title: string;
      items: string[];
    };
    quickLinks: {
      title: string;
      items: FooterLink[];
    };
    contact: {
      title: string;
    };
    legal: {
      copyright: string;
      privacy: string;
      terms: string;
      cookies: string;
    };
  };
}

// Blog Post
export interface BlogContent extends StrapiBaseContent {
  attributes: StrapiBaseContent["attributes"] & {
    title: string;
    content: string;
    excerpt?: string;
    slug: string;
    featured?: boolean;
    author?: string;
    coverImage?: {
      url: string;
      alt: string;
    };
  };
}

// FAQ Item
export interface FAQContent extends StrapiBaseContent {
  attributes: StrapiBaseContent["attributes"] & {
    title: string;
    content: string;
    category?: string;
    order?: number;
  };
}

// Page Content
export interface PageContent extends StrapiBaseContent {
  attributes: StrapiBaseContent["attributes"] & {
    title: string;
    content: string;
    slug: string;
    metaDescription?: string;
  };
}

// Union type for all content types
export type StrapiContent =
  | HeroContent
  | ServicesContent
  | WhyChooseUsContent
  | TestimonialsContent
  | FooterContent
  | BlogContent
  | FAQContent
  | PageContent;

// API Response types
export interface StrapiResponse<T = StrapiContent> {
  data: T | T[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Content type names
export type ContentType =
  | "hero"
  | "service"
  | "why-choose-us"
  | "testimonial"
  | "footer"
  | "blog"
  | "faq"
  | "page";
