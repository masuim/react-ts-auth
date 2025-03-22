import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import {
  isProtectedRoute,
  isPublicOnlyRoute,
  PROTECTED_ROUTES,
  PUBLIC_ONLY_ROUTES,
  type RoutePaths,
} from "./routes";

interface RouteGuardProps {
  children: ReactNode;
}

export function RouteGuard({ children }: RouteGuardProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname as RoutePaths;

  // 認証が必要なルートで未認証の場合
  if (isProtectedRoute(currentPath) && !isAuthenticated) {
    return <Navigate to={PUBLIC_ONLY_ROUTES.LOGIN} />;
  }

  // 未認証ユーザー専用ルートで認証済みの場合
  if (isPublicOnlyRoute(currentPath) && isAuthenticated) {
    return <Navigate to={PROTECTED_ROUTES.DASHBOARD} />;
  }

  return <>{children}</>;
}
