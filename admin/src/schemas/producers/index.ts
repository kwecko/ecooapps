import { z } from "zod";

export const createProducerSchema = z.object({
  first_name: z.string().min(1, "O nome é obrigatório"),
  last_name: z.string().min(1, "O sobrenome é obrigatório"),
  cpf: z
    .string()
    .min(11, "O CPF é obrigatório")
    .regex(/^\d+$/, "O CPF deve conter apenas números"),
  phone: z
    .string()
    .min(10, "O telefone é obrigatório")
    .max(12, "O telefone deve ter no máximo 12 caracteres")
    .regex(/^\d+$/, "O telefone deve conter apenas números"),
  email: z.string().email("Email inválido"),
  name: z.string().min(1, "O nome do negócio é obrigatório"),
  tally: z
    .string()
    .min(1, "O talão é obrigatório")
    .regex(/^\d+$/, "O talão deve conter apenas números"),
  photo: z
    .custom<File>((file) => file instanceof File, {
      message: "A imagem é obrigatória",
    })
    .refine((file) => file.size <= 1 * 1024 * 1024, {
      message: "O arquivo deve ter no máximo 1MB",
    })
    .refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
      message: "Apenas imagens JPEG e PNG são permitidas",
    })
    .optional(),
});

export type CreateProducerSchema = z.infer<typeof createProducerSchema>;

export const updateProducerSchema = z.object({
  first_name: z.string().min(1, "O nome é obrigatório"),
  last_name: z.string().min(1, "O sobrenome é obrigatório"),
  cpf: z
    .string()
    .min(11, "O CPF é obrigatório")
    .regex(/^\d+$/, "O CPF deve conter apenas números"),
  phone: z
    .string()
    .min(10, "O telefone é obrigatório")
    .max(12, "O telefone deve ter no máximo 12 caracteres")
    .regex(/^\d+$/, "O telefone deve conter apenas números"),
  email: z.string().email("Email inválido"),
  name: z.string().min(1, "O nome do negócio é obrigatório"),
  tally: z
    .string()
    .min(1, "O talão é obrigatório")
    .regex(/^\d+$/, "O talão deve conter apenas números"),
  photo: z
    .custom<File>((file) => file instanceof File, {
      message: "A imagem é obrigatória",
    })
    .refine((file) => file.size <= 1 * 1024 * 1024, {
      message: "O arquivo deve ter no máximo 1MB",
    })
    .refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
      message: "Apenas imagens JPEG e PNG são permitidas",
    })
    .optional(),
});

export type UpdateProducerSchema = z.infer<typeof updateProducerSchema>;