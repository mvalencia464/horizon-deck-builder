import React from 'react';
import { Calendar, Clock, CheckCircle } from 'lucide-react';

const BookingSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Schedule Your Free Consultation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to transform your home? Book a free consultation with our carpentry and home improvement experts.
            We'll discuss your vision, provide a detailed estimate, and plan the perfect solution for your project.
          </p>
        </div>

        {/* Single Column Layout */}
        <div className="space-y-12">
          {/* What to Expect Section */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              What to Expect During Your Consultation
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Site Assessment
                </h4>
                <p className="text-gray-600">
                  We'll evaluate your space, discuss your vision, and assess any structural considerations for your project.
                </p>
              </div>

              <div className="text-center">
                <div className="flex-shrink-0 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Design Options
                </h4>
                <p className="text-gray-600">
                  Review material options, design styles, and features that will make your project perfect for your lifestyle.
                </p>
              </div>

              <div className="text-center">
                <div className="flex-shrink-0 w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Timeline & Estimate
                </h4>
                <p className="text-gray-600">
                  Receive a detailed timeline and transparent pricing for your project, with no hidden fees or surprises.
                </p>
              </div>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6 text-center">Why Choose Horizon Carpentry & Handyman?</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-blue-200 flex-shrink-0" />
                <span className="text-blue-100">Licensed & Insured</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-blue-200 flex-shrink-0" />
                <span className="text-blue-100">10+ Years Experience</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-blue-200 flex-shrink-0" />
                <span className="text-blue-100">4.7-Star Rated</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-blue-200 flex-shrink-0" />
                <span className="text-blue-100">Free Estimates</span>
              </div>
            </div>
          </div>

          {/* Booking Form - Clean Container */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-6 py-4 text-center bg-gradient-to-r from-blue-600 to-blue-700">
              <h3 className="text-xl sm:text-2xl font-bold text-white">Book Your Free Consultation</h3>
              <p className="text-blue-100 mt-2 text-sm sm:text-base">Choose a time that works for you</p>
            </div>
            
            {/* Clean iframe container - no extra padding or margins */}
            <div className="h-[900px] sm:h-[800px] md:h-[700px]">
              <iframe
                src="https://api.leadconnectorhq.com/widget/booking/VK5p3BfnXq2LNHpzyHj6"
                className="w-full h-full border-none"
                style={{
                  display: 'block',
                  borderRadius: '0 0 1rem 1rem'
                }}
                scrolling="no"
                frameBorder="0"
                id="VK5p3BfnXq2LNHpzyHj6_booking"
                title="Booking Calendar"
              />
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Prefer to Talk First?
            </h3>
            <p className="text-gray-600 mb-6">
              Give us a call and we'll answer any questions you have about your home improvement project.
            </p>
            <a
              href="tel:+15096209939"
              className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Call (509) 620-9939
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;