/**
 * Merge class names conditionally.
 * Works like clsx/classnames - filters out falsy values and joins with spaces.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}