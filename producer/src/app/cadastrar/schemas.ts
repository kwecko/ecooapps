import z from "zod";

import { validateCPF, validateCellphone } from "@shared/utils/index";

export const registerStep1FieldsSchema = {
  email: z.string().email({ message: "Formato de e-mail inválido." }),
  phone: z.string().refine((value) => validateCellphone(value), {
    message: "Formato de telefone inválido.",
  }),
  password: z
    .string()
    .min(8, { message: "Deve conter pelo menos 8 caracteres." }),
};

export const registerStep2FieldsSchema = {
  first_name: z.string().min(1, { message: "Campo obrigatório." }).max(255),
  last_name: z.string().min(1, { message: "Campo obrigatório" }).max(255),
  cpf: z
    .string()
    .refine((cpf) => validateCPF(cpf), { message: "CPF inválido." }),
};

export const registerStep4FieldsSchema = {
  agribusiness_name: z.string().min(1, { message: "Campo obrigatório." }),
  caf: z.string().min(1, { message: "Campo obrigatório." }),
};
