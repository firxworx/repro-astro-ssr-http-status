import type { AstroUserConfig } from 'astro'
import { defineConfig } from 'astro/config'
import node from '@astrojs/node'

const SITE_URL = 'http://localhost:4321'
const TRAILING_SLASH: AstroUserConfig['trailingSlash'] = 'always'

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
  trailingSlash: TRAILING_SLASH,
  security: {
    checkOrigin: true,
  },
  prefetch: {
    defaultStrategy: 'viewport',
  },
  i18n: {
    // all values must be identical to `src/config.ts` used by the application
    defaultLocale: 'en',
    locales: ['en', 'fr'],

    // set `routing: 'manual'` to manually sequence the astro's i18n middleware or use a custom alernative
    routing: {
      fallbackType: 'rewrite',
      prefixDefaultLocale: false,
      strategy: 'pathname',
    },
  },
  vite: {
    define: {
      __TRAILING_SLASH__: JSON.stringify(TRAILING_SLASH),
    },
  },
})
