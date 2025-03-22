import { User } from "@/mocks/data/users";
import { Button } from "@/components/atoms/button";
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
  isLoading,
  isPending,
}: {
  onClick: () => void;
  isLoading?: boolean;
  isPending?: boolean;
}) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      disabled={isLoading || isPending}
    >
      {isLoading || isPending ? "ログアウト中..." : "ログアウト"}
    </Button>
  );
}

interface UserProfileProps {
  user: Omit<User, "password"> | null;
  onLogout: () => void;
  isLoading?: boolean;
  isPending?: boolean;
}

export function UserProfile({
  user,
  onLogout,
  isLoading,
  isPending,
}: UserProfileProps) {
  if (!user) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-gray-500">ユーザー情報が見つかりません</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>プロフィール</CardTitle>
        <CardDescription>ユーザー情報</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <p className="text-sm text-gray-500">名前</p>
            <p className="font-medium">{user.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">メールアドレス</p>
            <p className="font-medium">{user.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">ロール</p>
            <p className="font-medium">{user.role}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <LogoutButton
          onClick={onLogout}
          isLoading={isLoading}
          isPending={isPending}
        />
      </CardFooter>
    </Card>
  );
}
