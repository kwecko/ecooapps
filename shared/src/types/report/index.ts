export type AdminReportActions = "sales";

export type ReportActions =
  | "list-bags"
  | "list-bags-withdrawn"
  | "list-offers"
  | "cash-flow-cdd"
  | "cash-flow-producer"
  | "offer-history"
  | "fetch-inbound";

export type ReportButtonData = {
  name: string;
  onClick: ReportActions;
  disabled: boolean;
}[];