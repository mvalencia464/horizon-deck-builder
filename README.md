# Horizon Deck Builder

A modern React-based website for deck building services with integrated HighLevel CRM forms, Google Places autocomplete, and Cloudflare image hosting.

## Features

- 🏗️ **Custom Form Integration** - Direct HighLevel webhook integration
- 📍 **Google Places Autocomplete** - Smart address completion
- 🖼️ **Image Upload** - Cloudflare Workers + R2 storage
- 📱 **Responsive Design** - Mobile-first approach
- ⚡ **Fast Performance** - Vite + React + TypeScript

## HighLevel Integration

### Webhook Configuration

The form integrates with HighLevel using webhook triggers. Configure your webhook URL in environment variables:

```javascript
// Use environment variables for security
const HIGHLEVEL_WEBHOOK_URL = import.meta.env.VITE_HIGHLEVEL_WEBHOOK_URL;
const LOCATION_ID = import.meta.env.VITE_HIGHLEVEL_LOCATION_ID;
```

### Field Mapping

HighLevel expects specific field names. Here are the working mappings:

#### Standard Contact Fields
```javascript
{
  "first_name": "John",           // Required - Contact first name
  "last_name": "Doe",             // Required - Contact last name  
  "email": "john@example.com",    // Required - Contact email
  "phone": "+1234567890",         // Required - Contact phone
  "address": "123 Main St",       // Street address
  "city": "Anytown",              // City name
  "state": "CA",                  // State abbreviation
  "country": "United States",     // Full country name
  "postal_code": "12345"          // ZIP/postal code
}
```

#### Custom Fields
```javascript
{
  "project_image_url": "https://your-domain.com/image.jpg",  // Uploaded image URL
  "consent": "true",              // SMS consent checkbox
  "source": "Website Form"        // Lead source tracking
}
```

### Working Form Structure

Based on successful implementations, use this exact structure:

```html
<form id="estimateForm">
  <!-- Standard fields with exact names -->
  <input type="text" name="first_name" placeholder="First Name" required>
  <input type="text" name="last_name" placeholder="Last Name" required>
  <input type="tel" name="phone" placeholder="Phone*" required>
  <input type="email" name="email" placeholder="Email*" required>
  
  <!-- Address autocomplete -->
  <input id="address-autocomplete" type="text" placeholder="Search address">
  
  <!-- Hidden address fields -->
  <input type="hidden" id="address" name="address">
  <input type="hidden" id="city" name="city">
  <input type="hidden" id="state" name="state">
  <input type="hidden" id="country" name="country">
  <input type="hidden" id="postal_code" name="postal_code">
  
  <!-- Image upload -->
  <input type="hidden" id="imageUrl" name="project_image_url">
  
  <!-- Consent -->
  <input id="consent" name="consent" type="checkbox" required>
</form>
```

### Form Submission

Use FormData for automatic field collection:

```javascript
// ✅ Working method
const formData = new FormData(form);
const formPayload = Object.fromEntries(formData.entries());

fetch(webhookUrl, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formPayload)
});
```

### Common Issues & Solutions

#### 1. Field Names
❌ **Wrong:** `firstName`, `lastName`, `agreeToTerms`
✅ **Correct:** `first_name`, `last_name`, `consent`

#### 2. Data Format
❌ **Wrong:** Manual object construction
✅ **Correct:** Use `FormData(form)` for automatic collection

#### 3. Address Handling
❌ **Wrong:** Single address field
✅ **Correct:** Separate fields for street, city, state, etc.

## Environment Setup

Create a `.env` file in your project root with these variables:

```bash
# Google Places API
VITE_GOOGLE_PLACES_API_KEY=your-google-maps-api-key

# Cloudflare Image Upload
VITE_IMAGE_UPLOAD_URL=https://image-uploader.your-worker.workers.dev
VITE_IMAGE_UPLOAD_TOKEN=your-secret-key-here

# HighLevel Integration
VITE_HIGHLEVEL_WEBHOOK_URL=https://services.leadconnectorhq.com/hooks/YOUR_LOCATION_ID/webhook-trigger/YOUR_TRIGGER_ID
VITE_HIGHLEVEL_LOCATION_ID=YOUR_LOCATION_ID

# Backup webhook for monitoring (optional)
VITE_BACKUP_WEBHOOK_URL=https://your-backup-webhook.com
```

⚠️ **Security Note**: Never commit your `.env` file to version control. Use `.env.example` as a template.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## HighLevel Webhook Setup & Testing

### Quick Setup for New Projects

1. **Get HighLevel Webhook URL**
   - Create new automation in HighLevel
   - Add "Inbound Webhook" trigger
   - Copy the generated webhook URL (format: `https://services.leadconnectorhq.com/hooks/{LOCATION_ID}/webhook-trigger/{TRIGGER_ID}`)

2. **Update Project Configuration**
   ```javascript
   // Update in src/components/CustomForm.tsx
   webhookUrl = "https://services.leadconnectorhq.com/hooks/YOUR_LOCATION_ID/webhook-trigger/YOUR_TRIGGER_ID"

   // Update in src/components/HeroSection.tsx
   webhookUrl = "https://services.leadconnectorhq.com/hooks/YOUR_LOCATION_ID/webhook-trigger/YOUR_TRIGGER_ID"

   // Update location_id in CustomForm.tsx payload
   location_id: 'YOUR_LOCATION_ID'
   ```

3. **Send Test Data for Mapping**
   - Use the included `webhook-test.html` file
   - Update the webhook URL in the test file
   - Open in browser and click "Send Test Data"
   - Return to HighLevel and click "Check for new requests"
   - Map the fields in your automation

### Test Data Structure

The webhook sends this standardized payload:
```json
{
  "first_name": "Maria",
  "last_name": "Valencia",
  "phone": "5091234567",
  "email": "maria@stokeleads.com",
  "address": "123 Main Street",
  "city": "Fairmount",
  "state": "GA",
  "country": "US",
  "postal_code": "30139",
  "project_image_url": "https://your-domain.com/sample-image.jpg",
  "consent": true,
  "source": "horizon_deck_builder",
  "location_id": "YOUR_LOCATION_ID",
  "name": "Maria Valencia",
  "submitted_at": "2025-01-07T20:30:00.000Z",
  "project_type": "Deck Building",
  "message": "I need a quote for a new deck construction"
}
```

### Testing Checklist

1. **Webhook Test**: Use `webhook-test.html` to send test payload
2. **Form Submission**: Fill out actual form and verify data flow
3. **Address Parsing**: Test Google Places autocomplete
4. **Image Upload**: Verify Cloudflare R2 storage and URL generation
5. **HighLevel Contact**: Check that contact is created with correct data
6. **Automation Flow**: Verify any follow-up actions (emails, SMS, etc.)

### Backup Monitoring

All form submissions can optionally be sent to a backup webhook for monitoring. Configure this in your environment variables:
```bash
VITE_BACKUP_WEBHOOK_URL=https://your-backup-webhook.com
```

This helps debug issues and ensures no leads are lost.

## Webhook Test Template

For new projects, create a `webhook-test.html` file with this template:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HighLevel Webhook Test</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; background-color: #f5f5f5; }
        .container { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        button { background: #4CAF50; color: white; padding: 15px 30px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; margin: 10px 0; width: 100%; }
        button:hover { background: #45a049; }
        .result { margin-top: 20px; padding: 15px; border-radius: 5px; font-family: monospace; }
        .success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        .error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
        pre { white-space: pre-wrap; word-wrap: break-word; }
    </style>
</head>
<body>
    <div class="container">
        <h1>HighLevel Webhook Test</h1>
        <p>Click the button below to send test data to your HighLevel webhook.</p>
        <button onclick="sendTestData()">Send Test Data to HighLevel</button>
        <div id="result"></div>
    </div>
    <script>
        async function sendTestData() {
            // UPDATE THIS URL FOR YOUR PROJECT
            const webhookUrl = "https://services.leadconnectorhq.com/hooks/YOUR_LOCATION_ID/webhook-trigger/YOUR_TRIGGER_ID";

            const testData = {
                "first_name": "Maria",
                "last_name": "Valencia",
                "phone": "5091234567",
                "email": "maria@stokeleads.com",
                "address": "123 Main Street",
                "city": "Fairmount",
                "state": "GA",
                "country": "US",
                "postal_code": "30139",
                "project_image_url": "https://your-domain.com/sample-image.jpeg",
                "consent": true,
                "source": "your_project_name", // UPDATE THIS
                "location_id": "YOUR_LOCATION_ID", // UPDATE THIS
                "name": "Maria Valencia",
                "submitted_at": new Date().toISOString(),
                "project_type": "Sample Project",
                "message": "Test message for webhook mapping"
            };

            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = '<p>Sending test data...</p>';

            try {
                const response = await fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(testData)
                });

                const responseText = await response.text();
                resultDiv.innerHTML = `
                    <div class="result success">
                        <h3>✅ Success!</h3>
                        <p><strong>Status:</strong> ${response.status}</p>
                        <p><strong>Data Sent:</strong></p>
                        <pre>${JSON.stringify(testData, null, 2)}</pre>
                    </div>
                `;
            } catch (error) {
                resultDiv.innerHTML = `
                    <div class="result error">
                        <h3>❌ Error</h3>
                        <p>${error.message}</p>
                    </div>
                `;
            }
        }
    </script>
</body>
</html>
```

### Quick Setup Steps:
1. Copy the template above into `webhook-test.html`
2. Replace `YOUR_LOCATION_ID` and `YOUR_TRIGGER_ID` with actual values
3. Update `source` field to match your project name
4. Open the file in browser and click the button
5. Go to HighLevel and map the received payload
