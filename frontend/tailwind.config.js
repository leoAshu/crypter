/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#0066FF',
        bg: {
          light: '#FFFFFF',
          dark: '#101018',
        },
        'text-primary': {
          light: '#23262F',
          dark: '#FFFFFF',
        },
        'text-secondary': {
          light: '#969AA0',
          dark: '#969AA0',
        },
        'card-bg': {
          light: '#F4F6F9',
          dark: '#2C2E3B',
        },
      },
      fontFamily: {
        // Poppins
        'poppins-thin': ['Poppins-Thin'],
        'poppins-extralight': ['Poppins-ExtraLight'],
        'poppins-light': ['Poppins-Light'],
        poppins: ['Poppins-Regular'],
        'poppins-medium': ['Poppins-Medium'],
        'poppins-semibold': ['Poppins-SemiBold'],
        'poppins-bold': ['Poppins-Bold'],
        'poppins-extrabold': ['Poppins-ExtraBold'],
        'poppins-black': ['Poppins-Black'],

        // Heebo
        'heebo-thin': ['Heebo-Thin'],
        'heebo-extralight': ['Heebo-ExtraLight'],
        'heebo-light': ['Heebo-Light'],
        heebo: ['Heebo-Regular'],
        'heebo-medium': ['Heebo-Medium'],
        'heebo-semibold': ['Heebo-SemiBold'],
        'heebo-bold': ['Heebo-Bold'],
        'heebo-extrabold': ['Heebo-ExtraBold'],
        'heebo-black': ['Heebo-Black'],

        // Inter
        'inter-thin': ['Inter-Thin'],
        'inter-extralight': ['Inter-ExtraLight'],
        'inter-light': ['Inter-Light'],
        inter: ['Inter-Regular'],
        'inter-medium': ['Inter-Medium'],
        'inter-semibold': ['Inter-SemiBold'],
        'inter-bold': ['Inter-Bold'],
        'inter-extrabold': ['Inter-ExtraBold'],
        'inter-black': ['Inter-Black'],
      },
    },
  },
  plugins: [],
};
