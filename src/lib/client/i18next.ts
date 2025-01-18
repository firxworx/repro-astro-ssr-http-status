import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpBackend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, I18NEXT_NAMESPACES, I18NEXT_DEFAULT_NAMESPACE } from '@/config'

/**
 * Initialize client-side instance of i18next using the http backend and `react-i18next` plugin.
 *
 * Per the react-i18next docs the `interpolation.escapeValue` config is not required because
 * React escapes by default. Take care if using interpolation with any Astro components.
 *
 * Language detection is configured to be based on the `htmlTag` only.
 * The `lang` and `dir` attributes of the `html` element must be set in the Astro base layout.
 *
 * Refer to docs for additional optional detection features including 'cookie' and 'localStorage'.
 */
export function initI18nextClient() {
  if (!i18n.isInitialized) {
    i18n
      .use(HttpBackend)
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        debug: false,
        fallbackLng: DEFAULT_LOCALE,
        supportedLngs: SUPPORTED_LOCALES,
        ns: I18NEXT_NAMESPACES,
        defaultNS: I18NEXT_DEFAULT_NAMESPACE,
        interpolation: {
          //
          escapeValue: false,
        },
        backend: {
          loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
        detection: {
          order: ['htmlTag'],
          caches: [],
        },
      })
  }
}
