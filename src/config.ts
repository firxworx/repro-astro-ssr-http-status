import type { AstroUserConfig } from 'astro'

export const DEFAULT_LOCALE = 'en'
export const SUPPORTED_LOCALES = ['en', 'fr']

/**
 * Must match `trailingSlash` config option in `astro.config.ts`.
 */
export const TRAILING_SLASH: AstroUserConfig['trailingSlash'] = 'always'

/**
 * Must match `defaultLocale` config option in `astro.config.ts`.
 */
export const REQUIRE_TRAILING_SLASH: boolean = TRAILING_SLASH === 'always' || TRAILING_SLASH === 'ignore'
