import { validateTally } from "@shared/utils";
import { z } from "zod";

const isFileDefined = typeof File !== "undefined";

export const changeComercialRegistrationSchema = z.object({
  photo: isFileDefined ? z
    .union([
      z
        .instanceof(File)
        .refine((file: File) => file.size <= 1 * 1024 * 1024, {
          message: "O arquivo deve ter no máximo 1MB",
        })
        .refine((file: File) => ["image/jpeg", "image/png"].includes(file.type), {
          message: "Apenas imagens JPEG e PNG são permitidas",
        }),
      z.string(),
      z.null(),
      z.undefined(),
    ])
    .optional() : z.any().optional(),
  name: z.string().min(1, { message: "Nome obrigatório" }),
  tally: z
    .string()
    .min(1, { message: "Número do talão é obrigatório" })
    .refine((value: string) => validateTally(value), {
      message: "Número do talão inválido.",
    }),
  description: z.string().max(200).optional(),
});

export type ChangeComercialRegistrationSchema = z.infer<typeof changeComercialRegistrationSchema>;
