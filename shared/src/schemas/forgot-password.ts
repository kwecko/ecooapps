import { z } from "zod";

export const schemaForgotPassword = z.object({
  email: z
    .string()
    .min(10, { message: "Email obrigatório" })
    .email({ message: "Email inválido" }),
});
