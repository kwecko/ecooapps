import { z } from "zod";

export const warehouseInfoFormSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  CNPJ: z.string().min(1, { message: "CNPJ é obrigatório" }),
  manager: z.string().min(1, { message: "Responsável é obrigatório" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().optional(),
  // socials: z.array(
  //   z.object({
  //     platform: z.string().min(1, { message: "Plataforma é obrigatória" }),
  //     value: z.string().min(1, { message: "Valor é obrigatório" }),
  //   })
  // ).optional(),
  address: z.object({
    CEP: z.string().min(1, { message: "CEP é obrigatório" }),
    street: z.string().min(1, { message: "Logradouro é obrigatório" }),
    number: z.string().min(1, { message: "Número é obrigatório" }),
    neighborhood: z.string().min(1, { message: "Bairro é obrigatório" }),
    complement: z.string().optional(),
    city: z.string().min(1, { message: "Cidade é obrigatório" }),
    state: z.string().min(1, { message: "Estado é obrigatório" }),
    link: z.string().url().optional(),
  }),
  coverage: z.tuple([z.string().min(1, { message: "Área de cobertura é obrigatória" })]),
});