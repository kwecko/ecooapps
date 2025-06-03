export type BagStatus = {
  offer: "PENDING" | "CANCELLED" | "VERIFIED";
  build: "VERIFIED" | "MOUNTED";
  send: "MOUNTED" | "DISPATCHED" | "RECEIVED" | "DEFERRED";
};

export type SendStatus = Array<
  "MOUNTED" | "DISPATCHED" | "RECEIVED" | "DEFERRED"
>;
export type BuildStatus = Array<"VERIFIED" | "MOUNTED">;
export type OfferStatus = Array<"PENDING" | "CANCELLED" | "VERIFIED">;
