import React from 'react';
import { ArrowLeft, Phone, Mic, Bot, Zap } from 'lucide-react';

const VoiceAI: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Website
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-6">
            <Bot className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Voice AI Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Experience our cutting-edge AI caller technology. This intelligent assistant can handle customer inquiries, 
            schedule appointments, and provide information about our services 24/7.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
              <Phone className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Availability</h3>
            <p className="text-gray-600">Never miss a call. Our AI assistant is available around the clock to help your customers.</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
              <Mic className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Natural Conversations</h3>
            <p className="text-gray-600">Advanced AI that understands context and responds naturally to customer questions.</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mb-4">
              <Zap className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Responses</h3>
            <p className="text-gray-600">Get immediate answers about services, pricing, and availability without waiting.</p>
          </div>
        </div>

        {/* Demo Widget */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Try Our Voice AI Assistant
            </h2>
            <p className="text-gray-600 mb-6">
              Click the button below to start a conversation with our AI assistant. 
              Ask about our services, pricing, or schedule an appointment!
            </p>
          </div>
          
          {/* Voice AI Widget Container */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              {/* Vapi Widget */}
              <div className="text-center">
                <vapi-widget
                  assistant-id="b15889d1-d580-4a00-b5ae-413d6df43e45"
                  public-key="890a9794-af62-43aa-ac28-bdcb9168e8dd"
                ></vapi-widget>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Implement Voice AI for Your Business?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Transform your customer service with AI technology that never sleeps. 
            Increase conversions and improve customer satisfaction.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
          >
            Learn More About Voice AI
          </a>
        </div>
      </div>
    </div>
  );
};

export default VoiceAI;
