import { z } from "zod";
import { loginSchema } from "@shared/schemas/login";

export type LoginSchema = z.infer<typeof loginSchema>