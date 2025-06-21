import React, { useState, useRef, useEffect } from 'react';
import { Search, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { loadGoogleMapsAPI, initializeAddressAutocomplete } from '../utils/googlePlaces';

interface CustomFormProps {
  title?: string;
  webhookUrl?: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  projectImage?: File;
  agreeToTerms: boolean;
}

const CustomForm: React.FC<CustomFormProps> = ({
  title = "Get Your Free 3D Deck Design",
  webhookUrl = "https://services.leadconnectorhq.com/hooks/aQYV8jwYWM9za5egdIl2/webhook-trigger/45081007-238f-45e8-885d-1113a3907426"
}) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    agreeToTerms: false
  });

  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const addressInputRef = useRef<HTMLInputElement>(null);

  // Initialize Google Places autocomplete
  useEffect(() => {
    const initializeAutocomplete = async () => {
      try {
        await loadGoogleMapsAPI();
        if (addressInputRef.current) {
          initializeAddressAutocomplete(addressInputRef.current);
        }
      } catch (error) {
        console.error('Failed to load Google Places API:', error);
      }
    };

    initializeAutocomplete();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setUploadedFile(file);
        setFormData(prev => ({ ...prev, projectImage: file }));
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file);
      setFormData(prev => ({ ...prev, projectImage: file }));
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Prepare form data for webhook
      const submissionData: any = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        source: 'Website Form',
        timestamp: new Date().toISOString(),
        agreeToTerms: formData.agreeToTerms
      };

      // Convert image to base64 if uploaded
      if (formData.projectImage) {
        try {
          const base64Image = await convertFileToBase64(formData.projectImage);
          submissionData.projectImage = base64Image;
          submissionData.imageFileName = formData.projectImage.name;
        } catch (error) {
          console.warn('Failed to convert image to base64:', error);
        }
      }

      // Submit to webhook
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          address: '',
          agreeToTerms: false
        });
        setUploadedFile(null);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setErrorMessage('There was an error submitting your form. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (submitStatus === 'success') {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="px-6 py-4 text-center bg-gradient-to-r from-green-600 to-green-700">
            <h3 className="text-lg sm:text-xl font-bold text-white">Thank You!</h3>
          </div>
          <div className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-gray-900 mb-2">Form Submitted Successfully!</h4>
            <p className="text-gray-600 mb-6">
              We've received your request and will contact you within 24 hours to schedule your free consultation.
            </p>
            <button
              onClick={() => setSubmitStatus('idle')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Form Header */}
        <div className="px-6 py-4 text-center bg-gradient-to-r from-blue-600 to-blue-700">
          <h3 className="text-lg sm:text-xl font-bold text-white">{title}</h3>
        </div>
        
        {/* Form Content */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Error Message */}
            {submitStatus === 'error' && (
              <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-md">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-700">{errorMessage}</p>
              </div>
            )}

            {/* First Name */}
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full h-9 px-4 py-2 border-2 border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors duration-200"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Last Name */}
            <div>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full h-9 px-4 py-2 border-2 border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors duration-200"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Phone */}
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone*"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full h-9 px-4 py-2 border-2 border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors duration-200"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email*"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full h-9 px-4 py-2 border-2 border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors duration-200"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Address Search */}
            <div className="relative">
              <input
                ref={addressInputRef}
                type="text"
                name="address"
                placeholder="Search address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full h-9 pl-12 pr-4 py-2 border-2 border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors duration-200"
                disabled={isSubmitting}
                autoComplete="off"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* File Upload */}
            <div className="mt-4">
              <label
                htmlFor="file-upload"
                className={`relative flex flex-col items-center justify-center w-full h-20 border-2 border-dashed rounded-md cursor-pointer transition-colors duration-200 ${
                  isSubmitting 
                    ? 'opacity-50 cursor-not-allowed' 
                    : dragActive 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={!isSubmitting ? handleDrag : undefined}
                onDragLeave={!isSubmitting ? handleDrag : undefined}
                onDragOver={!isSubmitting ? handleDrag : undefined}
                onDrop={!isSubmitting ? handleDrop : undefined}
              >
                <div className="flex flex-col items-center justify-center pt-2 pb-3">
                  <Upload className="w-6 h-6 text-gray-400 mb-1" />
                  <p className="text-xs text-gray-600 text-center">
                    {uploadedFile ? uploadedFile.name : 'Image Upload of Project'}
                  </p>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={isSubmitting}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />
              </label>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start space-x-3 mt-4">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className="w-4 h-4 mt-0.5 text-blue-600 bg-blue-50 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 disabled:opacity-50"
                required
              />
              <label className="text-xs text-gray-800 leading-tight">
                I agree to receive text message updates from Deckora. Msg frequency varies (e.g., up to 4/month). 
                Msg & data rates may apply. Reply STOP to unsubscribe at any time. View{' '}
                <a href="/privacy" className="text-blue-600 hover:text-blue-700">privacy</a> &{' '}
                <a href="/terms" className="text-blue-600 hover:text-blue-700">terms</a>.
              </label>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={!formData.agreeToTerms || isSubmitting}
                className="w-full h-14 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold text-base rounded-md transition-colors duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:transform-none"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  'Get Started'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomForm;