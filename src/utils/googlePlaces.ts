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

    script.onerror = (error) => {
      console.error('Failed to load Google Maps API script:', error);
      isLoading = false;
      reject(new Error('Failed to load Google Maps API'));
    };

    document.head.appendChild(script);
  });
};

export const initializeAddressAutocomplete = (
  inputElement: HTMLInputElement,
  onAddressSelected?: (addressData: {
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  }) => void
): void => {
  console.log('Initializing address autocomplete...');
  if (!window.google || !window.google.maps) {
    console.error('Google Maps API not loaded');
    return;
  }
  console.log('Google Maps API is loaded, creating autocomplete...');

  const autocomplete = new window.google.maps.places.Autocomplete(inputElement, {
    types: ['address'],
    componentRestrictions: { country: ['us', 'ca'] }, // Restrict to US and Canada
    fields: ['formatted_address', 'geometry', 'address_components']
  });

  let isPlaceSelected = false;

  // Function to fill in address like the working HTML
  function fillInAddress() {
    const place = autocomplete.getPlace();
    console.log('Place changed event fired:', place);

    // Clear previous address fields
    const addressEl = document.getElementById('address') as HTMLInputElement;
    const cityEl = document.getElementById('city') as HTMLInputElement;
    const stateEl = document.getElementById('state') as HTMLInputElement;
    const countryEl = document.getElementById('country') as HTMLInputElement;
    const postalCodeEl = document.getElementById('postal_code') as HTMLInputElement;

    if (addressEl) addressEl.value = '';
    if (cityEl) cityEl.value = '';
    if (stateEl) stateEl.value = '';
    if (countryEl) countryEl.value = '';
    if (postalCodeEl) postalCodeEl.value = '';

    let streetNumber = '';
    let route = '';

    if (place && place.address_components) {
      for (const component of place.address_components) {
        const componentType = component.types[0];
        switch (componentType) {
          case "street_number":
            streetNumber = component.long_name;
            break;
          case "route":
            route = component.long_name;
            break;
          case "locality":
            if (cityEl) cityEl.value = component.long_name;
            break;
          case "administrative_area_level_1":
            if (stateEl) stateEl.value = component.short_name;
            break;
          case "country":
            if (countryEl) countryEl.value = component.long_name;
            break;
          case "postal_code":
            if (postalCodeEl) postalCodeEl.value = component.long_name;
            break;
        }
      }
    }

    // Combine street number and route for the full street address
    const fullAddress = `${streetNumber} ${route}`.trim();
    if (addressEl) addressEl.value = fullAddress;

    console.log("Address populated:", {
      address: addressEl?.value,
      city: cityEl?.value,
      state: stateEl?.value,
      country: countryEl?.value,
      postal_code: postalCodeEl?.value
    });

    // Call the callback with parsed address data
    if (onAddressSelected) {
      onAddressSelected({
        address: fullAddress,
        city: cityEl?.value || '',
        state: stateEl?.value || '',
        country: countryEl?.value || '',
        postalCode: postalCodeEl?.value || ''
      });
    }
  }

  autocomplete.addListener('place_changed', fillInAddress);

  // Monitor for pac-container creation and hide it if a place was just selected
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as HTMLElement;
          if (element.classList?.contains('pac-container') ||
              element.querySelector?.('.pac-container')) {

            const pacContainer = element.classList?.contains('pac-container')
              ? element
              : element.querySelector('.pac-container') as HTMLElement;

            if (pacContainer && isPlaceSelected) {
              pacContainer.style.display = 'none';
              pacContainer.style.visibility = 'hidden';
            }
          }
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Handle direct clicks on pac items
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;

    if (target.closest('.pac-item')) {
      isPlaceSelected = true;
      console.log('Pac item clicked directly');

      // Wait for Google to process the click, then hide
      setTimeout(() => {
        const pacContainers = document.querySelectorAll('.pac-container');
        pacContainers.forEach(container => {
          (container as HTMLElement).style.display = 'none';
          (container as HTMLElement).style.visibility = 'hidden';
        });
      }, 50);
    }
  }, true);

  // Hide dropdown when clicking outside
  document.addEventListener('click', (event) => {
    const target = event.target as Node;
    const pacContainer = document.querySelector('.pac-container');

    if (!inputElement.contains(target) &&
        pacContainer &&
        !pacContainer.contains(target)) {
      (pacContainer as HTMLElement).style.display = 'none';
    }
  });
};
