import { z } from "zod";

import { validateCellphone } from "@shared/utils";

export const formSchema = z.object({
  first_name: z.string().nonempty("Nome é obrigatório."),
  last_name: z.string().nonempty("Sobrenome é obrigatório."),
  phone: z.string().min(11, "Formato de telefone inválido.").refine((val) => validateCellphone(val), {
    message: "Formato de telefone inválido.",
  }),
  password: z.string().nonempty("Senha é obrigatória.").min(8, "Senha deve ter pelo menos 8 caracteres."),
  confirmPassword: z.string().nonempty("Confirmação de senha é obrigatória.").min(8, "Confirmar senha deve ter pelo menos 8 caracteres."),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
  });
