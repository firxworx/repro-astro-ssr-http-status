import { isRecord } from '@/types/object.guards'

/**
 * Attempt to extract a string error message from a candidate error-like object or string.
 */
export function getErrorMessage(maybeError: unknown, options?: { fallback: string }): string | undefined {
  if (!maybeError) {
    return undefined
  }

  if (maybeError instanceof Error) {
    return maybeError.message
  }

  if (isRecord(maybeError)) {
    if ('error' in maybeError && typeof maybeError.error === 'string') {
      return maybeError.error
    }

    if ('message' in maybeError) {
      return String(maybeError.message)
    }
  }

  if (typeof maybeError === 'string') {
    return maybeError
  }

  const opts = options ?? {
    fallback: `Unknown error: ${String(maybeError)}`,
  }

  return opts.fallback
}
