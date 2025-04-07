import { validateCellphone } from "@shared/utils";
import { z } from "zod";

export const changePersonalRegistrationSchema = z.object({
  first_name: z.string().min(1, { message: "Nome obrigatório" }),
  last_name: z.string().min(1, { message: "Sobrenome obrigatório" }),
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
});

export type ChangePersonalRegistrationSchema = z.infer<typeof changePersonalRegistrationSchema>;
