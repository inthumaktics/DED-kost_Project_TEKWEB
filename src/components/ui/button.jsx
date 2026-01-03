import * as React from "react";
import { cn } from "@/lib/utils";

const Button = React.forwardRef(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-primary text-white hover:bg-primary/90",
      outline:
        "border border-primary text-primary hover:bg-primary hover:text-white",
      ghost: "hover:bg-gray-100",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
