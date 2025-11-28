# Contact Form Setup

## Overview

The contact form has been integrated with Strapi CMS to store contact submissions in the `arg-contacts` collection.

## API Endpoint

- **URL**: `https://cms.mateando.com/api/arg-contacts`
- **Method**: POST
- **Content-Type**: application/json

## Required Environment Variables

Add these to your `.env` file:

```env
STRAPI_URL=https://cms.mateando.com
STRAPI_TOKEN=your_strapi_api_token_here
```

## Getting Strapi API Token

1. Log in to your Strapi admin panel
2. Go to **Settings** → **API Tokens**
3. Click **Create new API Token**
4. Configure:
   - **Name**: `Contact Form Token`
   - **Description**: `Token for contact form submissions`
   - **Token duration**: `Unlimited` (or set expiration)
   - **Token type**: `Full access` (or customize permissions)
5. Copy the generated token and add it to your `.env` file

## Form Fields

The contact form submits the following data to Strapi:

```typescript
{
  name: string; // Required
  email: string; // Required, validated
  phone: string; // Optional
  type: string; // Optional, defaults to "general"
  message: string; // Required
  language: string; // "es" or "de"
}
```

## Form Validation

- **Name**: Required, trimmed
- **Email**: Required, validated format, converted to lowercase
- **Message**: Required, trimmed
- **Phone**: Optional, trimmed
- **Type**: Optional, defaults to "general"

## Response Format

### Success Response (200)

```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "data": {
    /* Strapi response data */
  }
}
```

### Error Response (400/500)

```json
{
  "success": false,
  "error": "Error message"
}
```

## Features

- ✅ **Real-time validation** with error messages
- ✅ **Loading states** during submission
- ✅ **Success/error feedback** to users
- ✅ **Form reset** after successful submission
- ✅ **Multilingual support** (Spanish/German)
- ✅ **Accessibility** with proper ARIA labels
- ✅ **CSRF protection** via API endpoint
- ✅ **Input sanitization** and validation

## Testing

You can test the endpoint with curl:

```bash
curl -X POST https://cms.mateando.com/api/arg-contacts \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "name": "Test User",
      "email": "test@example.com",
      "phone": "+41 76 510 03 80",
      "type": "general",
      "message": "Test message",
      "language": "es"
    }
  }'
```

## Troubleshooting

### Common Issues

1. **"Server configuration error"**

   - Check that `STRAPI_TOKEN` is set in your `.env` file
   - Verify the token is valid in Strapi

2. **"Failed to submit contact form"**

   - Check Strapi server logs for API errors
   - Verify the `arg-contacts` collection exists
   - Ensure the API token has proper permissions

3. **Form not submitting**
   - Check browser console for JavaScript errors
   - Verify the component has `client:load` directive
   - Ensure network connectivity to Strapi

### Debug Mode

To enable debug logging, add to your `.env`:

```env
DEBUG=true
```

This will log API requests and responses to the console.
