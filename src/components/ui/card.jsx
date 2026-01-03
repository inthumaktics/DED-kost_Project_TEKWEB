import { cn } from "@/lib/utils";

/* CARD */
export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-xl bg-white shadow-md hover:shadow-lg transition",
        className
      )}
      {...props}
    />
  );
}

/* CARD HEADER */
export function CardHeader({ className, ...props }) {
  return (
    <div
      className={cn(
        "border-b px-6 py-4 font-semibold",
        className
      )}
      {...props}
    />
  );
}

/* CARD CONTENT */
export function CardContent({ className, ...props }) {
  return (
    <div
      className={cn("px-6 py-4", className)}
      {...props}
    />
  );
}

/* CARD FOOTER (opsional, tapi kepake nanti) */
export function CardFooter({ className, ...props }) {
  return (
    <div
      className={cn(
        "border-t px-6 py-4 flex items-center justify-end",
        className
      )}
      {...props}
    />
  );
}
