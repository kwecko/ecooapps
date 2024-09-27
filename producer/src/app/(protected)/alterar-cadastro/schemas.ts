import { z } from "zod";

import { validateCellphone } from "@shared/utils";

export const schemaChangePassword = z
  .object({
    phone: z
      .string()
      .min(11, "Formato de telefone inválido.")
      .refine((val) => validateCellphone(val), {
        message: "Formato de telefone inválido.",
      }),
    password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres."),
    confirmPassword: z
      .string()
      .min(8, "Confirmar senha deve ter pelo menos 8 caracteres."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
  });
