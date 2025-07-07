import React, { useEffect } from 'react';
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
  TermsOfService,
  Visualizer,
  VoiceAI
} from './components';
import { useResponsive } from './hooks/useResponsive';

function App() {
  // Enhanced responsive detection
  const responsive = useResponsive();

  // Simple routing based on URL path
  const path = window.location.pathname;

  // Log responsive state for debugging
  useEffect(() => {
    console.log('App responsive state:', {
      breakpoint: responsive.breakpoint,
      width: responsive.width,
      isDesktop: responsive.isDesktop,
      isLargeDesktop: responsive.isLargeDesktop
    });
  }, [responsive]);

  if (path === '/privacy') {
    return <PrivacyPolicy />;
  }

  if (path === '/terms') {
    return <TermsOfService />;
  }

  if (path === '/visualizer') {
    return <Visualizer />;
  }

  if (path === '/voice') {
    return <VoiceAI />;
  }

  // Default home page with enhanced responsive classes
  return (
    <div
      className={`min-h-screen debug-responsive ${responsive.breakpoint}`}
      data-responsive-width={responsive.width}
      data-responsive-breakpoint={responsive.breakpoint}
    >
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