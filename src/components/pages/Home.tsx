import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-8 text-4xl font-bold">React TypeScript Auth</h1>
      <p className="mb-8 text-center text-gray-600">
        シンプルで安全な認証システムのデモアプリケーション
      </p>
      <Button asChild>
        <Link to="/login">ログインして始める</Link>
      </Button>
    </div>
  );
}
