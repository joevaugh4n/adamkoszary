import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import icon from 'astro-icon'
import starlight from '@astrojs/starlight'

import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    icon(),
    starlight({
      title: 'Documentation'
    }),
    react()
  ],
  server: {
    proxy: {
      '/wp-admin': 'https://adamkoszary.co.uk',
      '/wp-content': 'https://adamkoszary.co.uk',
      '/wp-includes': 'https://adamkoszary.co.uk',
      '/wp-json': 'https://adamkoszary.co.uk',
      '/wp-login.php': 'https://adamkoszary.co.uk'
    }
  }
})
