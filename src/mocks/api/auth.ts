import { User, UserCredentials, MOCK_USERS } from "../data/users";

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

type AuthCallback<T> = (result: T) => void;
type ErrorCallback = (error: Error) => void;

interface AuthResponse {
  user: Omit<User, "password">;
  token: string;
}

export const mockAuthApi = (
  credentials: UserCredentials,
  onSuccess: AuthCallback<AuthResponse>,
  onError: ErrorCallback
) => {
  setTimeout(() => {
    const user = MOCK_USERS.find((u) => u.email === credentials.email);

    if (!user || user.password !== credentials.password) {
      onError(
        new AuthError("メールアドレスまたはパスワードが正しくありません")
      );
      return;
    }

    const userWithoutPassword: Omit<User, "password"> = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };

    onSuccess({
      user: userWithoutPassword,
      token: `mock-jwt-token-${user.id}-${Date.now()}`,
    });
  }, 1000);
};

export const mockLogoutApi = (
  onSuccess: () => void,
  onError?: ErrorCallback
) => {
  setTimeout(() => {
    try {
      onSuccess();
    } catch (error) {
      onError?.(error as Error);
    }
  }, 500);
};

export const mockVerifyToken = (
  token: string,
  onSuccess: AuthCallback<Omit<User, "password"> | null>,
  onError?: ErrorCallback
) => {
  setTimeout(() => {
    try {
      if (!token.startsWith("mock-jwt-token-")) {
        onSuccess(null);
        return;
      }

      const userId = token.split("-")[3];
      const user = MOCK_USERS.find((u) => u.id === userId);

      if (!user) {
        onSuccess(null);
        return;
      }

      const userWithoutPassword: Omit<User, "password"> = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      };

      onSuccess(userWithoutPassword);
    } catch (error) {
      onError?.(error as Error);
      onSuccess(null);
    }
  }, 500);
};
