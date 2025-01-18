import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import FileSystemBackend from 'i18next-fs-backend'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, I18NEXT_NAMESPACES, I18NEXT_DEFAULT_NAMESPACE } from '@/config'

/**
 * Initialize server-side instance of i18next using the filesystem backend and with the react-i18next plugin.
 *
 * Assumes that Astro's `config.publicDir` is the default path './public'.
 *
 * Per the react-i18next docs the `interpolation.escapeValue` config is not required because
 * React escapes by default. Take care if using interpolation with any Astro components.
 *
 * @see https://www.i18next.com/overview/api
 */
export const initI18nextServer = async (): Promise<typeof i18next> => {
  if (!i18next.isInitialized) {
    await i18next
      .use(FileSystemBackend)
      .use(initReactI18next)
      .init({
        debug: false,
        preload: SUPPORTED_LOCALES,
        fallbackLng: DEFAULT_LOCALE,
        supportedLngs: SUPPORTED_LOCALES,
        defaultNS: I18NEXT_DEFAULT_NAMESPACE,
        ns: I18NEXT_NAMESPACES,
        interpolation: {
          // set for parity vs. client as react auto-escapes however may not be ideal for astro components
          escapeValue: false,
        },
        backend: {
          loadPath: './public/locales/{{lng}}/{{ns}}.json',
        },
        initAsync: false,
      })
  }

  return i18next
}
