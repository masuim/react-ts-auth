import { User } from "@/mocks/data/users";
import { Button } from "@/components/atoms/button";
import { useFormStatus } from "react-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/atoms/card";

function LogoutButton({
  onClick,
  isPending,
}: {
  onClick: () => void;
  isPending?: boolean;
}) {
  const { pending } = useFormStatus();
  const isLoading = pending || isPending;

  return (
    <Button variant="outline" onClick={onClick} disabled={isLoading}>
      {isLoading ? "ログアウト中..." : "ログアウト"}
    </Button>
  );
}

interface UserProfileProps {
  user: Omit<User, "password"> | null;
  onLogout: () => void;
  isPending?: boolean;
}

export function UserProfile({ user, onLogout, isPending }: UserProfileProps) {
  if (!user) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>プロフィール</CardTitle>
        <CardDescription>ユーザー情報</CardDescription>
      </CardHeader>
      <CardContent>
        <dl className="space-y-2">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">名前</dt>
            <dd>{user.name}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              メールアドレス
            </dt>
            <dd>{user.email}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">権限</dt>
            <dd>{user.role === "admin" ? "管理者" : "一般ユーザー"}</dd>
          </div>
        </dl>
      </CardContent>
      <CardFooter>
        <LogoutButton onClick={onLogout} isPending={isPending} />
      </CardFooter>
    </Card>
  );
}
