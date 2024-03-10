import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { MINT_TOKENS } from "./constants";
import { formatUnits } from "viem";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTokenEngineFromName(name: string) {
  MINT_TOKENS.forEach((token) => {
    if (token.label === name) {
      return token.engine;
    }
  });
}

export const formatCurrency = (value: number, currency: string = 'en-US') => {
  const formatter = new Intl.NumberFormat(currency, {
    style: 'decimal',
    maximumFractionDigits: 2, // This will round the number to 2 decimal places
  });

  return formatter.format(value);
}

// Create a type or interface for the contractReadData 
// and then use it as the return type here

