import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function delay(t: number): Promise<any> {
  return new Promise(resolve => setTimeout(resolve, t));
}

export function error1in5(): boolean {
  const r = Math.floor(Math.random() * 4)
  return Boolean(r != 0)
}

export async function retry(f: () => Promise<any>, maxRetries: number, retryCount = 0) {
  try {
    const result = await f();
    return result;
  } catch (e) {
    console.log("retry", retryCount);
    if (retryCount > maxRetries) {
      throw e
    }
    return retry(f, maxRetries, retryCount++)
  }
}
