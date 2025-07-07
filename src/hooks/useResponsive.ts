import { useState, useEffect } from 'react';

export interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  width: number;
  breakpoint: 'mobile' | 'tablet' | 'desktop' | 'large-desktop';
}

export function useResponsive(): ResponsiveState {
  const [state, setState] = useState<ResponsiveState>(() => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
    return getResponsiveState(width);
  });

  useEffect(() => {
    function updateState() {
      const width = window.innerWidth;
      const newState = getResponsiveState(width);
      setState(newState);
      
      // Update HTML classes for CSS fallback
      const html = document.documentElement;
      html.classList.remove('mobile', 'tablet', 'desktop', 'large-desktop');
      html.classList.add(newState.breakpoint);
      html.setAttribute('data-breakpoint', newState.breakpoint);
      
      console.log('Responsive state updated:', newState);
    }

    // Debounced resize handler
    let timeoutId: NodeJS.Timeout;
    function handleResize() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateState, 100);
    }

    // Initial update
    updateState();

    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', () => {
      setTimeout(updateState, 200);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', updateState);
      clearTimeout(timeoutId);
    };
  }, []);

  return state;
}

function getResponsiveState(width: number): ResponsiveState {
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024 && width < 1280;
  const isLargeDesktop = width >= 1280;

  let breakpoint: ResponsiveState['breakpoint'];
  if (isMobile) breakpoint = 'mobile';
  else if (isTablet) breakpoint = 'tablet';
  else if (isDesktop) breakpoint = 'desktop';
  else breakpoint = 'large-desktop';

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    width,
    breakpoint,
  };
}

// Utility function to get current breakpoint
export function getCurrentBreakpoint(): ResponsiveState['breakpoint'] {
  const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
  return getResponsiveState(width).breakpoint;
}

// Utility function to check if current viewport is desktop
export function isDesktopViewport(): boolean {
  const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
  return width >= 1024;
}
