import { defineConfig } from 'astro/config'
import icon from 'astro-icon'
import starlight from '@astrojs/starlight'
import react from '@astrojs/react'

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    icon(),
    starlight({
      title: 'Adam Koszary docs',
      disable404Route: true
    }),
    react(),
    (await import('astro-compress')).default({
      CSS: false,
      HTML: {
        'html-minifier-terser': {
          removeAttributeQuotes: false
        }
      },
      CSS: true,
      Image: false,
      JavaScript: true,
      SVG: true
    })
  ],
  server: {
    proxy: {
      '/wp-admin': {
        target: 'https://adamkoszary.co.uk',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/wp-admin/, '/wp-admin')
      },
      '/wp-content': {
        target: 'https://adamkoszary.co.uk',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/wp-content/, '/wp-content')
      },
      '/wp-includes': {
        target: 'https://adamkoszary.co.uk',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/wp-includes/, '/wp-includes')
      },
      '/wp-json': {
        target: 'https://adamkoszary.co.uk',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/wp-json/, '/wp-json')
      },
      '/wp-login.php': {
        target: 'https://adamkoszary.co.uk',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/wp-login\.php/, '/wp-login.php')
      }
    }
  }
})