import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names and merges Tailwind classes safely.
 * @param inputs - List of class names or conditional classes.
 * @returns A single string of merged class names.
 */
export function cn(...inputs: (string | undefined | null | boolean)[]) {
  return twMerge(inputs.filter(Boolean).join(" "));
}
