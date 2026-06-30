import { cn } from "../../lib/utils";

// Skeleton: an empty box with a pulse animation, used as a loading placeholder.
// Size it to match the real content so layout doesn't jump when data arrives.
export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}
