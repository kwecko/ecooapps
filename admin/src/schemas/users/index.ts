import { z } from "zod";

export const updateUserSchema = z.object({
  first_name: z.string().min(1, "O nome é obrigatório"),
  last_name: z.string().min(1, "O sobrenome é obrigatório"),
  email: z.string().email("Email inválido"),
  cpf: z
    .string()
    .min(11, "O CPF é obrigatório")
    .regex(/^\d+$/, "O CPF deve conter apenas números"),
  phone: z
    .string()
    .min(10, "O telefone é obrigatório")
    .max(12, "O telefone deve ter no máximo 12 caracteres")
    .regex(/^\d+$/, "O telefone deve conter apenas números"),
  active: z.boolean()
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;