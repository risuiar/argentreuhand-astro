import React from "react";
import { useStrapi } from "../hooks/useStrapi";
import type { ContentType, StrapiContent } from "../types/strapi";

interface StrapiContentProps {
  contentType: ContentType;
  slug?: string;
  id?: string;
  locale?: "es" | "de";
  fallback?: React.ReactNode;
  className?: string;
  renderContent?: (data: StrapiContent) => React.ReactNode;
}

export default function StrapiContent({
  contentType,
  slug,
  id,
  locale = "es",
  fallback,
  className = "",
  renderContent,
}: StrapiContentProps) {
  const { data, loading, error } = useStrapi({
    contentType,
    slug,
    id,
    locale,
    populate: "*",
  });

  // Loading state
  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        className={`text-red-600 p-4 border border-red-200 rounded ${className}`}
      >
        <p>Error loading content: {error}</p>
        {fallback && <div className="mt-4">{fallback}</div>}
      </div>
    );
  }

  // No data state
  if (!data) {
    return fallback ? <div className={className}>{fallback}</div> : null;
  }

  // Custom render function
  if (renderContent) {
    return <div className={className}>{renderContent(data)}</div>;
  }

  // Default rendering based on content type
  const renderDefaultContent = () => {
    const attributes = data.attributes;

    switch (contentType) {
      case "blog":
        return (
          <article className="prose prose-lg max-w-none">
            <h1 className="text-3xl font-bold mb-4">{attributes.title}</h1>
            {attributes.excerpt && (
              <p className="text-lg text-gray-600 mb-6 italic">
                {attributes.excerpt}
              </p>
            )}
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: attributes.content }}
            />
            <div className="text-sm text-gray-500 mt-6">
              Published: {new Date(attributes.publishedAt).toLocaleDateString()}
            </div>
          </article>
        );

      case "page":
        return (
          <div className="prose prose-lg max-w-none">
            <h1 className="text-3xl font-bold mb-6">{attributes.title}</h1>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: attributes.content }}
            />
          </div>
        );

      case "service":
        return (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-3">{attributes.title}</h3>
            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: attributes.content }}
            />
          </div>
        );

      case "testimonial":
        return (
          <div className="bg-gray-50 rounded-lg p-6">
            <div
              className="text-gray-700 italic mb-4"
              dangerouslySetInnerHTML={{ __html: attributes.content }}
            />
            {attributes.author && (
              <div className="font-semibold text-gray-900">
                {attributes.author}
              </div>
            )}
          </div>
        );

      case "faq":
        return (
          <div className="border-b border-gray-200 py-4">
            <h3 className="text-lg font-semibold mb-2">{attributes.title}</h3>
            <div
              className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: attributes.content }}
            />
          </div>
        );

      default:
        return (
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-4">{attributes.title}</h2>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: attributes.content }}
            />
          </div>
        );
    }
  };

  return <div className={className}>{renderDefaultContent()}</div>;
}
