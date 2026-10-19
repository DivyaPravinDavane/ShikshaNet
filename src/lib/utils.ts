import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrencyCr(val: number): string {
  return `₹${val.toLocaleString("en-IN", { maximumFractionDigits: 1 })} Cr`;
}

export function formatCurrencyLakh(val: number): string {
  return `₹${val.toLocaleString("en-IN", { maximumFractionDigits: 1 })} Lakh`;
}

export function formatNumber(val: number): string {
  return val.toLocaleString("en-IN");
}
