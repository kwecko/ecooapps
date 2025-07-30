import { ReportButton } from "@shared/types/report/index";

interface ReportButtonProps extends ReportButton {}

export const reportButtonData: ReportButtonProps[] = [
  {
    name: "Lista de Entregas",
    onClick: "list-bags",
    disabled: false,
    information: {
      title: "Lista de entregas",
      content:
        "Este relatório exibe os endereços de entrega das sacolas, agrupados por bairros, para auxiliar o serviço dos entregadores.",
    },
  },
  {
    name: "Retirada de Sacolas",
    onClick: "list-bags-withdrawn",
    disabled: false,
    information: {
      title: "Retirada de sacolas",
      content:
        "Este relatório exibe a listagem das sacolas dos clientes que optaram pela retirada presencial em uma unidade e-COO.",
    },
  },
  {
    name: "Recebimento de Ofertas",
    onClick: "fetch-inbound",
    disabled: false,
    information: {
      title: "Recebimento de ofertas",
      content:
        "Este relatório exibe todas as ofertas com status pendente para serem verificadas pelo agente da unidade e-COO.",
    },
  },
];
