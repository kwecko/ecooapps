import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "O nome do produto é obrigatório"),
  pricing: z.enum(["UNIT", "WEIGHT"]),
  category: z.enum(["13b34bc7-b85c-46d5-9fbf-08d5fc2abd20", "193b8a2e-228d-4a84-965e-e862de23475e", "24538b64-06b5-4bab-ad94-72667ef52633", "1ead891c-4690-4499-92c2-e5d6655893b7", "3671bb99-3f81-49ce-9e26-3e008f7d05d9", "45005907-1b61-4d24-a563-5686ce530c7c", "7a1fd0ef-b990-4b8a-b3cc-e425f2ac11ea", "b2045c0f-8cc9-4c12-8193-4de0c585879e", "b6ebfe04-ba20-4599-9175-3095beb710a6", "b7bb008e-2dbe-4e37-ba96-02ffa732defd", "ba31afad-bc08-484d-8db8-abe6ad166fbf", "f62c5bb8-f8a8-4afa-b581-4315371d51a8"]),
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
  category: z.enum(["13b34bc7-b85c-46d5-9fbf-08d5fc2abd20", "193b8a2e-228d-4a84-965e-e862de23475e", "24538b64-06b5-4bab-ad94-72667ef52633", "1ead891c-4690-4499-92c2-e5d6655893b7", "3671bb99-3f81-49ce-9e26-3e008f7d05d9", "45005907-1b61-4d24-a563-5686ce530c7c", "7a1fd0ef-b990-4b8a-b3cc-e425f2ac11ea", "b2045c0f-8cc9-4c12-8193-4de0c585879e", "b6ebfe04-ba20-4599-9175-3095beb710a6", "b7bb008e-2dbe-4e37-ba96-02ffa732defd", "ba31afad-bc08-484d-8db8-abe6ad166fbf", "f62c5bb8-f8a8-4afa-b581-4315371d51a8"]),
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
