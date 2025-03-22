import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";

interface AuthFormProps {
  title: string;
  description: string;
  children: ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
}

export function AuthForm({
  title,
  description,
  children,
  onSubmit,
}: AuthFormProps) {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            {children}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
