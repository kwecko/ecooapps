import { InfoIconModalProps } from "@shared/components/InfoIconModal";

export type AdminReportActions = "sales";

export type AdminReportConfigType = "cycle" | "market";

export type ReportActions =
  | "list-bags"
  | "list-bags-withdrawn"
  | "list-offers"
  | "cash-flow-cdd"
  | "cash-flow-producer"
  | "offer-history"
  | "fetch-inbound";

type ReportButtonType = {
  name: string;
  onClick: ReportActions;
  disabled: boolean;
};

export type ReportButtonData = ReportButtonType[];

export interface ReportButton extends ReportButtonType {
  information?: InfoIconModalProps;
}
