/**
 * Image Upload Service for Cloudflare Workers
 *
 * This service handles image uploads to Cloudflare Workers R2 storage
 * Based on the image-uploader project implementation
 */

import React from 'react';

export interface ImageUploadResponse {
  success: boolean;
  url?: string;
  filename?: string;
  error?: string;
  details?: string;
}

export interface ImageUploadConfig {
  workerUrl: string;
  authToken: string;
  maxFileSize?: number; // in bytes, default 10MB
  allowedTypes?: string[]; // default: image types
}

// Default configuration
const DEFAULT_CONFIG: Partial<ImageUploadConfig> = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
};

/**
 * Validates if the file is a valid image type
 */
export function isValidImageType(file: File, allowedTypes?: string[]): boolean {
  const validTypes = allowedTypes || DEFAULT_CONFIG.allowedTypes!;
  return validTypes.includes(file.type.toLowerCase());
}

/**
 * Validates if the file size is within limits
 */
export function isValidFileSize(file: File, maxSize?: number): boolean {
  const maxFileSize = maxSize || DEFAULT_CONFIG.maxFileSize!;
  return file.size <= maxFileSize;
}

/**
 * Uploads an image file to Cloudflare Workers
 */
export async function uploadImage(
  file: File, 
  config: ImageUploadConfig
): Promise<ImageUploadResponse> {
  try {
    // Validate file type
    if (!isValidImageType(file, config.allowedTypes)) {
      return {
        success: false,
        error: 'Invalid file type. Only images are allowed.',
        details: `Allowed types: ${(config.allowedTypes || DEFAULT_CONFIG.allowedTypes!).join(', ')}`
      };
    }

    // Validate file size
    if (!isValidFileSize(file, config.maxFileSize)) {
      const maxSizeMB = (config.maxFileSize || DEFAULT_CONFIG.maxFileSize!) / (1024 * 1024);
      return {
        success: false,
        error: `File too large. Maximum size is ${maxSizeMB}MB.`,
        details: `File size: ${(file.size / (1024 * 1024)).toFixed(2)}MB`
      };
    }

    // Prepare form data
    const formData = new FormData();
    formData.append('image', file);

    // Make the upload request
    const response = await fetch(config.workerUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.authToken}`
      },
      body: formData
    });

    // Parse response
    const data = await response.json();

    if (response.ok && data.success) {
      return {
        success: true,
        url: data.url,
        filename: data.filename
      };
    } else {
      return {
        success: false,
        error: data.error || 'Upload failed',
        details: data.details || `HTTP ${response.status}`
      };
    }

  } catch (error) {
    console.error('Image upload error:', error);
    return {
      success: false,
      error: 'Upload failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Hook for React components to handle image uploads
 */
export function useImageUpload(config: ImageUploadConfig) {
  const [uploading, setUploading] = React.useState(false);
  const [uploadResult, setUploadResult] = React.useState<ImageUploadResponse | null>(null);

  const handleUpload = async (file: File): Promise<ImageUploadResponse> => {
    setUploading(true);
    setUploadResult(null);

    try {
      const result = await uploadImage(file, config);
      setUploadResult(result);
      return result;
    } finally {
      setUploading(false);
    }
  };

  const resetUpload = () => {
    setUploadResult(null);
  };

  return {
    uploadImage: handleUpload,
    uploading,
    uploadResult,
    resetUpload
  };
}

// Environment configuration helper
export function getImageUploadConfig(): ImageUploadConfig {
  // These should be set in your environment variables
  const workerUrl = import.meta.env.VITE_IMAGE_UPLOAD_URL || 'https://image-uploader.mauricio-e1e.workers.dev';
  const authToken = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN || 'test-secret-key';

  return {
    workerUrl,
    authToken,
    maxFileSize: DEFAULT_CONFIG.maxFileSize,
    allowedTypes: DEFAULT_CONFIG.allowedTypes
  };
}
