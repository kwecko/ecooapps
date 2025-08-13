export type BagStatus = {
  offer: "PENDING" | "CANCELLED" | "VERIFIED" | "REJECTED";
  build: "VERIFIED" | "MOUNTED";
  send:
    | "MOUNTED"
    | "DISPATCHED"
    | "RECEIVED"
    | "DEFERRED"
    | "FETCH"
    | "FETCHED";
};

export type SendStatus = Array<
  "MOUNTED" | "DISPATCHED" | "RECEIVED" | "DEFERRED" | "FETCH" | "FETCHED"
>;
export type BuildStatus = Array<"VERIFIED" | "MOUNTED">;
export type OfferStatus = Array<
  "PENDING" | "CANCELLED" | "VERIFIED" | "REJECTED"
>;
