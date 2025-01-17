import { DEFAULT_LOCALE, IS_PRODUCTION, PREFIX_DEFAULT_LOCALE, SITE_URL, SUPPORTED_LOCALES } from '@/config'
import { applySlashRule, ensureLeadingSlash } from '@/lib/slashes'

export type LocaleTextDirection = 'ltr' | 'rtl'

export function isDefaultLocale(input: unknown): input is string {
  return typeof input === 'string' && input === DEFAULT_LOCALE
}

export function isSupportedLocale(input: unknown): input is string {
  return typeof input === 'string' && SUPPORTED_LOCALES.includes(input)
}

/**
 * Array of RTL (right-to-left) BCP-47 (ISO) standard 2-character language codes.
 */
export const RTL_LANGUAGES = ['ar', 'fa', 'he', 'ur', 'yi', 'ps', 'sd', 'dv'] as const

/**
 * Return the text direction of the given locale in ISO / BCP-47 format.
 * The lowercase return value is valid for the `dir` attribute of an `<html>` element.
 *
 * Returns `ltr` as fallback if the locale/language is not recognized or is invalid.
 */
export function getLocaleTextDirection(locale: string): LocaleTextDirection {
  const language = getLocaleLanguageCode(locale)

  // safe cast as array is not mutated
  return (RTL_LANGUAGES as unknown as string[]).includes(language ?? '') ? 'rtl' : 'ltr'
}

/**
 * Extract and return the two-character language portion of a locale string in ISO / BCP-47 format.
 * e.g. `en-US` -> `en`, `zh-Hant-TW` -> `zh`, `fr` -> `fr`.
 *
 * The output is lowercased and an error is thrown if a two-character alphabetical string could not be parsed.
 * Input with a non-ISO separator (non-dash) is rejected. No other validation is performed.
 *
 * Returns `undefined` if the input is not a string or does not match the expected format.
 */
export function getLocaleLanguageCode(locale: string): string | undefined {
  const result = String(locale).toLowerCase().split('-')[0]

  if (typeof result !== 'string' || !/^[a-z]{2}$/.exec(result)) {
    return undefined
  }

  return result
}

/**
 * Generate values for alternate langauge meta tags `hrefLang` and `href` attributes for a given pathname.
 *
 * ASTRO I18N WARNING:
 *
 * If middleware is rewriting /404 under `src/pages/*` to attempt route matches under `src/pages/[locale]/*`
 * the `Astro.url.pathname` value will include the path prefix of the default locale _even if_
 * `PREFIX_DEFAULT_LOCALE` is `false` _and_ the URL of the page in the browser has no locale prefix.
 *
 * @future consider base url from Astro config if site is not at root path.
 */
export function getLocaleHrefLangs(pathname: string): { locale: string; href: string }[] {
  return SUPPORTED_LOCALES.map((locale) => {
    const virginPathname = stripLocalePrefixFromPathname(pathname)

    const localizedPathname = applySlashRule(
      isDefaultLocale(locale) && !PREFIX_DEFAULT_LOCALE ? virginPathname : `/${locale}${virginPathname}`,
    )

    const url = new URL(localizedPathname, SITE_URL)
    return { locale, href: url.toString() }
  })
}

/**
 * Strip the locale pathname prefix (first segment) from the given pathname only if it is
 * recognized as a supported locale; returns the remaining "virgin" pathname.
 *
 * Returns '/' for inputs '/' and ''. This function is agnostic to `prefixDefaultLocale`.
 *
 * Does not implement support for `code` alternatives or language ('fr')
 * vs. locale ('fr-CA', 'fr-FR', etc.).
 */
export function stripLocalePrefixFromPathname(pathname: string): string {
  if (pathname === '' || pathname === '/') {
    return '/'
  }

  const prefixedLocale = SUPPORTED_LOCALES.find((locale) => pathname.startsWith(`/${locale}`))
  return ensureLeadingSlash(prefixedLocale ? `/${pathname.replace(`/${prefixedLocale}`, '')}` : pathname)
}

/**
 * Return the locale from first segment of a pathname only if it is recognized as a supported locale
 * using a strict case-sensitive match, otherwise return the default locale.
 *
 * Returns the default locale if the pathname is root '/' or empty string ''.
 *
 * This case-sensitive strict match is more rigorous than Astro's internal `i18n` logic.
 */
export function getLocaleFromPathname(pathname: string): string {
  if (pathname === '' || pathname === '/') {
    return DEFAULT_LOCALE
  }

  const firstSegment = pathname.split('/')?.[1] ?? ''
  return !!firstSegment && isSupportedLocale(firstSegment) ? firstSegment : DEFAULT_LOCALE
}

/**
 * Return the locale obtained from the first pathname segment (locale prefix) if it is recognized
 * as a supported locale. Otherwise returns `undefined`.
 */
export function findLocalePathPrefix(pathname: string): string | undefined {
  const firstSegment = pathname.split('/')?.[1] ?? ''
  return !!firstSegment && isSupportedLocale(firstSegment) ? `/${firstSegment}` : undefined
}

/**
 * Return the input pathname including locale path prefix for the given locale.
 * Respects the `prefixDefaultLocale` configuration and applies `trailingSlash` rule.
 *
 * @throws {Error} in development if target locale is not supported.
 */
export function getLocalizedPathname(targetLocale: string | undefined, pathname: string): string {
  const locale = targetLocale ?? DEFAULT_LOCALE

  if (!IS_PRODUCTION && !isSupportedLocale(locale)) {
    throw new Error(`Unsupported locale: ${locale}`)
  }

  const virginPathname = stripLocalePrefixFromPathname(pathname)
  const result = applySlashRule(
    isDefaultLocale(locale) && !PREFIX_DEFAULT_LOCALE ? virginPathname : `/${locale}${virginPathname}`,
  )

  console.log(
    `getLocalizedPathname: target locale ${targetLocale} resolved to ${locale} for pathname ${pathname} result: ${result}`,
  )

  return result
}
