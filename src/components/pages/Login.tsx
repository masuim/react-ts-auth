import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/atoms/button";
import { AuthInput } from "@/components/molecules/auth/AuthInput";
import { AuthForm } from "@/components/organisms/auth/AuthForm";
import { useAuth } from "@/features/auth/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error("ログインエラー:", error);
    }
  };

  return (
    <AuthForm
      title="ログイン"
      description="アカウントにログインしてください"
      onSubmit={handleSubmit}
    >
      <AuthInput
        id="email"
        label="メールアドレス"
        type="email"
        placeholder="example@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <AuthInput
        id="password"
        label="パスワード"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button className="w-full" type="submit">
        ログイン
      </Button>
    </AuthForm>
  );
}
