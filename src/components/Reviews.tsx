import React from 'react';
import { Star, Quote } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
}

const Reviews: React.FC = () => {
  const reviews: Review[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "Denver, CO",
      rating: 5,
      text: "DeckMaster Pro exceeded all our expectations! They transformed our backyard into an amazing outdoor living space. The attention to detail and craftsmanship is outstanding. Our deck has become the centerpiece of our home.",
      date: "2 weeks ago",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      id: 2,
      name: "Mike Rodriguez",
      location: "Boulder, CO",
      rating: 5,
      text: "Professional, reliable, and incredibly skilled. The team completed our multi-level deck project on time and within budget. The quality of materials and workmanship is top-notch. Highly recommend!",
      date: "1 month ago",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      id: 3,
      name: "Emily Chen",
      location: "Fort Collins, CO",
      rating: 5,
      text: "From design to completion, the entire process was seamless. They listened to our ideas and created something even better than we imagined. Our new deck is perfect for entertaining and family gatherings.",
      date: "3 weeks ago",
      avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      id: 4,
      name: "David Thompson",
      location: "Colorado Springs, CO",
      rating: 5,
      text: "Outstanding work! They handled everything from permits to cleanup. The 3D design helped us visualize the final result perfectly. Our deck has increased our home's value significantly.",
      date: "2 months ago",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      id: 5,
      name: "Lisa Martinez",
      location: "Lakewood, CO",
      rating: 5,
      text: "Incredible attention to detail and customer service. They worked around our schedule and kept us informed throughout the project. The final result is absolutely beautiful - we love our new outdoor space!",
      date: "1 month ago",
      avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      id: 6,
      name: "Robert Kim",
      location: "Westminster, CO",
      rating: 5,
      text: "Best investment we've made in our home! The team was professional, clean, and delivered exactly what they promised. Our deck is now our favorite place to relax and entertain guests.",
      date: "3 months ago",
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    }
  ];

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Don't just take our word for it. Here's what our satisfied customers have to say about their deck building experience with us.
          </p>
          
          {/* Overall Rating */}
          <div className="inline-flex items-center bg-blue-50 px-6 py-3 rounded-full">
            <div className="flex items-center space-x-2">
              {renderStars(5)}
              <span className="text-2xl font-bold text-gray-900 ml-2">5.0</span>
              <span className="text-gray-600">• 150+ Reviews</span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Quote Icon */}
              <div className="flex justify-between items-start mb-6">
                <Quote className="w-8 h-8 text-blue-600 opacity-50" />
                <div className="flex items-center space-x-1">
                  {renderStars(review.rating)}
                </div>
              </div>

              {/* Review Text */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{review.text}"
              </p>

              {/* Reviewer Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{review.name}</h4>
                  <p className="text-sm text-gray-600">{review.location}</p>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Join Our Happy Customers?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Experience the same exceptional service and craftsmanship that has earned us 150+ five-star reviews. 
              Get your free consultation today!
            </p>
            <a
              href="#contact"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
            >
              Start Your Deck Project
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;