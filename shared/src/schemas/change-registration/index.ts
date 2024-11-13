import { z } from "zod";

import { validateCellphone, validateTally } from "@shared/utils";

export const changeRegistrationSchema = z.object({
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
    .refine((value) => validateCellphone(value), {
      message: "Celular inválido.",
    })
    .optional(),
  name: z.string().min(1, { message: "Nome obrigatório" }),
  tally: z
    .string()
    .min(1, { message: "Número do talão é obrigatório" })
    .refine((value) => validateTally(value), {
      message: "Número do talão inválido.",
    }),
  description: z.string().max(200).optional(),
});

export type ChangeRegistrationSchema = z.infer<typeof changeRegistrationSchema>;
