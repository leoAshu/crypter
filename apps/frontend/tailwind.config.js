/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // accent
        primary: '#0066FF',
        'primary-disabled': '#99C2FF',

        // background
        surface: '#FFFFFF',
        'surface-dark': '#101018',
        // surface: '#F0F2F5',
        // 'surface-dark': '#18191A',

        // text primary
        'on-surface': '#23262F',
        'on-surface-dark': '#FFFFFF',

        // text secondary
        muted: '#969AA0',
        'muted-dark': '#969AA0',

        // card background
        card: '#F4F6F9',
        'card-dark': '#2C2E3B',
        // card: '#FFFFFF',
        // 'card-dark': '#101018',

        success: '#00C47C',
        'success-muted': '#6EE7B7',
        'success-dark': '#029E63',
        'success-glow': '#14F195',

        error: '#FF4C61',
        'error-muted': '#FCA5A5',
        'error-dark': '#C53030',
        'error-glow': '#FF6685',
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
