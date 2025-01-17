import type { AstroUserConfig } from 'astro'
import { defineConfig } from 'astro/config'
import node from '@astrojs/node'

const SITE_URL = 'http://localhost:4321'

const TRAILING_SLASH: AstroUserConfig['trailingSlash'] = 'always'

const DEFAULT_LOCALE = 'en' as const
const SUPPORTED_LOCALES = [DEFAULT_LOCALE, 'fr'] as const
const PREFIX_DEFAULT_LOCALE: boolean = false

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
    defaultLocale: DEFAULT_LOCALE,
    locales: [...SUPPORTED_LOCALES],

    // set `routing: 'manual'` to manually sequence the astro's i18n middleware or use a custom alernative
    routing: {
      strategy: 'pathname',
      fallbackType: 'rewrite',
      prefixDefaultLocale: PREFIX_DEFAULT_LOCALE,
    },
  },
  vite: {
    // define vite global constants to replace with hardcoded values during build
    define: {
      __TRAILING_SLASH__: JSON.stringify(TRAILING_SLASH),

      __DEFAULT_LOCALE__: JSON.stringify(DEFAULT_LOCALE),
      __SUPPORTED_LOCALES__: JSON.stringify(SUPPORTED_LOCALES),
      __PREFIX_DEFAULT_LOCALE__: JSON.stringify(PREFIX_DEFAULT_LOCALE),
    },
  },
})
