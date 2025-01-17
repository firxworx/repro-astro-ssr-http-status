import { sequence } from 'astro:middleware'

// uncomment for experimenting with astro i18n middleware
// import { middleware as astroI18nMiddleware } from 'astro:i18n'

import { reproMiddleware } from './repro.middleware'
import { inspectMiddleware } from './inspect.middleware'

export const onRequest = sequence(
  reproMiddleware,
  inspectMiddleware,

  // the following requires an `i18n` configuration in `astro.config.ts` with `routing: 'manual'`
  // astroI18nMiddleware({
  //   prefixDefaultLocale: false,
  //   redirectToDefaultLocale: false,
  //   fallbackType: 'rewrite', // 'rewrite' | 'redirect'
  // }),
)
