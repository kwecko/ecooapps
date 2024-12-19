import { validateCellphone, validateTally } from "@shared/utils";
import { z } from "zod";

export const changeRegistrationSchema = z.object({
  first_name: z.string().min(1, { message: "Nome obrigatório" }),
  last_name: z.string().min(1, { message: "Sobrenome obrigatório" }),
  photo: z
    .instanceof(File)
    .refine((file: File) => file?.size <= 1 * 1024 * 1024, {
      message: "O arquivo deve ter no máximo 1MB",
    })
    .refine(
      (file: File) => file && ["image/jpeg", "image/png"].includes(file.type),
      {
        message: "Apenas imagens JPEG e PNG são permitidas",
      }
    )
    .nullable()
    .optional(),
  email: z
    .string()
    .min(1, { message: "Email obrigatório" })
    .email({ message: "Email inválido" }),
  phone: z
    .string()
    .min(1, { message: "Celular obrigatório" })
    .max(15)
    .refine((value: string) => validateCellphone(value), {
      message: "Celular inválido.",
    })
    .optional(),
  name: z.string().min(1, { message: "Nome obrigatório" }),
  tally: z
    .string()
    .min(1, { message: "Número do talão é obrigatório" })
    .refine((value: string) => validateTally(value), {
      message: "Número do talão inválido.",
    }),
  description: z.string().max(200).optional(),
});

export type ChangeRegistrationSchema = z.infer<typeof changeRegistrationSchema>;
