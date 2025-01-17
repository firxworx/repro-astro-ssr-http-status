import { defineMiddleware } from 'astro:middleware'

/**
 * Middleware to sequence after `repro.middleware.ts` that logs details to console.
 */
export const inspectMiddleware = defineMiddleware(async (ctx, next) => {
  console.log('in inspect middleware')

  console.log('inspectMiddleware ctx.url.pathname:', ctx.url.pathname)
  console.log('inspectMiddleware ctx.routePattern:', ctx.url.pathname)

  return await next()
})
