import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Enhanced responsive detection and FOUC prevention
function initializeApp() {
  // Ensure responsive classes are set
  const width = window.innerWidth || document.documentElement.clientWidth;
  const html = document.documentElement;

  // Force proper responsive detection
  if (width >= 1024 && !html.classList.contains('desktop') && !html.classList.contains('large-desktop')) {
    console.warn('Desktop viewport detected but no desktop class found. Forcing desktop mode.');
    html.classList.remove('mobile', 'tablet');
    html.classList.add(width >= 1280 ? 'large-desktop' : 'desktop');
    html.setAttribute('data-breakpoint', width >= 1280 ? 'large-desktop' : 'desktop');
  }

  // Add loaded class to prevent FOUC
  html.classList.add('loaded');

  // Log final state for debugging
  console.log('App initialized with:', {
    viewport: `${width}px`,
    breakpoint: html.getAttribute('data-breakpoint'),
    classes: Array.from(html.classList),
    userAgent: navigator.userAgent.substring(0, 50)
  });
}

// Prevent FOUC by adding loaded class after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Wait for one animation frame to ensure layout is calculated
  requestAnimationFrame(() => {
    initializeApp();
  });
});

// Also run immediately if DOM is already loaded
if (document.readyState !== 'loading') {
  requestAnimationFrame(() => {
    initializeApp();
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);