// Google Places API utility functions

declare global {
  interface Window {
    google: any;
    initGoogleMaps: () => void;
  }
}

let isGoogleMapsLoaded = false;
let isLoading = false;

export const loadGoogleMapsAPI = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // If already loaded, resolve immediately
    if (isGoogleMapsLoaded && window.google) {
      resolve();
      return;
    }

    // If currently loading, wait for it
    if (isLoading) {
      const checkLoaded = () => {
        if (isGoogleMapsLoaded && window.google) {
          resolve();
        } else {
          setTimeout(checkLoaded, 100);
        }
      };
      checkLoaded();
      return;
    }

    isLoading = true;

    const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      reject(new Error('Google Places API key not found'));
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMaps`;
    script.async = true;
    script.defer = true;

    // Global callback function
    window.initGoogleMaps = () => {
      isGoogleMapsLoaded = true;
      isLoading = false;
      resolve();
    };

    script.onerror = () => {
      isLoading = false;
      reject(new Error('Failed to load Google Maps API'));
    };

    document.head.appendChild(script);
  });
};

export const initializeAddressAutocomplete = (inputElement: HTMLInputElement): void => {
  if (!window.google || !window.google.maps) {
    console.error('Google Maps API not loaded');
    return;
  }

  const autocomplete = new window.google.maps.places.Autocomplete(inputElement, {
    types: ['address'],
    componentRestrictions: { country: 'us' }, // Restrict to US addresses
    fields: ['formatted_address', 'geometry', 'address_components']
  });

  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    if (place.formatted_address) {
      inputElement.value = place.formatted_address;

      // Trigger change event for React
      const event = new Event('input', { bubbles: true });
      inputElement.dispatchEvent(event);

      // Clear the autocomplete dropdown by blurring the input
      inputElement.blur();

      // Alternative method: Clear the autocomplete suggestions
      setTimeout(() => {
        const pacContainer = document.querySelector('.pac-container');
        if (pacContainer) {
          (pacContainer as HTMLElement).style.display = 'none';
        }
      }, 100);
    }
  });

  // Also hide dropdown when user clicks elsewhere
  document.addEventListener('click', (event) => {
    if (!inputElement.contains(event.target as Node)) {
      const pacContainer = document.querySelector('.pac-container');
      if (pacContainer) {
        (pacContainer as HTMLElement).style.display = 'none';
      }
    }
  });
};
