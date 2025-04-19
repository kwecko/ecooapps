import { z } from "zod";

import {
  fifthStepRegisterSchema,
  firstStepRegisterSchema,
  secondStepRegisterSchema,
} from "@shared/schemas/register";

export type FirstStepRegisterSchema = z.infer<typeof firstStepRegisterSchema>;

export type SecondStepRegisterSchema = z.infer<typeof secondStepRegisterSchema>;

export type FifthStepRegisterSchema = z.infer<typeof fifthStepRegisterSchema>;

export type Roles = "USER" | "PRODUCER";

export type Masks = "phone" | "cpf" | "tally";
