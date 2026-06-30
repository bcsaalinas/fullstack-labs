import { cn } from "../../lib/utils";

// Card: a container for grouped content, split into composable parts.
// Card > CardHeader > CardTitle / CardDescription > CardContent.
// Each part is a thin styled wrapper that reads from the design tokens in index.css.
export function Card({ className, ...props }) {
  return (
    <div
      className={cn("rounded-xl border border-border bg-card text-card-foreground shadow", className)}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }) {
  return <div className={cn("p-6", className)} {...props} />;
}

export function CardTitle({ className, ...props }) {
  return <h3 className={cn("text-xl font-semibold tracking-tight", className)} {...props} />;
}

export function CardDescription({ className, ...props }) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

export function CardContent({ className, ...props }) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}
