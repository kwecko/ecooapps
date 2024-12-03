import { BagMergeDTO } from "@shared/interfaces/dtos";

export interface PaymentDTO {
  id: string;
  method: "CREDIT" | "DEBIT" | "CASH" | "PIX";
  flag: "MASTERCARD" | "VISA" | "OTHER" | null;
  status: "PENDING" | "DONE" | "FAILED";
  bag: BagMergeDTO;
  expired: boolean | null;
  expires_at: Date | null;
  created_at: Date;
  updated_at: Date | null;
}
