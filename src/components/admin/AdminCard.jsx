import { cn } from "@/lib/utils";

/* ADMIN CARD - Style khusus untuk admin */
export function AdminCard({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-xl border-2 border-purple-200 bg-gradient-to-br from-white to-purple-50 shadow-xl",
        className
      )}
      {...props}
    />
  );
}

/* ADMIN CARD HEADER */
export function AdminCardHeader({ className, ...props }) {
  return (
    <div
      className={cn(
        "border-b border-purple-100 px-6 py-4",
        className
      )}
      {...props}
    />
  );
}

/* ADMIN CARD TITLE */
export function AdminCardTitle({ className, ...props }) {
  return (
    <h3
      className={cn(
        "text-xl font-bold text-purple-800",
        className
      )}
      {...props}
    />
  );
}

/* ADMIN CARD CONTENT */
export function AdminCardContent({ className, ...props }) {
  return (
    <div
      className={cn("px-6 py-4", className)}
      {...props}
    />
  );
}

/* ADMIN CARD FOOTER (opsional) */
export function AdminCardFooter({ className, ...props }) {
  return (
    <div
      className={cn(
        "border-t border-purple-100 px-6 py-4",
        className
      )}
      {...props}
    />
  );
}