import React from 'react';
import { 
  Navigation, 
  HeroSection, 
  SocialProof, 
  Gallery, 
  About, 
  Reviews, 
  BookingSection,
  Footer,
  PrivacyPolicy,
  TermsOfService
} from './components';

function App() {
  // Simple routing based on URL path
  const path = window.location.pathname;

  if (path === '/privacy') {
    return <PrivacyPolicy />;
  }

  if (path === '/terms') {
    return <TermsOfService />;
  }

  // Default home page
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <section id="home">
          <HeroSection />
        </section>
        <SocialProof />
        <Gallery />
        <About />
        <Reviews />
        <BookingSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;