import React from 'react';
import { Award, Users, Calendar, CheckCircle } from 'lucide-react';

const SocialProof: React.FC = () => {
  const stats = [
    {
      icon: Users,
      number: "50+",
      label: "Happy Customers",
      description: "Satisfied homeowners across North Georgia"
    },
    {
      icon: Calendar,
      number: "10+",
      label: "Years Experience",
      description: "Years of carpentry and handyman services"
    },
    {
      icon: CheckCircle,
      number: "100+",
      label: "Projects Completed",
      description: "Successfully delivered carpentry projects"
    },
    {
      icon: Award,
      number: "4.7",
      label: "Star Rating",
      description: "Average rating from Google reviews"
    }
  ];

  const certifications = [
    "Licensed & Insured",
    "BBB A+ Rating",
    "Certified Carpenters",
    "Bonded Professionals",
    "OSHA Safety Trained",
    "Quality Guarantees"
  ];

  const serviceAreas = [
    "Fairmount", "La Fayette", "Dalton", "Rome",
    "Calhoun", "Chatsworth", "Summerville", "Trion",
    "Ringgold", "Chickamauga", "Rossville", "Fort Oglethorpe"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted by North Georgia Homeowners
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our track record speaks for itself. We've built our reputation one project at a time.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <stat.icon className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-semibold text-gray-800 mb-2">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Certifications & Credentials */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Licensed & Certified Professionals
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg"
                >
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-800 font-medium">{cert}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 font-medium">
                ✓ Fully bonded and insured for your peace of mind
              </p>
              <p className="text-blue-700 text-sm mt-1">
                All work comes with comprehensive warranties and guarantees
              </p>
            </div>
          </div>

          {/* Service Areas */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Serving North Georgia
            </h3>
            <p className="text-gray-600 mb-6">
              We proudly serve homeowners throughout North Georgia with professional carpentry and handyman services.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {serviceAreas.map((area, index) => (
                <div
                  key={index}
                  className="text-center py-2 px-3 bg-gray-50 rounded-lg text-gray-800 font-medium hover:bg-blue-50 hover:text-blue-800 transition-colors duration-300"
                >
                  {area}
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg text-white">
              <p className="font-medium">Don't see your city listed?</p>
              <p className="text-blue-100 text-sm mt-1">
                Contact us! We may still be able to serve your area.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 bg-white rounded-full px-8 py-4 shadow-lg">
            <div className="flex items-center space-x-2">
              <Award className="w-6 h-6 text-yellow-500" />
              <span className="font-semibold text-gray-900">Award-Winning Service</span>
            </div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span className="font-semibold text-gray-900">100% Satisfaction Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;