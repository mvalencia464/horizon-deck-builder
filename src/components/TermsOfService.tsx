import React from 'react';
import { ArrowLeft } from 'lucide-react';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Website
          </button>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
            <p className="text-gray-700">
              By accessing and using Horizon Carpentry & Handyman's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Services</h2>
            <p className="text-gray-700 mb-4">
              Horizon Carpentry & Handyman provides carpentry, handyman, and related services including:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Deck construction and repair</li>
              <li>Bathroom remodeling</li>
              <li>Home improvement and repair services</li>
              <li>Handyman services</li>
              <li>Electrical work</li>
              <li>Siding installation</li>
              <li>Tree service</li>
              <li>Consultation and estimation services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Estimates and Pricing</h2>
            <p className="text-gray-700 mb-4">
              All estimates provided are:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Free of charge for initial consultations</li>
              <li>Valid for 30 days from the date provided</li>
              <li>Subject to change based on material costs and project modifications</li>
              <li>Not binding until a formal contract is signed</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Terms</h2>
            <p className="text-gray-700 mb-4">
              Payment terms will be specified in individual project contracts. Generally:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>A deposit may be required to begin work</li>
              <li>Progress payments may be scheduled based on project milestones</li>
              <li>Final payment is due upon project completion</li>
              <li>Late payments may incur additional fees</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Warranties</h2>
            <p className="text-gray-700 mb-4">
              We provide warranties on our workmanship and materials as follows:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Workmanship warranty: 2 years from completion date</li>
              <li>Material warranties: As provided by manufacturers</li>
              <li>Structural warranty: 5 years on deck framing and support</li>
              <li>Warranty does not cover normal wear, weather damage, or misuse</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Liability</h2>
            <p className="text-gray-700">
              Coastal Custom Carpentry carries full liability insurance and bonding. Our liability is limited to the value of the work performed. We are not responsible for indirect or consequential damages.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Permits and Compliance</h2>
            <p className="text-gray-700">
              We will obtain necessary permits for your project where required. You are responsible for ensuring access to the work area and compliance with any HOA or local restrictions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cancellation Policy</h2>
            <p className="text-gray-700 mb-4">
              Project cancellation terms:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>You may cancel within 3 business days of contract signing</li>
              <li>Cancellation after work begins may incur charges for completed work</li>
              <li>Material orders cannot be cancelled once placed with suppliers</li>
              <li>Refunds will be processed within 30 days of approved cancellation</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Website Use</h2>
            <p className="text-gray-700 mb-4">
              When using our website, you agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Provide accurate information in all forms</li>
              <li>Not use the site for any unlawful purposes</li>
              <li>Respect intellectual property rights</li>
              <li>Not attempt to disrupt or damage the website</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-700 mb-4">
              For questions about these Terms of Service, contact us:
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-700"><strong>Email:</strong> gibbywalker224@gmail.com</p>
              <p className="text-gray-700"><strong>Phone:</strong> (509) 620-9939</p>
              <p className="text-gray-700"><strong>Address:</strong> 166 Spring St, Fairmount, GA 30139</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
            <p className="text-gray-700">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services constitutes acceptance of any changes.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;