import { validateCellphone, validateTally } from "@shared/utils";
import { z } from "zod";

export const changeComercialRegistrationSchema = z.object({
  photo: z
    .instanceof(File)
    .refine((file: File) => file?.size <= 1 * 1024 * 1024, {
      message: "O arquivo deve ter no máximo 1MB",
    })
    .refine(
      (file: File) => file && ["image/jpeg", "image/png"].includes(file.type),
      {
        message: "Apenas imagens JPEG e PNG são permitidas",
      }
    )
    .nullable()
    .optional(),
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
