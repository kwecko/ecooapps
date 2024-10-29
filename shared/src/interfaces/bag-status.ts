export type IBagStatus = {
  offer: "PENDING" | "CANCELLED" | "VERIFIED";
  build: "PENDING" | "SEPARATED";
  send: "SEPARATED" | "DISPATCHED" | "RECEIVED" | "DEFERRED";
}