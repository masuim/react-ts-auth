import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function AuthInput({ label, error, ...props }: AuthInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={props.id}>{label}</Label>
      <Input {...props} />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
