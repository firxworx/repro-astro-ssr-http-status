import { z } from 'astro/zod'

export interface PageLayoutMeta extends z.infer<typeof zPageLayoutMeta> {}
export interface ContentDateMeta extends z.infer<typeof zContentDateMeta> {}

/**
 * Meta object schema for published and modified dates relevant to time-based content.
 */
export const zContentDateMeta = z.object({
  publishedAt: z.coerce.date(),
  modifiedAt: z.coerce
    .date()
    .nullish()
    .transform((x) => x ?? undefined),
})

/**
 * Meta for each page to construct document title and meta tags.
 */
export const zPageLayoutMeta = z
  .object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    keywords: z.string(),
    canonicalUrl: z.string().url(),
    image: z.string().optional(),
  })
  .merge(zContentDateMeta.partial())
