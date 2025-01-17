import { fileURLToPath } from 'node:url'
import { basename } from 'node:path'

import type { APIContext } from 'astro'
import { defineMiddleware } from 'astro:middleware'

import { applySlashRule } from '@/lib/slashes'
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/config'
import { findLocalePathPrefix, isSupportedLocale } from '@/lib/i18n'

const moduleName = basename(fileURLToPath(import.meta.url))
const log = (message: string, ...data: Parameters<typeof console.log>) =>
  console.info(`${moduleName} :: ${message}`, ...data)

/**
 * Middleware for internationalized routes with `pages/[locale]/**` page structure.
 *
 * https://docs.astro.build/en/guides/routing/#server-ssr-mode
 * https://docs.astro.build/en/guides/routing/#route-priority-order
 */
export const i18nMiddleware = defineMiddleware(async (ctx, next) => {
  log(`path: ${ctx.url.pathname} routePattern: ${ctx.routePattern}`)

  if (isIndexRequest(ctx)) {
    log('isIndexRequest detected')
    return ctx.url.pathname === '/' ? next(applySlashRule(`/${DEFAULT_LOCALE}/`)) : next()
  }

  if (isNoLocalePrefixRequest(ctx)) {
    log('isNoLocalePrefixRequest detected')
    return next(applySlashRule(`/${DEFAULT_LOCALE}${ctx.url.pathname}`))
  }

  if (isRouteNotFound(ctx)) {
    const rewritePath = `/${DEFAULT_LOCALE}${ctx.url.pathname}`
    log(`isRouteNotFound detected; attempt rewritePath ${rewritePath}`)

    return next(applySlashRule(rewritePath))
  }

  return await next()
})

/**
 * Return `true` if the matched path is `/` or `/[locale]`.
 */
function isIndexRequest(ctx: APIContext): boolean {
  const isRootIndex = isRouteNotFound(ctx) && ctx.url.pathname === '/'
  const isLocalizedIndex = SUPPORTED_LOCALES.some((locale) => ctx.url.pathname === applySlashRule(`/${locale}/`))

  return isRootIndex || isLocalizedIndex
}

/**
 * Return `true` if `/[locale]` route pattern matches but the `locale` is not a supported locale.
 *
 * Handles matches of pages like `/[locale]/settings.astro` matching `/[locale]` when
 * `prefixDefaultLocale` is `false` and the `/[locale]/index.astro` route otherwise takes priority.
 */
function isNoLocalePrefixRequest(ctx: APIContext) {
  // path: /settings/ routePattern: /[locale]
  return ctx.routePattern === '/[locale]' && !isSupportedLocale(findLocalePathPrefix(ctx.url.pathname))
}

/**
 * Return `true` if the matched route pattern is `/404`.
 */
function isRouteNotFound(ctx: APIContext) {
  return ctx.routePattern === '/404'
}
