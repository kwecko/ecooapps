import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Email obrigatório" }).email({ message: "Email inválido" }),
  password: z.string().min(1, "Senha obrigatória"),
})