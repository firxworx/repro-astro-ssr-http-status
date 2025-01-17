export type LocaleTextDirection = 'ltr' | 'rtl'

/**
 * Array of RTL (right-to-left) BCP-47 (ISO) standard 2-character language codes.
 *
 * As this is a const assertion for typing you may need to cast `as string[]` if using this
 * constant as an array of strings (e.g. `RTL_LANGUAGES.includes(language as string)`).
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

  // this is a safe cast as we are not mutating the array
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
