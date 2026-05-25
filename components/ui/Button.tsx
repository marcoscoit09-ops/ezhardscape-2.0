import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline" | "gray";
  size?: "sm" | "md" | "lg";
}

/**
 * Reusable Button component
 * Variants: primary (black bg), ghost (transparent), outline (bordered), gray (subtle bg)
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-schibsted font-medium transition-all duration-200 cursor-pointer select-none";

    const variants = {
      primary:
        "bg-[#0e1311] text-white hover:bg-black/90 active:scale-[0.98]",
      ghost:
        "bg-transparent text-black hover:bg-black/5 active:scale-[0.98]",
      outline:
        "bg-transparent border border-black/20 text-black hover:border-black/50 active:scale-[0.98]",
      gray:
        "bg-black/[0.06] text-black hover:bg-black/10 active:scale-[0.98]",
    };

    const sizes = {
      sm: "text-[13px] px-3 py-1.5 rounded-[8px]",
      md: "text-[15px] px-4 py-2 rounded-[10px]",
      lg: "text-[16px] px-6 py-3 rounded-full",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
