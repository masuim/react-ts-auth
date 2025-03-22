import {
  createContext,
  useContext,
  useState,
  ReactNode,
  use,
  useTransition,
} from "react";
import { useFormStatus } from "react-dom";
import { mockAuthApi, mockLogoutApi } from "@/mocks/api/auth";
import { User } from "@/mocks/data/users";
import { cookieUtil } from "@/lib/cookie";
import { verifyAuthToken } from "./auth-utils";
import { loginSchema, type LoginInput } from "./auth-validation";

interface AuthContextType {
  user: Omit<User, "password"> | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isPending: boolean;
  login: (data: LoginInput) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Omit<User, "password"> | null>(null);
  const { pending: isLoading } = useFormStatus();
  const [isPending, startTransition] = useTransition();

  const authPromise = new Promise<Omit<User, "password"> | null>((resolve) => {
    verifyAuthToken(
      (userData) => {
        startTransition(() => {
          setUser(userData);
        });
        resolve(userData);
      },
      (error) => {
        console.error("Auth verification failed:", error);
        resolve(null);
      }
    );
  });
  use(authPromise);

  const login = async (data: LoginInput) => {
    const validatedData = loginSchema.parse(data);
    return new Promise<void>((resolve, reject) => {
      mockAuthApi(
        validatedData,
        (response) => {
          startTransition(() => {
            setUser(response.user);
          });
          cookieUtil.setAuthToken(response.token);
          resolve();
        },
        (error) => {
          console.error("Login error:", error);
          reject(error);
        }
      );
    });
  };

  const logout = async () => {
    return new Promise<void>((resolve, reject) => {
      mockLogoutApi(
        () => {
          startTransition(() => {
            setUser(null);
          });
          cookieUtil.removeAuthToken();
          resolve();
        },
        (error) => {
          console.error("Logout error:", error);
          reject(error);
        }
      );
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isPending,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
