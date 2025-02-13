import { ReportButtonData } from "@shared/types/report/index";

export const reportButtonData: ReportButtonData = [
  {
    name: "Lista de Entregas",
    onClick: 'list-bags',
    disabled: false
  },
  {
    name: "Retirada de Sacolas",
    onClick: "list-bags-withdrawn",
    disabled: false
  },
  {
    name: "Recebimento de Ofertas",
    onClick: "fetch-inbound",
    disabled: false
  },
];