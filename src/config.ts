import type { AstroUserConfig } from 'astro'

export const SITE_URL = import.meta.env.SITE

export const IS_PRODUCTION = import.meta.env.PROD
export const IS_DEVELOPMENT = import.meta.env.DEV

export const DEFAULT_LOCALE = __DEFAULT_LOCALE__
export const SUPPORTED_LOCALES: readonly string[] = __SUPPORTED_LOCALES__
export const PREFIX_DEFAULT_LOCALE: boolean = __PREFIX_DEFAULT_LOCALE__

export const I18NEXT_DEFAULT_NAMESPACE = 'common'
export const I18NEXT_NAMESPACES = ['common', 'error']

/**
 * Astro `trailingSlash` config option as exported by vite global set in `astro.config.ts`.
 */
export const TRAILING_SLASH: AstroUserConfig['trailingSlash'] = __TRAILING_SLASH__

/**
 * Must match `defaultLocale` config option in `astro.config.ts`.
 */
export const REQUIRE_TRAILING_SLASH: boolean =
  String(TRAILING_SLASH) === 'always' || String(TRAILING_SLASH) === 'ignore'
