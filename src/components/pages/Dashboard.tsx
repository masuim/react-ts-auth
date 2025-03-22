import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/features/auth/AuthContext";
import { UserProfile } from "@/components/molecules/user/UserProfile";
import { ErrorBoundary } from "@/components/error-boundary";

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-8 text-3xl font-bold">ダッシュボード</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ErrorBoundary>
          <UserProfile
            user={user}
            onLogout={handleLogout}
            isLoading={isLoading}
          />
        </ErrorBoundary>
      </div>
    </div>
  );
}
