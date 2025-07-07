import React from 'react';
import { Hammer, Shield, Clock, Heart } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: Hammer,
      title: "Master Craftsmanship",
      description: "Decades of experience in carpentry, home improvement, and custom stair building with attention to every detail."
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description: "We stand behind our work with comprehensive warranties and use only the finest materials for lasting results."
    },
    {
      icon: Clock,
      title: "Reliable Service",
      description: "We respect your time and complete projects on schedule while maintaining the highest quality standards."
    },
    {
      icon: Heart,
      title: "Customer Focused",
      description: "Your satisfaction drives everything we do. We listen, communicate, and deliver beyond expectations."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Crafting Quality, Building Trust
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Horizon Carpentry & Handyman has been serving the Fairmount, La Fayette, and North Georgia area with exceptional
                carpentry and handyman services. From deck construction to general repairs, we bring years of experience
                and unwavering commitment to quality craftsmanship.
              </p>
              <p>
                Our skilled team specializes in carpentry, deck building, handyman services, home renovations,
                and construction projects. Whether you need bathroom remodeling, deck installation, electrical work, or general repairs,
                we approach every project with the same dedication to excellence.
              </p>
              <p>
                What sets us apart is our personal approach to every job. We take the time to understand
                your needs, provide honest assessments, and deliver work that exceeds expectations.
                Your satisfaction is our guarantee.
              </p>
            </div>
            
            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-8 mt-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">50+</div>
                <div className="text-sm text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">10+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">4.7★</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://storage.googleapis.com/msgsndr/aQYV8jwYWM9za5egdIl2/media/686738689ca6fba4f4182282.webp"
                alt="Professional carpentry and handyman work"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Licensed & Insured</div>
                  <div className="text-sm text-gray-600">Professional carpentry services</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Horizon Carpentry & Handyman?
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're skilled craftsmen who take pride in every project – from deck construction to complete
            home improvements that enhance your living space and add lasting value.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="text-center p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <value.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                {value.title}
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-white">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Our Simple Process</h3>
            <p className="text-blue-100 text-lg">
              From initial consultation to project completion, we make home improvement easy and stress-free.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Consultation", desc: "Free assessment and project planning" },
              { step: "2", title: "Planning", desc: "Detailed scope and material selection" },
              { step: "3", title: "Execution", desc: "Expert craftsmanship with clear communication" },
              { step: "4", title: "Completion", desc: "Final walkthrough and satisfaction guarantee" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                <p className="text-blue-100 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;