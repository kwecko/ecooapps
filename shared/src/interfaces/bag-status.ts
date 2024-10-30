export type IBagStatus = {
  build: "PENDING" | "SEPARATED";
  send: "SEPARATED" | "DISPATCHED" | "RECEIVED" | "DEFERRED";
}

export type SendStatus = Array<"SEPARATED" | "DISPATCHED" | "RECEIVED" | "DEFERRED">;
export type BuildStatus = Array<"PENDING" | "SEPARATED">;