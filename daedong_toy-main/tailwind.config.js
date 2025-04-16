/** @type {import('tailwindcss').Config} */
export const content = [
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    animation: {
      'fadeIn': 'fadeIn 1s ease-in-out forwards',
      'fadeInUp': 'fadeInUp 0.8s ease-out forwards',
      'fadeInDown': 'fadeInDown 0.8s ease-out forwards',
      'fadeInRight': 'fadeInRight 0.8s ease-out forwards',
      'wiggle': 'wiggle 2s ease-in-out infinite',
      'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      'spin-slow': 'spin 5s linear infinite',
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      fadeInUp: {
        '0%': { opacity: '0', transform: 'translateY(20px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
      fadeInDown: {
        '0%': { opacity: '0', transform: 'translateY(-20px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
      fadeInRight: {
        '0%': { opacity: '0', transform: 'translateX(-20px)' },
        '100%': { opacity: '1', transform: 'translateX(0)' },
      },
      wiggle: {
        '0%, 100%': { transform: 'rotate(-3deg)' },
        '50%': { transform: 'rotate(3deg)' },
      },
    },
    transitionProperty: {
      'height': 'height',
      'spacing': 'margin, padding',
    },
  },
};
export const plugins = [
  function ({ addUtilities }) {
    const newUtilities = {};

    // Animation delay classes (in 100ms increments)
    for (let i = 1; i <= 10; i++) {
      newUtilities[`.delay-${i * 100}`] = {
        'animation-delay': `${i * 0.1}s`,
      };
    }

    // Animation delay classes (in seconds)
    for (let i = 1; i <= 5; i++) {
      newUtilities[`.delay-${i}s`] = {
        'animation-delay': `${i}s`,
      };
    }

    addUtilities(newUtilities);
  },
];