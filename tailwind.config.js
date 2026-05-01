/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Claude-inspired warm palette
        primary: {
          DEFAULT: '#D97757',   // terracotta/orange — the Claude accent
          dark: '#C4623E',
          light: '#F0C4B0',
        },
        surface: {
          DEFAULT: '#FAF9F7',   // warm off-white — the Claude bg
          raised: '#F5F3F0',    // slightly darker card surface
          border: '#E8E5DF',    // warm border
        },
        ink: {
          DEFAULT: '#1A1917',   // near-black charcoal for headings
          muted: '#6B6762',     // warm gray for body text
          faint: '#A39E98',     // very muted for metadata
        },
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'warm': '0 1px 3px rgba(26, 25, 23, 0.06), 0 1px 2px rgba(26, 25, 23, 0.04)',
        'warm-md': '0 4px 12px rgba(26, 25, 23, 0.08)',
      },
      borderRadius: {
        'claude': '10px',
      }
    },
  },
  plugins: [],
}
