# 🖼️ Cloudflare Workers Image Uploader

A production-ready image upload service built with Cloudflare Workers and R2 Object Storage. This service handles image uploads, stores them securely, and serves them via a custom domain with proper authentication and CORS support.

## ✨ Features

- 🔐 **Secure Authentication** - Bearer token protection
- 🌐 **CORS Support** - Ready for browser uploads
- 📁 **File Validation** - Type and size checking
- 🚀 **Fast CDN Delivery** - Cloudflare's global network
- 🎯 **Custom Domain** - Serve images from your own domain
- 📊 **Error Handling** - Comprehensive error responses
- 🔄 **TypeScript Support** - Full type safety

## 🏗️ Architecture

```
Browser/App → Cloudflare Worker → R2 Bucket → Custom Domain
```

- **Worker**: Handles uploads, validation, and authentication
- **R2 Bucket**: Stores image files
- **Custom Domain**: Serves images publicly

## 🚀 Quick Start

### Prerequisites

- Cloudflare account with Workers and R2 enabled
- Node.js 18+ installed
- Custom domain (optional but recommended)

### 1. Clone and Setup

```bash
# Create new worker project
npm create cloudflare@latest image-uploader -- --type hello-world-durable-object

# Navigate to project
cd image-uploader

# Install dependencies (if needed)
npm install
```

### 2. Configure wrangler.jsonc

```json
{
  "name": "image-uploader",
  "main": "src/index.ts",
  "compatibility_date": "2025-07-05",
  "r2_buckets": [
    {
      "binding": "IMAGE_BUCKET",
      "bucket_name": "your-bucket-name"
    }
  ],
  "vars": {
    "PUBLIC_R2_DOMAIN": "your-custom-domain.com"
  }
}
```

### 3. Create R2 Bucket

```bash
# Create R2 bucket
npx wrangler r2 bucket create your-bucket-name

# Set up custom domain (optional)
# Go to Cloudflare Dashboard → R2 → your-bucket → Settings → Custom Domains
```

### 4. Set Authentication Secret

```bash
# Set your authentication key
npx wrangler secret put AUTH_KEY_SECRET
# Enter your secret key when prompted (e.g., "your-secret-key-here")
```

### 5. Deploy

```bash
# Deploy the worker
npx wrangler deploy
```

## 📝 Implementation Details

### Core Worker Code Structure

The main worker (`src/index.ts`) includes:

1. **Authentication middleware** - Validates Bearer tokens
2. **CORS handling** - Supports preflight requests
3. **File validation** - Checks file type and size
4. **R2 upload logic** - Stores files with unique names
5. **Error handling** - Comprehensive error responses

### Key Functions

- `generateRandomFilename()` - Creates unique filenames
- `isValidImageType()` - Validates file types
- `fetch()` - Main request handler

### Environment Variables

```typescript
interface Env {
  IMAGE_BUCKET: R2Bucket;        // R2 bucket binding
  AUTH_KEY_SECRET: string;       // Authentication secret
  PUBLIC_R2_DOMAIN: string;      // Custom domain for serving images
}
```

## 🔧 API Usage

### Upload Image

```bash
curl -X POST https://your-worker.workers.dev \
  -H "Authorization: Bearer your-secret-key" \
  -F "image=@path/to/image.jpg"
```

### Response Format

**Success (200):**
```json
{
  "success": true,
  "url": "https://your-domain.com/filename.jpg",
  "filename": "1234567890-randomstring.jpg"
}
```

**Error (400/401/500):**
```json
{
  "error": "Error description",
  "details": "Additional error details"
}
```

## 🛡️ Security Features

- **Bearer Token Authentication** - Prevents unauthorized uploads
- **File Type Validation** - Only allows image files
- **File Size Limits** - Configurable size restrictions (default: 10MB)
- **CORS Protection** - Controlled cross-origin access

## 🎨 Frontend Integration

### JavaScript/Fetch Example

```javascript
async function uploadImage(file) {
  const formData = new FormData();
  formData.append('image', file);
  
  const response = await fetch('https://your-worker.workers.dev', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer your-secret-key'
    },
    body: formData
  });
  
  return await response.json();
}
```

### React Hook Example

```jsx
const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  
  const uploadImage = async (file) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await fetch('https://your-worker.workers.dev', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer your-secret-key' },
        body: formData
      });
      
      return await response.json();
    } finally {
      setUploading(false);
    }
  };
  
  return { uploadImage, uploading };
};
```

## 🔧 Configuration Options

### File Type Validation

Modify the `validTypes` array in `isValidImageType()`:

```typescript
const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
```

### File Size Limits

Adjust the `maxSize` variable:

```typescript
const maxSize = 10 * 1024 * 1024; // 10MB
```

### CORS Settings

Modify the `corsHeaders` object:

```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // or specific domain
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};
```

## 🧪 Testing

A test HTML file is included (`test.html`) with:
- Drag and drop interface
- File validation
- Upload progress
- Error handling
- Image preview

Open `test.html` in a browser to test uploads.

## 🚨 Troubleshooting

### Common Issues

1. **"Unauthorized" Error**
   - Check if `AUTH_KEY_SECRET` is set correctly
   - Verify Bearer token format: `Bearer your-secret-key`

2. **"Method not allowed"**
   - Ensure you're using POST method
   - Check CORS preflight handling

3. **TypeScript Errors**
   - Ensure `Env` interface matches your bindings
   - Check all environment variables are defined

4. **R2 Upload Fails**
   - Verify R2 bucket exists and is accessible
   - Check bucket binding name matches configuration

### Debug Commands

```bash
# Check worker logs
npx wrangler tail

# List secrets
npx wrangler secret list

# Test deployment
npx wrangler dev
```

## 📊 Monitoring

Monitor your worker through:
- **Cloudflare Dashboard** → Workers & Pages → your-worker
- **Analytics tab** for usage metrics
- **Logs tab** for error tracking
- **R2 Dashboard** for storage usage

## 🔄 Updates and Maintenance

### Updating the Worker

```bash
# Make changes to src/index.ts
# Deploy updates
npx wrangler deploy
```

### Rotating Secrets

```bash
# Update authentication key
npx wrangler secret put AUTH_KEY_SECRET
```

## 📚 Additional Resources

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [R2 Object Storage Documentation](https://developers.cloudflare.com/r2/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)

## 🤝 Contributing

This implementation serves as a solid foundation. Consider these enhancements:

- Image resizing/optimization
- Multiple file uploads
- Progress tracking
- Metadata storage
- Image transformations
- Rate limiting
- Webhook notifications

## 📄 License

This project is provided as-is for educational and production use.
