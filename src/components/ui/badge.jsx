import { cn } from "@/lib/utils";

export function Badge({ className, variant = "default", ...props }) {
  const variants = {
    default: "bg-primary/10 text-primary",
    danger: "bg-red-100 text-red-600",
    info: "bg-blue-100 text-blue-600",
  };

  return (
    <span
      className={cn(
        "inline-block rounded-full px-3 py-1 text-xs font-semibold",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
