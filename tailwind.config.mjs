/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 7s ease-in-out infinite',
        marquee2: 'marquee2 7s ease-in-out infinite'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' }
        }
      },
      fontFamily: {
        sans: 'Inter',
        mono: ['IBM Plex Mono', 'Monospace'],
        handwriting: 'Permanent Marker'
      },
      colors: {
        black: '#333333'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography', '@tailwindcss/aspect-ratio')
    // ...
  ]
}
