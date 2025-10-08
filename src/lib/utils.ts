import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats text by converting \n characters to proper line breaks
 * @param text - The text to format
 * @returns Formatted text with line breaks
 */
export function formatTextWithLineBreaks(text: string): string {
  if (!text) return '';
  
  // Convert \n to actual line breaks
  return text.replace(/\\n/g, '\n');
}
