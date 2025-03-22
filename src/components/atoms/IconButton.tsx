import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  variant?: "default" | "ghost" | "outline";
}

export const IconButton = ({
  icon,
  variant = "default",
  className,
  ...props
}: IconButtonProps) => {
  return (
    <button
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-primary text-primary-foreground hover:bg-primary/90":
            variant === "default",
          "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground":
            variant === "outline",
        },
        className
      )}
      {...props}
    >
      {icon}
    </button>
  );
};
