// import { navigate } from 'astro:transitions/client'

import type React from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Be sure to use `ready` from `useTranslation()` to ensure translation namespace files are loaded.
 */
export function DemoI18n(): React.JSX.Element {
  const { t } = useTranslation()

  return <p>{t('helloWorld', { ns: 'common' })}</p>
}
