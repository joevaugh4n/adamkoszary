/** Proxy code

server: {
    proxy: {
      '/wp-admin': {
        target: 'https://adamkoszary.co.uk',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wp-admin/, '/wp-admin')
      },
      '/wp-content': {
        target: 'https://adamkoszary.co.uk',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wp-content/, '/wp-content')
      },
      '/wp-includes': {
        target: 'https://adamkoszary.co.uk',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wp-includes/, '/wp-includes')
      },
      '/wp-json': {
        target: 'https://adamkoszary.co.uk',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wp-json/, '/wp-json')
      },
      '/wp-login.php': {
        target: 'https://adamkoszary.co.uk',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wp-login\.php/, '/wp-login.php')
      }
    }
      
 */

import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import icon from 'astro-icon'
import starlight from '@astrojs/starlight'
import react from '@astrojs/react'

export default defineConfig({
  integrations: [
    tailwind(),
    icon(),
    react()
  ]
})
