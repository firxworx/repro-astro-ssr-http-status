/**
 * Type guard that evaluates if the input is type `Record<string, unknown>`.
 *
 * This implementation confirms there are no property symbols in the object.
 * Returns `true` for empty objects.
 */
export function isRecord(input: unknown): input is Record<string, unknown> {
  return (
    !!input && typeof input === 'object' && !Array.isArray(input) && Object.getOwnPropertySymbols(input).length === 0
  )
}
