# CMS Blog Implementation

This project now includes a fully functional CMS blog system integrated with the Mateando CMS API.

## Features

- **Multi-language Support**: German (de-CH) and Spanish (es-AR) blog posts
- **Responsive Design**: Mobile-friendly blog cards and individual post pages
- **Pagination**: Navigate through multiple pages of blog posts
- **Rich Content**: Support for formatted text content with HTML rendering
- **Error Handling**: Graceful error handling for API failures
- **SEO Friendly**: Proper meta tags and structured content

## API Configuration

The CMS is configured using environment variables:

```env
PUBLIC_CMS_API_URL=https://cms.mateando.com/api
CMS_BEARER_TOKEN=your_bearer_token_here
```

## File Structure

```
src/
├── types/
│   └── blog.ts              # TypeScript interfaces for blog data
├── utils/
│   └── blog.ts              # API utilities and data transformation
├── components/
│   └── BlogCard.astro       # Blog post card component
└── pages/
    ├── de/
    │   ├── blog.astro       # German blog listing page
    │   └── blog/
    │       └── [slug].astro # German individual blog post page
    └── es/
        ├── blog.astro       # Spanish blog listing page
        └── blog/
            └── [slug].astro # Spanish individual blog post page
```

## API Endpoints

### Blog Posts Listing

- **German**: `GET /api/blogs/?filters[locale][$eq]=de-CH&sort=publishedAt:desc`
- **Spanish**: `GET /api/blogs/?filters[locale][$eq]=es-AR&sort=publishedAt:desc`

### Individual Blog Post

- **German**: `GET /api/blogs/?filters[documentId][$eq]={documentId}&filters[locale][$eq]=de-CH`
- **Spanish**: `GET /api/blogs/?filters[documentId][$eq]={documentId}&filters[locale][$eq]=es-AR`

## Data Structure

The API returns blog posts with the following structure:

```json
{
  "id": 12,
  "documentId": "n28j0cuotkeq05l4anl9tdik",
  "createdAt": "2025-06-23T19:27:14.056Z",
  "updatedAt": "2025-06-23T19:29:13.814Z",
  "publishedAt": "2025-06-23T19:29:13.867Z",
  "locale": "de-CH",
  "title": "Blog Post Title",
  "description": [...], // Rich text content for excerpt
  "body": [...] // Rich text content for full post
}
```

## Content Formatting

The CMS uses a rich text format that gets converted to HTML:

- **Paragraphs**: Converted to `<p>` tags
- **Bold Text**: Converted to `<strong>` tags
- **Line Breaks**: Properly handled in HTML output

## Usage

### Blog Listing Pages

- German: `/de/blog`
- Spanish: `/es/blog`

### Individual Blog Posts

- German: `/de/blog/{documentId}`
- Spanish: `/es/blog/{documentId}`

## Features Implemented

1. **Blog Cards**: Responsive cards showing post previews with:

   - Title
   - Publication date
   - Excerpt (if available)
   - Tags (if available)
   - Read more link

2. **Individual Post Pages**: Full blog post display with:

   - Complete content
   - Publication and update dates
   - Navigation back to blog listing
   - Responsive design

3. **Pagination**: Navigate through multiple pages of blog posts

4. **Error Handling**: Graceful handling of:

   - API connection errors
   - Missing posts
   - Network issues

5. **Multi-language Support**:
   - Proper locale handling (de-CH, es-AR)
   - Localized date formatting
   - Language-specific navigation

## Styling

The blog uses Tailwind CSS classes and custom styles for:

- Responsive grid layouts
- Card hover effects
- Typography (prose classes)
- Color scheme matching the brand

## Future Enhancements

Potential improvements that could be added:

1. **Search Functionality**: Add search across blog posts
2. **Categories/Tags**: Filter posts by categories or tags
3. **Related Posts**: Show related posts on individual post pages
4. **Social Sharing**: Add social media sharing buttons
5. **Comments**: Add commenting system
6. **RSS Feed**: Generate RSS feeds for blog posts
7. **SEO Optimization**: Add meta descriptions and Open Graph tags

## Troubleshooting

### Common Issues

1. **API Connection Errors**: Check bearer token and API URL
2. **Empty Blog Lists**: Verify locale filters match available content
3. **Missing Posts**: Ensure documentId is correct in URLs

### Debug Mode

To debug API issues, check the browser console for error messages or add console.log statements in the blog utility functions.
