import React from 'react';
import { Star } from 'lucide-react';
import CustomForm from './CustomForm';

interface HeroSectionProps {
  backgroundImage?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  formTitle?: string;
  reviewText?: string;
  reviewCount?: string;
  useCustomForm?: boolean;
  webhookUrl?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundImage = "https://storage.googleapis.com/msgsndr/aQYV8jwYWM9za5egdIl2/media/686738689ca6fba4f4182282.webp",
  title = "Fairmount's Trusted",
  subtitle = "Carpentry & Handyman Services",
  description = "Serving Fairmount, La Fayette, and North Georgia with expert carpentry, deck building, handyman services, and home repairs. Licensed, insured, and locally trusted.",
  primaryButtonText = "Explore Our Services",
  secondaryButtonText = "View Our Work",
  formTitle = "Get Your Free Project Estimate",
  reviewText = "Rated 4.7 Stars by 12+ North Georgia Homeowners!",
  reviewCount = "12+",
  useCustomForm = true,
  webhookUrl = import.meta.env.VITE_HIGHLEVEL_WEBHOOK_URL || ""
}) => {

  return (
    <section className="relative min-h-[70vh] lg:h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Custom Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Custom gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(29, 78, 216, 0.7), rgba(17, 24, 39, 1.0))'
          }}
        ></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Content - Always visible */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {title}
                <br />
                <span className="text-blue-200">{subtitle}</span>
              </h1>
              <p className="text-lg sm:text-xl text-blue-100 max-w-2xl leading-relaxed">
                {description}
              </p>
            </div>

            {/* Action Buttons - Show on all devices */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#gallery"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-center"
              >
                {primaryButtonText}
              </a>
              <a
                href="#gallery"
                className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-800 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 text-center"
              >
                {secondaryButtonText}
              </a>
            </div>

            {/* Social Proof - Always visible */}
            <div className="bg-blue-800/30 backdrop-blur-sm rounded-xl p-6 border border-blue-400/20">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-blue-100 font-medium">{reviewText}</p>
            </div>
          </div>

          {/* Right Form */}
          <div className="flex justify-center lg:justify-end">
            {useCustomForm ? (
              <CustomForm 
                title={formTitle}
                webhookUrl={webhookUrl}
              />
            ) : (
              <div className="w-full max-w-md mx-auto">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                  {/* Form Header */}
                  <div className="px-6 py-4 text-center bg-gradient-to-r from-blue-600 to-blue-700">
                    <h3 className="text-lg sm:text-xl font-bold text-white">{formTitle}</h3>
                  </div>
                  
                  {/* HighLevel Form Container */}
                  <div className="h-[500px] lg:h-[600px]">
                    <iframe
                      src="https://api.leadconnectorhq.com/widget/form/SuFpnDAGDmAWtOUrKZQu"
                      className="w-full h-full border-0"
                      style={{
                        display: 'block',
                        borderRadius: '0 0 1rem 1rem',
                        padding: '0',
                        margin: '0'
                      }}
                      scrolling="no"
                      frameBorder="0"
                      id="inline-SuFpnDAGDmAWtOUrKZQu"
                      title="Main Lead Form"
                      allow="camera; microphone; autoplay; encrypted-media; fullscreen"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;