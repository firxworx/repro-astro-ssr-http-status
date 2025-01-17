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
  security: {
    checkOrigin: true,
  },
  prefetch: {
    defaultStrategy: 'viewport',
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],

    // set `routing: 'manual'` to manually sequence the astro's i18n middleware or use a custom alernative
    routing: {
      fallbackType: 'rewrite',
      prefixDefaultLocale: false,
      strategy: 'pathname',
    },
  },
})
