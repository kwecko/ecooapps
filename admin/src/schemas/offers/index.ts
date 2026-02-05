import { z } from "zod";

export const updateOfferSchema = z.object({
  amount: z.number().min(1, "Quantidade deve ser maior que zero").optional(),
  price: z.number().min(0.01, "Preço deve ser maior que zero").optional(),
  description: z
    .string()
    .max(200, "Descrição deve ter no máximo 200 caracteres")
    .optional(),
  comment: z
    .string()
    .max(200, "Comentário deve ter no máximo 200 caracteres")
    .optional(),
  expires_at: z.string().optional(),
});

export type UpdateOfferSchema = z.infer<typeof updateOfferSchema>;

