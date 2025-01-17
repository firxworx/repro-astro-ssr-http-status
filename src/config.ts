import type { AstroUserConfig } from 'astro'

export const SITE_URL = import.meta.env.SITE

export const IS_PRODUCTION = import.meta.env.PROD
export const IS_DEVELOPMENT = import.meta.env.DEV

export const DEFAULT_LOCALE = 'en' as const
export const SUPPORTED_LOCALES = ['en', 'fr'] as const
export const PREFIX_DEFAULT_LOCALE: boolean = false

/**
 * Astro `trailingSlash` config option as exported by vite global set in `astro.config.ts`.
 */
export const TRAILING_SLASH: AstroUserConfig['trailingSlash'] = __TRAILING_SLASH__

console.log('CLIENT SIDE TRAILNG SLASH', TRAILING_SLASH)

/**
 * Must match `defaultLocale` config option in `astro.config.ts`.
 */
export const REQUIRE_TRAILING_SLASH: boolean =
  String(TRAILING_SLASH) === 'always' || String(TRAILING_SLASH) === 'ignore'
