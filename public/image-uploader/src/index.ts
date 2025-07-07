/**
 * Cloudflare Worker for Image Upload to R2
 *
 * This worker handles image uploads, stores them in R2, and returns public URLs
 */

// Helper function to generate a random filename
function generateRandomFilename(originalName: string): string {
	const extension = originalName.split('.').pop() || 'jpg';
	const randomString = Math.random().toString(36).substring(2, 15) +
	                    Math.random().toString(36).substring(2, 15);
	const timestamp = Date.now();
	return `${timestamp}-${randomString}.${extension}`;
}

// Helper function to validate image file type
function isValidImageType(contentType: string): boolean {
	const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
	return validTypes.includes(contentType.toLowerCase());
}

// CORS headers for browser compatibility
const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		// Handle CORS preflight requests
		if (request.method === 'OPTIONS') {
			return new Response(null, { headers: corsHeaders });
		}

		// Only allow POST requests for uploads
		if (request.method !== 'POST') {
			return new Response(JSON.stringify({ error: 'Method not allowed' }), {
				status: 405,
				headers: { ...corsHeaders, 'Content-Type': 'application/json' }
			});
		}

		try {
			// Check for authorization
			const authHeader = request.headers.get('Authorization');
			const expectedAuth = `Bearer ${env.AUTH_KEY_SECRET}`;

			if (!authHeader || authHeader !== expectedAuth) {
				return new Response(JSON.stringify({ error: 'Unauthorized' }), {
					status: 401,
					headers: { ...corsHeaders, 'Content-Type': 'application/json' }
				});
			}

			// Parse the multipart form data
			const formData = await request.formData();
			const imageFile = formData.get('image') as File;

			if (!imageFile || !(imageFile instanceof File)) {
				return new Response(JSON.stringify({ error: 'No image file provided' }), {
					status: 400,
					headers: { ...corsHeaders, 'Content-Type': 'application/json' }
				});
			}

			// Validate file type
			if (!isValidImageType(imageFile.type)) {
				return new Response(JSON.stringify({ error: 'Invalid file type. Only images are allowed.' }), {
					status: 400,
					headers: { ...corsHeaders, 'Content-Type': 'application/json' }
				});
			}

			// Validate file size (10MB limit)
			const maxSize = 10 * 1024 * 1024; // 10MB
			if (imageFile.size > maxSize) {
				return new Response(JSON.stringify({ error: 'File too large. Maximum size is 10MB.' }), {
					status: 400,
					headers: { ...corsHeaders, 'Content-Type': 'application/json' }
				});
			}

			// Generate a unique filename
			const filename = generateRandomFilename(imageFile.name);

			// Upload to R2
			await env.IMAGE_BUCKET.put(filename, imageFile.stream(), {
				httpMetadata: {
					contentType: imageFile.type,
				},
			});

			// Construct the public URL
			const publicUrl = `https://${env.PUBLIC_R2_DOMAIN}/${filename}`;

			return new Response(JSON.stringify({
				success: true,
				url: publicUrl,
				filename: filename
			}), {
				status: 200,
				headers: { ...corsHeaders, 'Content-Type': 'application/json' }
			});

		} catch (error) {
			console.error('Upload error:', error);
			return new Response(JSON.stringify({
				error: 'Upload failed',
				details: error instanceof Error ? error.message : 'Unknown error'
			}), {
				status: 500,
				headers: { ...corsHeaders, 'Content-Type': 'application/json' }
			});
		}
	},
} satisfies ExportedHandler<Env>;

interface Env {
	IMAGE_BUCKET: R2Bucket;
	AUTH_KEY_SECRET: string;
	PUBLIC_R2_DOMAIN: string;
}
