/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4f46e5',
          dark: '#3730a3',
          light: '#818cf8',
        },
        accent: {
          DEFAULT: '#f5c518',
          dark: '#d4a017',
        },
        dark: {
          DEFAULT: '#0f0f1a',
          2: '#1a1a2e',
          3: '#16213e',
        }
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      borderRadius: {
        xl: '12px',
        '2xl': '20px',
      },
      boxShadow: {
        soft: '0 4px 24px rgba(0,0,0,0.08)',
        strong: '0 12px 48px rgba(0,0,0,0.12)',
        primary: '0 8px 24px rgba(79,70,229,0.35)',
        accent: '0 8px 24px rgba(245,197,24,0.35)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease both',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s infinite',
      },
    },
  },
  plugins: [],
}
