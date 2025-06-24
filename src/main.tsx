import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Prevent FOUC by adding loaded class after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Small delay to ensure all styles are loaded
  setTimeout(() => {
    document.documentElement.classList.add('loaded');
  }, 100);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);