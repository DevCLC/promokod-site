/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Apple-inspired palette
        bg:        '#F5F5F7',
        surface:   '#FFFFFF',
        'apple-black': '#1D1D1F',
        secondary: '#6E6E73',
        border:    '#D2D2D7',
        // Brand
        brand:     '#1F3D36',
        'brand-light': '#2A5247',
        accent:    '#C9C2A3',
        // Kaspi
        kaspi:     '#EF4C23',
        'kaspi-hover': '#D43D18',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Helvetica Neue', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      fontSize: {
        'hero':    ['clamp(2.75rem,8vw,6rem)', { lineHeight: '1.04', letterSpacing: '-0.03em', fontWeight: '700' }],
        'hero-sm': ['clamp(2rem,5vw,3.5rem)',  { lineHeight: '1.08', letterSpacing: '-0.025em', fontWeight: '700' }],
        'tagline': ['clamp(1.1rem,2.5vw,1.5rem)', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
      },
      spacing: {
        'section': '6rem',
        '18': '4.5rem',
      },
      borderRadius: {
        'apple': '18px',
        'apple-sm': '12px',
      },
      boxShadow: {
        'card': '0 2px 20px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.05)',
        'nav': '0 1px 0 rgba(0,0,0,0.08)',
      },
      backdropBlur: {
        'apple': '20px',
      },
    },
  },
  plugins: [],
}
