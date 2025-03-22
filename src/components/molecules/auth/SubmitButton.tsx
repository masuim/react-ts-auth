import { useFormStatus } from "react-dom";
import { Button } from "@/components/atoms/button";
import type { ButtonProps } from "@/components/atoms/button";

type SubmitButtonProps = Omit<ButtonProps, "type"> & {
  children: string;
  loadingText?: string;
};

export const SubmitButton = ({
  children,
  loadingText,
  ...props
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} {...props}>
      {pending ? loadingText || `${children}中...` : children}
    </Button>
  );
};
