/**
 * Helper functions for working with Strapi images
 * Used in React components where we can't use Astro components directly
 */

interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
}

interface StrapiImageFormats {
  thumbnail?: StrapiImageFormat;
  small?: StrapiImageFormat;
  medium?: StrapiImageFormat;
  large?: StrapiImageFormat;
  [key: string]: StrapiImageFormat | undefined;
}

export interface StrapiImage {
  url: string;
  width?: number;
  height?: number;
  alternativeText?: string;
  caption?: string;
  formats?: StrapiImageFormats | null;
}

/**
 * Builds a srcset string from Strapi image formats
 */
export function buildSrcset(image: StrapiImage | StrapiImage[] | null | undefined): string | undefined {
  // Handle array (take first)
  const imageData: StrapiImage | null = Array.isArray(image) 
    ? image[0] || null 
    : image || null;

  if (!imageData || !imageData.formats || typeof imageData.formats !== 'object') {
    return undefined;
  }

  const srcsetParts: string[] = [];
  
  // Order of preference for formats (smallest to largest)
  const formatOrder = ['thumbnail', 'small', 'medium', 'large'];
  
  // Add formats in order
  for (const formatKey of formatOrder) {
    const format = imageData.formats[formatKey];
    if (format && format.url && format.width) {
      srcsetParts.push(`${format.url} ${format.width}w`);
    }
  }
  
  // Add any other formats not in the list
  for (const [key, format] of Object.entries(imageData.formats)) {
    if (!formatOrder.includes(key) && format && format.url && format.width) {
      srcsetParts.push(`${format.url} ${format.width}w`);
    }
  }
  
  // Always include original image as fallback
  if (srcsetParts.length > 0) {
    if (imageData.width) {
      srcsetParts.push(`${imageData.url} ${imageData.width}w`);
    } else {
      srcsetParts.push(imageData.url);
    }
    return srcsetParts.join(', ');
  }

  return undefined;
}

/**
 * Gets image data from Strapi image (handles arrays)
 */
export function getImageData(image: StrapiImage | StrapiImage[] | null | undefined): StrapiImage | null {
  return Array.isArray(image) ? image[0] || null : image || null;
}





