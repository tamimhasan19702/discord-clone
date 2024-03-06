/**
 * Generates CSS class names dynamically by merging multiple inputs.
 * This utility function accepts various types of inputs, such as strings, arrays, or objects,
 * representing CSS class names or conditions for applying them.
 * It internally uses `clsx` to merge class names and `tailwind-merge` for further processing,
 * likely incorporating Tailwind CSS conventions.
 *
 * @format
 * @param inputs An array of inputs representing CSS class names or conditions.
 * @returns A string containing the merged CSS class names.
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
