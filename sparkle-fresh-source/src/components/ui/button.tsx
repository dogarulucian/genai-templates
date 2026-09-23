import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold transition-[transform,background-color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-button hover:-translate-y-1 hover:bg-primary/90",
        primary: "bg-primary text-primary-foreground shadow-button hover:-translate-y-1 hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        glass: "border border-glass-border bg-glass text-foreground shadow-glass backdrop-blur-xl hover:-translate-y-1 hover:bg-glass-strong",
        mint: "bg-flavor-mint text-flavor-ink shadow-button hover:-translate-y-1",
        citrus: "bg-flavor-citrus text-flavor-ink shadow-button hover:-translate-y-1",
        berry: "bg-flavor-berry text-primary-foreground shadow-button hover:-translate-y-1",
        apple: "bg-apple text-apple-foreground shadow-button hover:-translate-y-1 hover:bg-apple/90",
        outline: "border border-border bg-background text-foreground hover:bg-muted",
      },
      size: {
        default: "h-12 rounded-lg px-6 text-sm",
        sm: "h-9 rounded-md px-3 text-sm",
        lg: "h-16 rounded-xl px-8 text-base",
        icon: "size-11 rounded-lg",
        "icon-sm": "size-9 rounded-md",
        "icon-lg": "size-12 rounded-xl",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Component = asChild ? Slot : "button";
    return <Component ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
  },
);

export { Button, buttonVariants };