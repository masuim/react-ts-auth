import Cookies from "universal-cookie";

const cookies = new Cookies();

const AUTH_TOKEN_KEY = "auth_token";

const COOKIE_OPTIONS = {
  path: "/",
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  maxAge: 30 * 24 * 60 * 60, // 30日
};

export const cookieUtil = {
  setAuthToken: (token: string) => {
    cookies.set(AUTH_TOKEN_KEY, token, COOKIE_OPTIONS);
  },

  getAuthToken: () => {
    return cookies.get(AUTH_TOKEN_KEY);
  },

  removeAuthToken: () => {
    cookies.remove(AUTH_TOKEN_KEY, { path: "/" });
  },
};
