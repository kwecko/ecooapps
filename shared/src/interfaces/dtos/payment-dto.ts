export interface PaymentDTO {
  id: string;
  method: "CREDIT" | "DEBIT" | "CASH" | "PIX";
  flag: "MASTERCARD" | "VISA" | "OTHER" | null;
  status: "PENDING" | "DONE" | "FAILED";
  expired: boolean | null;
  bag_id: string;
  expires_at: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface CreatePaymentDTO {
  bag_id: string;
  method: "CREDIT" | "DEBIT" | "CASH" | "PIX";
  flag?: "MASTERCARD" | "VISA" | "OTHER" | null;
  status: "PENDING" | "DONE" | "FAILED";
}