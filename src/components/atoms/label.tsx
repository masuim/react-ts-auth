import { LabelHTMLAttributes, Ref } from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  ref?: Ref<HTMLLabelElement>;
}

export const Label = ({ className, ...props }: LabelProps) => (
  <LabelPrimitive.Root
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
);
