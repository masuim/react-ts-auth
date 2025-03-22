import { useNavigate } from "react-router-dom";
import { useFormState } from "react-dom";
import { useAuth } from "@/features/auth/AuthContext";
import { UserProfile } from "@/components/molecules/user/UserProfile";
import { ErrorBoundary } from "@/components/error-boundary";

const initialState = { error: null };

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout, user, isPending } = useAuth();

  const [state, formAction] = useFormState(async () => {
    try {
      await logout();
      navigate("/login");
      return { error: null };
    } catch (error) {
      console.error("Logout failed:", error);
      return {
        error:
          error instanceof Error ? error.message : "ログアウトに失敗しました",
      };
    }
  }, initialState);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-8 text-3xl font-bold">ダッシュボード</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ErrorBoundary>
          <UserProfile
            user={user}
            onLogout={formAction}
            isPending={isPending}
          />
          {state.error && (
            <p className="mt-2 text-sm text-red-500">{state.error}</p>
          )}
        </ErrorBoundary>
      </div>
    </div>
  );
}
