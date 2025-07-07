import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://storage.googleapis.com/msgsndr/yioc9gxnGLaNC1p4s1CX/media/685c1a982c6cb1cde1f6e960.webp",
    "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://storage.googleapis.com/msgsndr/yioc9gxnGLaNC1p4s1CX/media/685c1a984669a95105772219.webp",
    "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://storage.googleapis.com/msgsndr/yioc9gxnGLaNC1p4s1CX/media/685c1a98a392d00de30dd0d4.webp",
    "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://storage.googleapis.com/msgsndr/yioc9gxnGLaNC1p4s1CX/media/685c1a98a392d048090dd0d3.webp",
    "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://storage.googleapis.com/msgsndr/yioc9gxnGLaNC1p4s1CX/media/685c1a98caca582c1822f8d7.webp",
    "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://storage.googleapis.com/msgsndr/yioc9gxnGLaNC1p4s1CX/media/685c1a98caca587f9322f8d6.webp",
    "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://storage.googleapis.com/msgsndr/yioc9gxnGLaNC1p4s1CX/media/685c1a98e581e04bec34c2d7.webp",
    "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://storage.googleapis.com/msgsndr/yioc9gxnGLaNC1p4s1CX/media/685c1a98f670206fb8fc705f.webp",
    "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://storage.googleapis.com/msgsndr/yioc9gxnGLaNC1p4s1CX/media/685c1a997f1b992cfdb3d608.webp",
    "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://storage.googleapis.com/msgsndr/yioc9gxnGLaNC1p4s1CX/media/685c1a997f1b994d9fb3d607.webp",
    "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://storage.googleapis.com/msgsndr/BK5WOlszHMZB0udM7qC1/media/6855f48950dfe6756e215c26.webp",
    "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://storage.googleapis.com/msgsndr/BK5WOlszHMZB0udM7qC1/media/6855f489d0c8df0321e1126e.webp",
    "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://storage.googleapis.com/msgsndr/BK5WOlszHMZB0udM7qC1/media/6855f48942e8ef583415f8e8.webp",
    "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://storage.googleapis.com/msgsndr/BK5WOlszHMZB0udM7qC1/media/6855f489ca34e31b662b9251.webp",
    "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://storage.googleapis.com/msgsndr/BK5WOlszHMZB0udM7qC1/media/6855f489ac9458bf7ab026d9.webp",
    "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://storage.googleapis.com/msgsndr/BK5WOlszHMZB0udM7qC1/media/6855f4891a74cddc316bb5f5.webp",
    "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://storage.googleapis.com/msgsndr/BK5WOlszHMZB0udM7qC1/media/6855f489d0c8df639ce1126d.webp",
    "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://storage.googleapis.com/msgsndr/BK5WOlszHMZB0udM7qC1/media/6855f4898b2950b7fe704e46.webp",
    "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://storage.googleapis.com/msgsndr/BK5WOlszHMZB0udM7qC1/media/6855f4899f0e4cc6b9193982.webp",
    "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://storage.googleapis.com/msgsndr/BK5WOlszHMZB0udM7qC1/media/6855f489ca34e3a6b62b9250.webp",
    "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://storage.googleapis.com/msgsndr/BK5WOlszHMZB0udM7qC1/media/6855f4899224d790e683200f.webp",
    "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://storage.googleapis.com/msgsndr/BK5WOlszHMZB0udM7qC1/media/6855f489ac9458b521b026d8.webp",
    "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://storage.googleapis.com/msgsndr/BK5WOlszHMZB0udM7qC1/media/6855ec99ca34e38fe92b8bb3.webp",
    "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://storage.googleapis.com/msgsndr/BK5WOlszHMZB0udM7qC1/media/6855ec991a74cd9d3a6baec6.webp",
    "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://storage.googleapis.com/msgsndr/BK5WOlszHMZB0udM7qC1/media/6855ec9950dfe6a15b215664.webp",
    "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://storage.googleapis.com/msgsndr/BK5WOlszHMZB0udM7qC1/media/6855ec99ca34e30d0c2b8bb2.webp",
    "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://storage.googleapis.com/msgsndr/BK5WOlszHMZB0udM7qC1/media/6855ec999f0e4c7fff193470.webp",
    "https://images.leadconnectorhq.com/image/f_webp/q_80/r_1200/u_https://storage.googleapis.com/msgsndr/BK5WOlszHMZB0udM7qC1/media/6855ec9950dfe6699b215665.webp"
  ];

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    if (direction === 'prev') {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    } else {
      setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (selectedImage === null) return;
      
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          navigateImage('prev');
          break;
        case 'ArrowRight':
          event.preventDefault();
          navigateImage('next');
          break;
        case 'Escape':
          event.preventDefault();
          closeLightbox();
          break;
      }
    };

    if (selectedImage !== null) {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [selectedImage]);

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Carpentry & Home Improvement Portfolio
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our collection of custom carpentry and home improvement projects. From custom stairs
            to complete home renovations, see how we transform your vision into beautiful, functional reality.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => openLightbox(index)}
            >
              <div className="aspect-square">
                <img
                  src={image}
                  alt={`Carpentry project ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium">View Project</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-8">
            Ready to transform your home? Let's discuss your vision!
          </p>
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            Get Your Free Project Consultation
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-white transition-all duration-300"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-white transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => navigateImage('next')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-white transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <img
              src={galleryImages[selectedImage]}
              alt={`Carpentry project ${selectedImage + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg"
            />

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-20 px-4 py-2 rounded-full text-white text-sm">
              {selectedImage + 1} of {galleryImages.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;