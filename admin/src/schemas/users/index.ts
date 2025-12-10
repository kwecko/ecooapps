import { z } from "zod";

export const updateUserSchema = z.object({
  first_name: z.string().min(1, "O nome é obrigatório"),
  last_name: z.string().min(1, "O sobrenome é obrigatório"),
  email: z.string().email("Email inválido"),
  cpf: z
    .string()
    .length(11, "O CPF deve ter exatamente 11 caracteres")
    .regex(/^\d+$/, "O CPF deve conter apenas números"),
  phone: z
    .string()
    .min(11, "O telefone é obrigatório e deve ter no mínimo 11 caracteres")
    .max(13, "O telefone deve ter no máximo 13 caracteres")
    .regex(/^\d+$/, "O telefone deve conter apenas números"),
  active: z.boolean()
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;