export interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
}

export interface UserCredentials {
  email: string;
  password: string;
}

export const MOCK_USERS: (User & { password: string })[] = [
  {
    id: "1",
    email: "test@example.com",
    password: "password123",
    name: "テストユーザー",
    role: "user",
  },
  {
    id: "2",
    email: "admin@example.com",
    password: "admin123",
    name: "管理者",
    role: "admin",
  },
];
