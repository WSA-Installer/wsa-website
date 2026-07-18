"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  download?: boolean | string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", href, download, children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300 active:scale-[0.97] cursor-pointer select-none";
    const variants = {
      primary:
        "bg-primary text-bg hover:bg-primary-hover glow hover:shadow-glow",
      secondary:
        "glass text-text-primary hover:glass-hover hover:border-border-hover",
      ghost: "text-text-secondary hover:text-text-primary hover:bg-white/5",
      outline:
        "border border-border text-text-primary hover:border-border-hover hover:bg-white/5",
    };
    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
    };

    const classes = cn(base, variants[variant], sizes[size], className);

    if (href) {
      return (
        <a
          href={href}
          className={classes}
          download={download}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button;
