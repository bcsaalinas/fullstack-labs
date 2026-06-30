import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// `cn` is the helper every shadcn component uses to merge classNames.
// clsx handles conditional classes, twMerge resolves Tailwind conflicts (p-2 vs p-4 -> p-4).
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
