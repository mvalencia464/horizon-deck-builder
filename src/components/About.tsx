import React from 'react';
import { Hammer, Shield, Clock, Heart } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: Hammer,
      title: "Expert Craftsmanship",
      description: "Over 15 years of experience building custom decks with meticulous attention to detail and superior materials."
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description: "We stand behind our work with comprehensive warranties and use only the finest materials for lasting durability."
    },
    {
      icon: Clock,
      title: "Timely Delivery",
      description: "We respect your time and complete projects on schedule without compromising on quality or safety standards."
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "Your satisfaction is our priority. We listen to your vision and exceed expectations with personalized service."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Building Dreams, One Deck at a Time
            </h2>
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                For over 15 years, Deckora has been Colorado's premier deck building company, 
                transforming outdoor spaces into beautiful, functional extensions of your home. We combine 
                traditional craftsmanship with modern techniques to create decks that stand the test of time.
              </p>
              <p>
                Our team of licensed professionals takes pride in every project, from intimate backyard 
                retreats to expansive entertainment spaces. We work closely with each client to understand 
                their vision and bring it to life with exceptional attention to detail.
              </p>
              <p>
                What sets us apart is our commitment to quality, transparency, and customer satisfaction. 
                Every deck we build comes with comprehensive warranties, and we use only premium materials 
                from trusted manufacturers.
              </p>
            </div>
            
            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-8 mt-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">15+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">5.0★</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://storage.googleapis.com/msgsndr/BK5WOlszHMZB0udM7qC1/media/6855f48942e8ef583415f8e8.webp?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop"
                alt="Professional deck builders at work"
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
                  <div className="text-sm text-gray-600">Fully bonded professionals</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose Deckora?
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're not just deck builders – we're craftsmen who care about creating outdoor spaces 
            that enhance your lifestyle and add value to your home.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
              From initial consultation to final walkthrough, we make deck building easy and stress-free.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Consultation", desc: "Free in-home consultation and 3D design" },
              { step: "2", title: "Planning", desc: "Detailed planning and permit handling" },
              { step: "3", title: "Building", desc: "Expert construction with daily updates" },
              { step: "4", title: "Completion", desc: "Final walkthrough and warranty setup" }
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