import { defineMiddleware } from 'astro:middleware'
import { applySlashRule } from '@/lib/slashes'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/config'

// ISSUE -- ATTEMPTING TO REPRODUCE
//
// always 404 http response status even if a route is matched and a page rendered by the rewrite
//
// if there is a page match under src/pages/[locale]/*.astro the response status will be 200
// yet when we return this response the browser receives a 404 status (!)

// NOTE --
//
// If middleware rewrites a route (for pathname /about/ which does not have a corresponding page)
// to successfully match /[locale]/about route (which does have a page) then Astro.url.pathname will
// still include the default locale in the path prefix even if prefixDefaultLocale is false in the config.

/**
 * Issue Reproduction
 */
export const reproMiddleware = defineMiddleware(async (ctx, next) => {
  console.log('in repro middleware')

  if (ctx.routePattern === '/404' && shouldCheckDynamicRoutePattern(ctx.url.pathname)) {
    console.log('attempting rewrite to check for match under src/pages/[locale]')
    const response = await ctx.rewrite(applySlashRule(`/${DEFAULT_LOCALE}${ctx.url.pathname}`))

    console.log('repro middleware rewrite result response status: ', response.status)
    return response
  }

  return await next()
})

function shouldCheckDynamicRoutePattern(pathname: string) {
  return !SUPPORTED_LOCALES.some((locale) => pathname.startsWith(`/${locale}`))
}
