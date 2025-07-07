# Form Implementation with Cloudflare Workers Image Upload

This document describes the new form implementation that uses Cloudflare Workers for image uploads instead of base64 encoding.

## Overview

The form has been updated to use a more robust image upload system that:
- Uploads images directly to Cloudflare R2 storage via Workers
- Provides better performance by avoiding large base64 payloads
- Includes proper error handling and validation
- Maintains the same user experience with improved reliability

## Key Changes

### 1. New Image Upload Service (`src/utils/imageUpload.ts`)

- **`uploadImage(file, config)`**: Main function to upload images to Cloudflare Workers
- **`isValidImageType(file, allowedTypes)`**: Validates file types
- **`isValidFileSize(file, maxSize)`**: Validates file sizes
- **`useImageUpload(config)`**: React hook for image upload functionality
- **`getImageUploadConfig()`**: Gets configuration from environment variables

### 2. Updated CustomForm Component

**Before:**
- Compressed images locally using canvas
- Converted to base64 for webhook submission
- Limited by payload size restrictions

**After:**
- Uploads images directly to Cloudflare Workers
- Stores image URL in form data instead of base64
- Better error handling and user feedback
- Improved performance and reliability

### 3. Environment Configuration

New environment variables added:
```bash
# Cloudflare Workers endpoint for image uploads
VITE_IMAGE_UPLOAD_URL=https://image-uploader.mauricio-e1e.workers.dev

# Authentication token for image uploads
VITE_IMAGE_UPLOAD_TOKEN=test-secret-key
```

## Form Data Structure

### Previous Structure
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "555-1234",
  "address": "123 Main St",
  "projectImage": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...", // Large base64 string
  "imageFileName": "project.jpg",
  "imageSize": 1024000
}
```

### New Structure
```json
{
  "firstName": "John",
  "lastName": "Doe", 
  "email": "john@example.com",
  "phone": "555-1234",
  "address": "123 Main St",
  "projectImageUrl": "https://your-domain.com/filename.jpg", // Clean URL
  "imageFileName": "project.jpg",
  "imageSize": 1024000
}
```

## Benefits

1. **Performance**: No more large base64 payloads causing timeouts
2. **Reliability**: Dedicated image upload service with proper error handling
3. **Scalability**: Images stored in Cloudflare R2 with global CDN
4. **Security**: Bearer token authentication for uploads
5. **User Experience**: Better upload progress and error feedback

## File Validation

- **Supported formats**: JPEG, PNG, GIF, WebP
- **Maximum size**: 10MB (configurable)
- **Validation**: Both client-side and server-side validation

## Error Handling

The implementation includes comprehensive error handling:
- File type validation errors
- File size validation errors
- Network upload errors
- Authentication errors
- Server-side processing errors

## Usage in Other Projects

To copy this form method to other projects:

1. Copy `src/utils/imageUpload.ts`
2. Update your form component to use the new upload service
3. Add environment variables for the Cloudflare Workers endpoint
4. Update form submission to use image URLs instead of base64

## Testing

The form can be tested by:
1. Running the development server: `npm run dev`
2. Opening the form in the browser
3. Selecting an image file
4. Verifying the upload progress and success/error states
5. Checking that the form submission includes the image URL

## Configuration

### Cloudflare Workers Setup

The image upload service requires a deployed Cloudflare Worker with:
- R2 bucket for image storage
- Authentication via Bearer tokens
- CORS configuration for browser uploads

### Environment Variables

Update `.env` file with your specific configuration:
```bash
VITE_IMAGE_UPLOAD_URL=https://your-worker.workers.dev
VITE_IMAGE_UPLOAD_TOKEN=your-secret-key
```

## Troubleshooting

Common issues and solutions:

1. **Upload fails with 401 error**: Check authentication token
2. **Upload fails with CORS error**: Verify Worker CORS configuration
3. **File too large error**: Check file size limits in both client and Worker
4. **Invalid file type**: Ensure file is a supported image format

## Future Enhancements

Potential improvements:
- Image resizing/optimization in the Worker
- Progress tracking for large uploads
- Multiple file upload support
- Image preview functionality
- Drag and drop improvements
