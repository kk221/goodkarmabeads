/**
 * Combines multiple class names into a single string
 * @param {...string} inputs
 * @returns {string}
 */
export function cn(...inputs) {
  return inputs.filter(Boolean).join(" ")
} 