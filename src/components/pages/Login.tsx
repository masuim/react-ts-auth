import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/features/auth/AuthContext";
import { loginSchema, type LoginInput } from "@/features/auth/auth-validation";
import { SubmitButton } from "@/components/molecules/auth/SubmitButton";
import { AuthForm } from "@/components/organisms/auth/AuthForm";
import { AuthInput } from "@/components/molecules/auth/AuthInput";

import { Eye, EyeOff } from "lucide-react";
import { IconButton } from "@/components/atoms/IconButton";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setError("");
      await login(data);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "ログインに失敗しました");
    }
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AuthForm
      title="ログイン"
      description="アカウントにログインしてください"
      onSubmit={onSubmit}
    >
      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
      <AuthInput
        id="email"
        label="メールアドレス"
        type="email"
        placeholder="example@example.com"
        {...register("email")}
        error={errors.email?.message}
      />
      <div className="relative">
        <AuthInput
          id="password"
          label="パスワード"
          type={showPassword ? "text" : "password"}
          {...register("password")}
          error={errors.password?.message}
        />
        <IconButton
          type="button"
          variant="ghost"
          className="absolute right-2 top-8"
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? "パスワードを隠す" : "パスワードを表示"}
          icon={
            showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )
          }
        />
      </div>
      <SubmitButton className="w-full">ログイン</SubmitButton>
    </AuthForm>
  );
};
