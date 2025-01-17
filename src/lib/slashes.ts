import { withoutTrailingSlash, withTrailingSlash } from 'ufo'
import { REQUIRE_TRAILING_SLASH } from '@/config'

/**
 * Returns the input string normalized to have exactly one leading slash.
 */
export function ensureLeadingSlash(input: string): string {
  return `/${input.replace(/^\/+/g, '')}`
}

/**
 * Returns the input string normalized to have exactly one trailing slash.
 */
export function ensureTrailingSlash(input: string): string {
  return `${input.replace(/\/+$/g, '')}/`
}

/**
 * Returns the input string normalized to have exactly one leading and exactly one trailing slash.
 *
 * Handles edge cases of empty string, '/', and '//' by returning '/' for consistency when processing
 * pathnames and URLs.
 */
export function ensureSlashes(input: string): string {
  return input === '' || input === '/' || input === '//' ? '/' : `/${input.replace(/(^\/+|\/+$)/g, '')}/`
}

/**
 * Apply the _trailing slash rule_ a.k.a. _tsr_ that enforces the `trailingSlash` config option.
 *
 * Assumes the `TRAILING_SLASH` option in `@/config` accurately reflects the `trailingSlash` config option
 * defined in `astro.config.ts`.
 */
export function applySlashRule(input: string): string
export function applySlashRule(input: URL): URL
export function applySlashRule(input: URL | string): URL | string {
  if (input instanceof URL) {
    const newUrl = new URL(input)
    newUrl.pathname = REQUIRE_TRAILING_SLASH
      ? withTrailingSlash(newUrl.pathname, true)
      : withoutTrailingSlash(newUrl.pathname, true)
    return newUrl
  }

  // slash rule is moot for strictly hash "jump links"
  if (input.startsWith('#')) {
    return input
  }

  return REQUIRE_TRAILING_SLASH ? withTrailingSlash(input) : withoutTrailingSlash(input)
}
