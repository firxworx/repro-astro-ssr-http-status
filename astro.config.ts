import { defineConfig } from 'astro/config'
import node from '@astrojs/node'

const SITE_URL = 'http://localhost:4321'

/**
 * @see https://astro.build/config
 */
export default defineConfig({
  site: SITE_URL,
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  build: {
    format: 'directory',
  },
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    routing: {
      fallbackType: 'rewrite',
      prefixDefaultLocale: false,
      strategy: 'pathname',
    },
    // routing: 'manual',
  },
})
