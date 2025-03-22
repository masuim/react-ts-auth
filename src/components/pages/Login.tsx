import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/features/auth/AuthContext";
import { loginSchema, type LoginInput } from "@/features/auth/auth-validation";
import { SubmitButton } from "@/components/molecules/auth/SubmitButton";
import { AuthForm } from "@/components/organisms/auth/AuthForm";
import { AuthInput } from "@/components/molecules/auth/AuthInput";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string>("");

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
      <AuthInput
        id="password"
        label="パスワード"
        type="password"
        {...register("password")}
        error={errors.password?.message}
      />
      <SubmitButton className="w-full">ログイン</SubmitButton>
    </AuthForm>
  );
};
