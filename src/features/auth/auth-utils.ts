import { cookieUtil } from "@/lib/cookie";
import { mockVerifyToken } from "@/mocks/api/auth";
import { User } from "@/mocks/data/users";

type AuthCallback<T> = (result: T) => void;
type ErrorCallback = (error: Error) => void;

export const verifyAuthToken = (
  onSuccess: AuthCallback<Omit<User, "password"> | null>,
  onError?: ErrorCallback
) => {
  const token = cookieUtil.getAuthToken();
  if (!token) {
    onSuccess(null);
    return;
  }

  mockVerifyToken(
    token,
    (userData) => {
      if (!userData) {
        cookieUtil.removeAuthToken();
      }
      onSuccess(userData);
    },
    (error) => {
      console.error("Token verification failed:", error);
      cookieUtil.removeAuthToken();
      onError?.(error);
      onSuccess(null);
    }
  );
};
