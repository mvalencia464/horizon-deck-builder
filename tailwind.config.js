/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    // Ensure responsive grid classes are never purged
    'grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4', 'grid-cols-5', 'grid-cols-6',
    'md:grid-cols-1', 'md:grid-cols-2', 'md:grid-cols-3', 'md:grid-cols-4', 'md:grid-cols-5', 'md:grid-cols-6',
    'lg:grid-cols-1', 'lg:grid-cols-2', 'lg:grid-cols-3', 'lg:grid-cols-4', 'lg:grid-cols-5', 'lg:grid-cols-6',
    'xl:grid-cols-1', 'xl:grid-cols-2', 'xl:grid-cols-3', 'xl:grid-cols-4', 'xl:grid-cols-5', 'xl:grid-cols-6',
    // Ensure responsive flex classes are never purged
    'flex-col', 'flex-row', 'md:flex-col', 'md:flex-row', 'lg:flex-col', 'lg:flex-row',
    // Ensure responsive display classes are never purged
    'block', 'hidden', 'md:block', 'md:hidden', 'lg:block', 'lg:hidden',
    // Ensure responsive spacing classes are never purged
    'space-x-4', 'space-x-6', 'space-x-8', 'space-y-4', 'space-y-6', 'space-y-8',
    'md:space-x-4', 'md:space-x-6', 'md:space-x-8', 'md:space-y-4', 'md:space-y-6', 'md:space-y-8',
    'lg:space-x-4', 'lg:space-x-6', 'lg:space-x-8', 'lg:space-y-4', 'lg:space-y-6', 'lg:space-y-8',
  ],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      // Ensure proper responsive behavior
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      }
    },
  },
  plugins: [],
  // Ensure proper CSS generation
  corePlugins: {
    preflight: true,
  },
};
