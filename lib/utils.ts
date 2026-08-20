import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCompactNumber(n: number): string {
  if (n >= 10000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}
