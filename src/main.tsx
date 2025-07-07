import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Simple FOUC prevention - no responsive detection
document.addEventListener('DOMContentLoaded', () => {
  // Wait for one animation frame to ensure layout is calculated
  requestAnimationFrame(() => {
    document.documentElement.classList.add('loaded');
  });
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);