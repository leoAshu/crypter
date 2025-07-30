/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // ====================== Default ====================
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
        'card-dark': '#21212E',
        // 'card-dark': '#1A1A2E',
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

        // ===================================================

        // ====================== Revamp =====================
        base: {
          white: '#FFFFFF',
          black: '#000000',
        },
        neutral: {
          DEFAULT: '#667085',
          50: '#F9FAFB',
          100: '#F2F4F7',
          200: '#EAECF0',
          300: '#D0D5DD',
          400: '#98A2B3',
          500: '#667085',
          600: '#475467',
          700: '#344054',
          800: '#1D2939',
          900: '#101828',
        },
        primary: {
          DEFAULT: '#54E6B6',
          25: '#FCAFFF',
          50: '#EEFDF8',
          100: '#CAF7E8',
          200: '#B0F4DD',
          300: '#8CEECE',
          400: '#76EBC5',
          500: '#54E6B6',
          600: '#4CD1A6',
          700: '#3CA381',
          800: '#2E7F64',
          900: '#23614C',
        },
        error: {
          DEFAULT: '#F04438',
          25: '#FFF8FA',
          50: '#FEF3F2',
          100: '#FEE4E2',
          200: '#FECDCA',
          300: '#FDA29B',
          400: '#F97066',
          500: '#F04438',
          600: '#D92D20',
          700: '#B42318',
          800: '#912018',
          900: '#7A271A',
        },
        warning: {
          DEFAULT: '#F79009',
          25: '#FFFCF5',
          50: '#FFFAEB',
          100: '#FEF0C7',
          200: '#FEDF89',
          300: '#FEC84B',
          400: '#FDB022',
          500: '#F79009',
          600: '#DC6803',
          700: '#B54708',
          800: '#93370D',
          900: '#7A2E0E',
        },
        success: {
          DEFAULT: '#12B76A',
          25: '#F6FEF9',
          50: '#ECFDF3',
          100: '#D1FADF',
          200: '#A6F4C5',
          300: '#6CE9A6',
          400: '#32D583',
          500: '#12B76A',
          600: '#039855',
          700: '#027A48',
          800: '#05603A',
          900: '#054F31',
        },
        // ===================================================
      },

      fontFamily: {
        // ====================== Default ====================
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

        // ===================================================

        // ====================== Revamp =====================
        // Clash Display
        'clash-display': ['Clash-Display-Regular'],
        'clash-display-medium': ['Clash-Display-Medium'],
        'clash-display-semibold': ['Clash-Display-Semibold'],
        'clash-display-bold': ['Clash-Display-Bold'],

        // Satoshi
        satoshi: ['Satoshi-Regular'],
        'satoshi-medium': ['Satoshi-Medium'],
        // 'satoshi-semibold': ['Satoshi-Semibold'],
        'satoshi-bold': ['Satoshi-Bold'],

        // ===================================================
      },
    },
  },
  plugins: [],
};
