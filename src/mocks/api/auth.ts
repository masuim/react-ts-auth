import { User, UserCredentials, MOCK_USERS } from "../data/users";

interface AuthResponse {
  user: Omit<User, "password">;
  token: string;
}

// TODO: 認証エラーの定義 他の記法にした方がわかりやすいのでは?
export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

export async function mockAuthApi(
  credentials: UserCredentials
): Promise<AuthResponse> {
  // 実際のAPIの動作をシミュレートするための遅延
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const user = MOCK_USERS.find((u) => u.email === credentials.email);

  if (!user || user.password !== credentials.password) {
    throw new AuthError("メールアドレスまたはパスワードが正しくありません");
  }

  const userWithoutPassword: Omit<User, "password"> = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };

  return {
    user: userWithoutPassword,
    token: `mock-jwt-token-${user.id}-${Date.now()}`,
  };
}

export async function mockLogoutApi(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 500));
}

export async function mockVerifyToken(
  token: string
): Promise<Omit<User, "password"> | null> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!token.startsWith("mock-jwt-token-")) {
    return null;
  }

  const userId = token.split("-")[3];
  const user = MOCK_USERS.find((u) => u.id === userId);

  if (!user) {
    return null;
  }

  const userWithoutPassword: Omit<User, "password"> = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
  return userWithoutPassword;
}
