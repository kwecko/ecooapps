export type AdminReportActions = "sales";

export type ReportActions =
  | "list-bags"
  | "list-offers"
  | "cash-flow-cdd"
  | "cash-flow-producer"
  | "offer-history";

export type ReportButtonData = {
  name: string;
  onClick: ReportActions;
  disabled: boolean;
}[];
