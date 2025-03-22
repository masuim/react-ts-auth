export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: "admin" | "user";
}

export interface UserCredentials {
  email: string;
  password: string;
}

export const MOCK_USERS: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    password: "Admin123456",
    name: "管理者",
    role: "admin",
  },
  {
    id: "2",
    email: "user@example.com",
    password: "User123456",
    name: "一般ユーザー",
    role: "user",
  },
];
