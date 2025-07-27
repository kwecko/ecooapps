import { ReportButton } from "@shared/types/report/index";

interface ReportButtonProps extends ReportButton {}

export const reportButtonData: ReportButtonProps[] = [
  {
    name: "Lista de Entregas",
    onClick: "list-bags",
    disabled: false,
    information: {
      title: "Lista de Entregas",
      content: "Baixe o relatório de lista de entregas.",
    },
  },
  {
    name: "Retirada de Sacolas",
    onClick: "list-bags-withdrawn",
    disabled: false,
    information: {
      title: "Retirada de Sacolas",
      content: "Baixe o relatório de retirada de sacolas.",
    },
  },
  {
    name: "Recebimento de Ofertas",
    onClick: "fetch-inbound",
    disabled: false,
    information: {
      title: "Recebimento de Ofertas",
      content: "Baixe o relatório de recebimento de ofertas.",
    },
  },
];
