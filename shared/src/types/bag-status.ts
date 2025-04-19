export type BagStatus = {
  offer: "PENDING" | "CANCELLED" | "VERIFIED";
  build: "PENDING" | "SEPARATED";
  send: "SEPARATED" | "DISPATCHED" | "RECEIVED" | "DEFERRED";
};

export type SendStatus = Array<
  "SEPARATED" | "DISPATCHED" | "RECEIVED" | "DEFERRED"
>;
export type BuildStatus = Array<"PENDING" | "SEPARATED">;
export type OfferStatus = Array<"PENDING" | "CANCELLED" | "VERIFIED">;
