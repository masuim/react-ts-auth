import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthInput } from "@/components/molecules/auth/AuthInput";
import { AuthForm } from "@/components/organisms/auth/AuthForm";
import { SubmitButton } from "@/components/molecules/auth/SubmitButton";
import { useAuth } from "@/features/auth/AuthContext";
import { AuthError } from "@/mocks/api/auth";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof AuthError) {
        setError(error.message);
      } else {
        setError("ログイン中にエラーが発生しました");
      }
      console.error("ログインエラー:", error);
    }
  };

  return (
    <AuthForm
      title="ログイン"
      description="アカウントにログインしてください"
      onSubmit={handleSubmit}
    >
      {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
      <AuthInput
        id="email"
        label="メールアドレス"
        type="email"
        placeholder="example@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        error={error ? " " : undefined}
      />
      <AuthInput
        id="password"
        label="パスワード"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        error={error ? " " : undefined}
      />
      <SubmitButton className="w-full">ログイン</SubmitButton>
    </AuthForm>
  );
};
