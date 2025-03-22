import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "メールアドレスを入力してください" })
    .email({ message: "有効なメールアドレスを入力してください" }),
  password: z
    .string()
    .min(8, { message: "パスワードは8文字以上で入力してください" })
    .regex(/[A-Z]/, { message: "パスワードには大文字を含める必要があります" })
    .regex(/[a-z]/, { message: "パスワードには小文字を含める必要があります" })
    .regex(/[0-9]/, { message: "パスワードには数字を含める必要があります" }),
});

export type LoginInput = z.infer<typeof loginSchema>;
