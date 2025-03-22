import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useTransition,
  useEffect,
} from "react";
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
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    verifyAuthToken(
      (userData) => {
        startTransition(() => {
          setUser(userData);
        });
        setIsLoading(false);
      },
      (error) => {
        console.error("Auth verification failed:", error);
        setIsLoading(false);
      }
    );
  }, []);

  const login = async (data: LoginInput) => {
    const validatedData = loginSchema.parse(data);
    setIsLoading(true);
    return new Promise<void>((resolve, reject) => {
      mockAuthApi(
        validatedData,
        (response) => {
          startTransition(() => {
            setUser(response.user);
          });
          cookieUtil.setAuthToken(response.token);
          setIsLoading(false);
          resolve();
        },
        (error) => {
          console.error("Login error:", error);
          setIsLoading(false);
          reject(error);
        }
      );
    });
  };

  const logout = async () => {
    setIsLoading(true);
    return new Promise<void>((resolve, reject) => {
      mockLogoutApi(
        () => {
          startTransition(() => {
            setUser(null);
          });
          cookieUtil.removeAuthToken();
          setIsLoading(false);
          resolve();
        },
        (error) => {
          console.error("Logout error:", error);
          setIsLoading(false);
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
