// 認証が必要なルート
export const PROTECTED_ROUTES = {
  DASHBOARD: "/dashboard",
} as const;

// 未認証ユーザーのみがアクセスできるルート
export const PUBLIC_ONLY_ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register", // TODO: 将来的な拡張用
} as const;

// 誰でもアクセスできるルート
export const PUBLIC_ROUTES = {
  HOME: "/",
} as const;

type ProtectedPaths = (typeof PROTECTED_ROUTES)[keyof typeof PROTECTED_ROUTES];
type PublicOnlyPaths =
  (typeof PUBLIC_ONLY_ROUTES)[keyof typeof PUBLIC_ONLY_ROUTES];
type PublicPaths = (typeof PUBLIC_ROUTES)[keyof typeof PUBLIC_ROUTES];
export type RoutePaths = ProtectedPaths | PublicOnlyPaths | PublicPaths;

export const isProtectedRoute = (path: RoutePaths): path is ProtectedPaths => {
  return Object.values(PROTECTED_ROUTES).includes(path as ProtectedPaths);
};

export const isPublicOnlyRoute = (
  path: RoutePaths
): path is PublicOnlyPaths => {
  return Object.values(PUBLIC_ONLY_ROUTES).includes(path as PublicOnlyPaths);
};
