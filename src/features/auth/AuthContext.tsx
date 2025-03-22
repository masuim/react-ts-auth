import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { mockAuthApi, mockLogoutApi, mockVerifyToken } from "@/mocks/api/auth";
import { User } from "@/mocks/data/users";
import { cookieUtil } from "@/lib/cookie";

interface AuthContextType {
  user: Omit<User, "password"> | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Omit<User, "password"> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      const token = cookieUtil.getAuthToken();
      if (token) {
        try {
          const userData = await mockVerifyToken(token);
          if (userData) {
            setUser(userData);
          } else {
            cookieUtil.removeAuthToken();
          }
        } catch (error) {
          console.error("Token verification failed:", error);
          cookieUtil.removeAuthToken();
        }
      }
      setIsLoading(false);
    };

    verifyAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await mockAuthApi({ email, password });
      setUser(response.user);
      cookieUtil.setAuthToken(response.token);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await mockLogoutApi();
      setUser(null);
      cookieUtil.removeAuthToken();
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
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
