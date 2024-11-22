import { validateCellphone, validateCPF } from "@shared/utils";
import { z } from "zod";

export const firstStepRegisterSchema = z.object({
  first_name: z.string().min(1, { message: "Nome obrigatório" }),
  last_name: z.string().min(1, { message: "Sobrenome obrigatório" }),
  email: z
    .string()
    .min(1, { message: "Email obrigatório" })
    .email({ message: "Email inválido" }),
});

export const secondStepRegisterSchema = z
  .object({
    cpf: z
      .string()
      .min(1, { message: "CPF obrigatório" })
      .max(14)
      .refine((value) => validateCPF(value), {
        message: "CPF não é válido",
      }),
    phone: z
      .string()
      .min(1, { message: "Celular obrigatório" })
      .max(15)
      .refine((value) => validateCellphone(value), {
        message: "Celular inválido.",
      }),
    password: z
      .string()
      .min(1, "Senha obrigatória")
      .min(8, "Senha deve ter pelo menos 8 caracteres."),
    confirmPassword: z
      .string()
      .min(1, "Confirmação de senha é obrigatória")
      .min(8, "Confirmar senha deve ter pelo menos 8 caracteres."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

export const fifthStepRegisterSchema = z.object({
  name: z.string().min(1, { message: "Nome do agronegócio obrigatório" }),
  tally: z.string().min(1, { message: "Número do Talão obrigatório" }),
});
