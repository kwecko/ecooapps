export interface PaymentDTO {
  id: string;
  method: "CREDIT" | "DEBIT" | "CASH" | "PIX";
  flag: "MASTERCARD" | "VISA" | "OTHER" | null;
  status: "PENDING" | "DONE" | "FAILED";
  expired: boolean | null;
  bag_id: string;
  expires_at: Date | null;
  created_at: Date;
  updated_at: Date | null;
}
