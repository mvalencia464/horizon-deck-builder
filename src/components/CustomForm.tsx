import React, { useState, useEffect, useRef } from 'react';
import { loadGoogleMapsAPI, initializeAddressAutocomplete } from '../utils/googlePlaces';

// --- Configuration ---
const CLOUDFLARE_WORKER_URL = import.meta.env.VITE_IMAGE_UPLOAD_URL || '';
const CLOUDFLARE_AUTH_KEY = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN || '';
const DEFAULT_WEBHOOK_URL = import.meta.env.VITE_HIGHLEVEL_WEBHOOK_URL || '';
const DEFAULT_LOCATION_ID = import.meta.env.VITE_HIGHLEVEL_LOCATION_ID || '';
const BACKUP_WEBHOOK_URL = import.meta.env.VITE_BACKUP_WEBHOOK_URL || '';

interface CustomFormProps {
  title?: string;
  webhookUrl?: string;
}

// Helper component for the upload icon
const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-10 w-10 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

// Helper component for the loading spinner
const Loader = () => (
    <div className="loader border-4 border-f3f3f3 border-t-4 border-t-blue-400 rounded-full w-6 h-6 animate-spin"></div>
);

const CustomForm: React.FC<CustomFormProps> = ({
  title = "Get Your Free Project Estimate",
  webhookUrl = DEFAULT_WEBHOOK_URL
}) => {
    // State for all form fields
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        country: '',
        postal_code: '',
        project_image_url: '',
        consent: false,
    });

    // State for UI feedback
    const [uploadStatus, setUploadStatus] = useState('');
    const [formStatus, setFormStatus] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Refs for DOM elements that need direct manipulation
    const addressAutocompleteRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Effect to load the Google Places API script and initialize autocomplete
    useEffect(() => {
        const initializeGooglePlaces = async () => {
            try {
                await loadGoogleMapsAPI();
                if (addressAutocompleteRef.current) {
                    initializeAddressAutocomplete(
                        addressAutocompleteRef.current,
                        (addressData) => {
                            setFormData(prev => ({
                                ...prev,
                                address: addressData.address,
                                city: addressData.city,
                                state: addressData.state,
                                country: addressData.country,
                                postal_code: addressData.postalCode
                            }));
                        }
                    );
                }
            } catch (error) {
                console.error('Failed to initialize Google Places:', error);
            }
        };

        initializeGooglePlaces();
    }, []);



    // Handler for standard text input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Handler for file selection (from click or drop)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            uploadImage(file);
        }
    };

    // Function to upload the image to Cloudflare Worker
    const uploadImage = async (file: File) => {
        setIsUploading(true);
        setUploadStatus('Uploading image...');
        const uploadFormData = new FormData();
        uploadFormData.append('image', file);

        console.log('Uploading to:', CLOUDFLARE_WORKER_URL);
        console.log('Auth key:', CLOUDFLARE_AUTH_KEY);

        try {
            const response = await fetch(CLOUDFLARE_WORKER_URL, {
                method: 'POST',
                body: uploadFormData,
                headers: {
                    'Authorization': `Bearer ${CLOUDFLARE_AUTH_KEY}`,
                },
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', Object.fromEntries(response.headers.entries()));

            const result = await response.json();
            console.log('Response body:', result);

            if (result.success) {
                setFormData(prev => ({ ...prev, project_image_url: result.url }));
                setImagePreview(result.url);
                setUploadStatus('Image uploaded!');
            } else {
                throw new Error(result.error || 'Upload failed');
            }
        } catch (error) {
            console.error('Image upload failed:', error);
            setUploadStatus('Upload failed. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };
    
    // Drag and drop handlers
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            uploadImage(file);
        }
    };

    // Handler for form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormStatus('Submitting...');

        // Prepare the payload with additional HighLevel fields
        const payload = {
            ...formData,
            // Add HighLevel specific fields
            source: 'horizon_deck_builder',
            location_id: DEFAULT_LOCATION_ID,
            // Ensure phone is in the right format
            phone: formData.phone.replace(/\D/g, ''), // Remove non-digits
            // Add full name field that HighLevel might expect
            name: `${formData.first_name} ${formData.last_name}`.trim(),
            // Add timestamp
            submitted_at: new Date().toISOString(),
        };

        console.log('=== FORM SUBMISSION DEBUG ===');
        console.log('Webhook URL:', webhookUrl);
        console.log('Payload:', payload);

        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', Object.fromEntries(response.headers.entries()));

            const responseText = await response.text();
            console.log('Response body:', responseText);

            // Also send to backup webhook for testing/comparison
            if (BACKUP_WEBHOOK_URL) {
                try {
                    console.log('Also sending to backup webhook for comparison...');
                    await fetch(BACKUP_WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...payload,
                        note: 'Backup webhook - HighLevel primary submission',
                        webhook_source: 'horizon_deck_builder_react',
                        primary_webhook_status: response.status,
                        primary_webhook_response: responseText
                    })
                });
                console.log('Backup webhook sent successfully');
            } catch (backupError) {
                console.log('Backup webhook failed:', backupError);
            }
            }

            if (response.ok) {
                setFormStatus('Thank you! Your estimate request has been sent.');
                // Reset form state after successful submission
                setFormData({
                    first_name: '', last_name: '', phone: '', email: '',
                    address: '', city: '', state: '', country: '', postal_code: '',
                    project_image_url: '', consent: false
                });
                setImagePreview('');
                setUploadStatus('');
                if (addressAutocompleteRef.current) addressAutocompleteRef.current.value = '';
            } else {
                throw new Error(`Server responded with status: ${response.status}. Response: ${responseText}`);
            }
        } catch (error) {
            console.error('Form submission failed:', error);
            setFormStatus('Submission failed. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-sm bg-blue-600 text-white rounded-2xl shadow-2xl p-6">
            <h2 className="text-xl font-bold text-center mb-5">{title}</h2>
            <form onSubmit={handleSubmit}>
                <div className="space-y-3">
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        placeholder="First Name"
                        className="w-full p-2.5 rounded-lg text-gray-800 text-sm"
                        required
                    />
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        placeholder="Last Name"
                        className="w-full p-2.5 rounded-lg text-gray-800 text-sm"
                        required
                    />
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone*"
                        className="w-full p-2.5 rounded-lg text-gray-800 text-sm"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email*"
                        className="w-full p-2.5 rounded-lg text-gray-800 text-sm"
                        required
                    />
                    <input
                        ref={addressAutocompleteRef}
                        type="text"
                        name="address_search"
                        placeholder="Search address"
                        className="w-full p-2.5 rounded-lg text-gray-800 text-sm"
                    />

                    <div
                        className="bg-blue-500 border-2 border-dashed border-blue-300 rounded-lg p-4 text-center cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        {imagePreview ? (
                            <img src={imagePreview} alt="Project preview" className="mx-auto h-12 w-12 object-cover rounded-md" />
                        ) : (
                            <>
                                <UploadIcon />
                                <div className="font-medium text-white hover:text-blue-100 cursor-pointer mt-1 block text-sm">
                                    Image Upload of Project
                                </div>
                                <p className="text-xs text-blue-200 mt-1">PNG, JPG, GIF up to 10MB</p>
                            </>
                        )}
                        <input
                            ref={fileInputRef}
                            id="fileUpload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </div>

                    {uploadStatus && (
                         <div className="text-center text-sm flex items-center justify-center gap-2">
                            {isUploading && <Loader />}
                            <span className={uploadStatus.includes('failed') ? 'text-red-300' : 'text-green-200'}>{uploadStatus}</span>
                        </div>
                    )}

                    <div className="flex items-start space-x-2">
                        <input
                            id="consent"
                            name="consent"
                            type="checkbox"
                            checked={formData.consent}
                            onChange={handleInputChange}
                            className="h-4 w-4 rounded mt-1"
                            required
                        />
                        <label htmlFor="consent" className="text-xs text-blue-100 leading-tight">
                            I agree to receive text message updates from Deckora. Msg frequency varies (e.g., up to 4/month). Msg & data rates may apply. Reply STOP to unsubscribe at any time. View privacy & terms.
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold p-3 rounded-lg mt-5 transition duration-300 disabled:bg-gray-500 text-sm"
                >
                    {isSubmitting ? 'Submitting...' : 'Get Started'}
                </button>

                {formStatus && (
                    <div className={`text-center mt-3 font-medium text-sm ${formStatus.includes('failed') ? 'text-red-300' : 'text-green-200'}`}>
                        {formStatus}
                    </div>
                )}
            </form>
        </div>
    );
};

export default CustomForm;
