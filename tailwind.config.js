/** @type {import('tailwindcss').Config} */
// Design system built with ui-ux-pro-max skill (nextlevelbuilder)
// Style: Bento Box Grid #39 + Minimal & Direct #23 + Apple-inspired
// Colors from TZ: primary #1F3D36, accent #C9C2A3, bg #F8F7F3, text #111111
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand (from TZ)
        primary:   '#1F3D36',
        'primary-hover': '#2A5247',
        accent:    '#C9C2A3',
        'accent-dark': '#A8A07F',

        // Page palette (from TZ + skill #39 Bento)
        bg:        '#F8F7F3',   // warm off-white (TZ)
        surface:   '#FFFFFF',   // card bg (skill: #FFFFFF)
        'surface-2': '#F5F5F7', // secondary surface (skill: #F5F5F7 apple)
        'surface-3': '#EFEDE8', // tertiary, muted blocks

        // Typography (from TZ)
        text:      '#111111',   // primary text
        'text-2':  '#6B6B6B',   // secondary text

        // UI
        border:    '#E5E3DC',
        kaspi:     '#EF4C23',
        'kaspi-h': '#D43D18',

        // Semantic
        success:   '#16A34A',
      },
      fontFamily: {
        // TZ: Playfair Display headings, Inter body, Manrope UI
        serif:  ['Playfair Display', 'Georgia', 'serif'],
        sans:   ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        ui:     ['Manrope', 'Inter', 'sans-serif'],
      },
      fontSize: {
        // Exaggerated Minimalism typography (skill #47)
        'display': ['clamp(2.5rem,6vw,5.5rem)', { lineHeight: '1.04', letterSpacing: '-0.03em' }],
        'display-sm': ['clamp(1.8rem,4vw,3rem)', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        'body-lg': ['1.0625rem', { lineHeight: '1.7' }],
      },
      borderRadius: {
        // Skill #39 Bento: 16-24px
        'bento': '24px',
        'bento-sm': '16px',
        'bento-xs': '12px',
      },
      boxShadow: {
        // Skill #39: 0 4px 6px rgba(0,0,0,0.05)
        'bento': '0 2px 16px rgba(0,0,0,0.05), 0 1px 4px rgba(0,0,0,0.04)',
        'bento-hover': '0 8px 32px rgba(0,0,0,0.09), 0 2px 8px rgba(0,0,0,0.05)',
        'hero': '0 24px 80px rgba(31,61,54,0.25)',
      },
      gridTemplateColumns: {
        // Bento grid (skill #39): 4 columns desktop
        'bento': 'repeat(4, 1fr)',
        'bento-3': 'repeat(3, 1fr)',
      },
      spacing: {
        'section': '6rem',
        'section-sm': '4rem',
      },
    },
  },
  plugins: [],
}
