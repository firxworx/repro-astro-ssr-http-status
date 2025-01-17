// import { navigate } from 'astro:transitions/client'

import type React from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Be sure to use `ready` from `useTranslation()` to ensure translation namespace files are loaded.
 *
 * This will prevent a client/server hydration mismatch error.
 */
export function DemoI18n(): React.JSX.Element {
  const { t, ready } = useTranslation(['common'], { useSuspense: false })

  return <div>{ready ? <p>{t('helloWorld', { ns: 'common' })}</p> : 'Loading…'}</div>
}
