import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg': '#0A0A0A',
        'surface': '#111111',
        'surface-2': '#1A1A1A',
        'surface-3': '#222222',
        'text-primary': '#E8E6E1',
        'text-secondary': '#9B9B9B',
        'text-muted': '#5A5A5A',
        'border-color': '#2A2A2A',
        'accent': '#C4A35A',
        'accent-hover': '#D4B36A',
        'accent-dim': '#8B7340',
        'error': '#B54A4A',
        'success': '#4A7A5B',
        'warn': '#A68B3C',
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
      },
      maxWidth: {
        'prose': '640px',
        'content': '1200px',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-up-delay': 'fadeUp 0.8s ease-out 0.2s forwards',
        'fade-up-delay-2': 'fadeUp 0.8s ease-out 0.4s forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'slide-in': 'slideIn 0.5s ease-out forwards',
        'count-up': 'countUp 2s ease-out forwards',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(24px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideIn: { '0%': { opacity: '0', transform: 'translateX(-16px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
      },
    },
  },
  plugins: [],
}

export default config
