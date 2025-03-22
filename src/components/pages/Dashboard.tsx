import { useNavigate } from "react-router-dom";

import { useAuth } from "@/features/auth/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Button } from "@/components/atoms/button";

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-8 text-3xl font-bold">ダッシュボード</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>プロフィール</CardTitle>
            <CardDescription>ユーザー情報</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">ログイン中のユーザー情報がここに表示されます</p>
            <Button variant="outline" onClick={handleLogout}>
              ログアウト
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
