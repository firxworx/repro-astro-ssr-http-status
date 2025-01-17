/**
 * Simple utility that concatenates multiple css classnames and omits any falsey values.
 */
export function cx(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
