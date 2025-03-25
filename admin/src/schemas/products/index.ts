import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "O nome do produto é obrigatório"),
  pricing: z.enum(["UNIT", "WEIGHT"]),
  category: z.string().min(1, "A categoria é obrigatória"),
  perishable: z.boolean(),
  archived: z.boolean(),
  image: z
    .custom<File>((file) => file instanceof File, {
      message: "A imagem é obrigatória",
    })
    .refine((file) => file.size <= 1 * 1024 * 1024, {
      message: "O arquivo deve ter no máximo 1MB",
    })
    .refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
      message: "Apenas imagens JPEG e PNG são permitidas",
    })
});

export type ProductSchema = z.infer<typeof productSchema>;

export const updateProductSchema = z.object({
  name: z.string().optional(),
  pricing: z.enum(["UNIT", "WEIGHT"]).optional(),
  category: z.string().min(1, "A categoria é obrigatória").optional(),
  perishable: z.boolean().optional(),
  archived: z.boolean().optional(),
  image: z
    .custom<File>((file) => file instanceof File, {
      message: "A imagem é obrigatória",
    })
    .refine((file) => file.size <= 1 * 1024 * 1024, {
      message: "O arquivo deve ter no máximo 1MB",
    })
    .refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
      message: "Apenas imagens JPEG e PNG são permitidas",
    })
    .optional(),
});

export type UpdateProductSchema = z.infer<typeof updateProductSchema>;
