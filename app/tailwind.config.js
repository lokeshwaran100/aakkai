/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand colors from logo
        primary: {
          50: '#ebfff7',
          100: '#d1ffed',
          200: '#a3ffde',
          300: '#63ffcc',
          400: '#22ffb6',
          500: '#2ab57d', // Logo green
          600: '#0e9c64',
          700: '#0c7c51',
          800: '#0d6242',
          900: '#0d5137',
          950: '#042d1f',
        },
        accent: {
          50: '#fff9eb',
          100: '#ffefc6',
          200: '#ffdd88',
          300: '#ffc341',
          400: '#ffa70d',
          500: '#f6b119', // Logo yellow
          600: '#cc7a02',
          700: '#a65a05',
          800: '#89460b',
          900: '#723a0f',
          950: '#451d04',
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
        glow: {
          '0%': {
            'box-shadow': '0 0 20px rgba(42, 181, 125, 0.5)',
          },
          '100%': {
            'box-shadow': '0 0 40px rgba(42, 181, 125, 0.8)',
          },
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(42, 181, 125, 0.5)',
        'glow-lg': '0 0 40px rgba(42, 181, 125, 0.6)',
        'glow-accent': '0 0 20px rgba(246, 177, 25, 0.5)',
        'glow-accent-lg': '0 0 40px rgba(246, 177, 25, 0.6)',
      },
    },
  },
  plugins: [],
};