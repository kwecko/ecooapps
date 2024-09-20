import z from "zod";

import { validateCellphone } from "@shared/utils";

export const updateInfoFieldsSchema = {
  firstName: z.string().min(1, { message: "Campo obrigatório." }).max(255),
  lastName: z.string().min(1, { message: "Campo obrigatório" }).max(255),
  email: z.string().email({ message: "Formato de e-mail inválido." }),
  phone: z.string().min(11, "Formato de telefone inválido.").refine((value: string) => validateCellphone(value), {
    message: "Formato de telefone inválido.",
  }),
  password: z.string().min(8, { message: "Deve conter pelo menos 8 caracteres." }),
  confirmPassword: z.string().min(8, { message: "Deve conter pelo menos 8 caracteres." })
};