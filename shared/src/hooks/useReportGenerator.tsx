import { toast } from "sonner";

import { printDeliveriesReport } from "@shared/_actions/bags/GET/print-deliveries-report";
import { printOffersReport } from "@shared/_actions/bags/GET/print-offers-report";

import { useHandleError } from "@shared/hooks/useHandleError";
import { AdminReportActions, ReportActions } from "@shared/types/report";
import { fetchSalesReport } from "@shared/_actions/bags/GET/fetch-sales-report";
import { fetchInboundReports } from "@shared/_actions/bags/GET/fetch-inbound-report";

export function useReportGenerator() {
  const { handleError } = useHandleError();

  const adminReportActions: Record<
    AdminReportActions,
    (date_from?: string, date_to?: string) => Promise<any>
  > = {
    sales: (date_from?: string, date_to?: string) =>
      fetchSalesReport({ date_from, date_to }),
  };

  const reportActions: Record<
    ReportActions,
    (id: string, since?: string, before?: string) => Promise<any>
  > = {
    "list-bags": (id: string) =>
      printDeliveriesReport({ cycle_id: id, type: "pdf" }),
    "list-bags-withdrawn": (id: string) =>
      printDeliveriesReport({ cycle_id: id, withdraw: true, type: "pdf" }),
    "cash-flow-cdd": (id: string) => printOffersReport({ cycle_id: id }),
    "list-offers": () => {
      return Promise.resolve();
    },
    "cash-flow-producer": () => {
      return Promise.resolve();
    },
    "offer-history": () => {
      return Promise.resolve();
    },
    "fetch-inbound": (id: string, since?: string, before?: string) =>
      fetchInboundReports({ cycle_id: id, since, before }),
  };

  const generateAdminReport = async (
    type: AdminReportActions,
    date_from?: string,
    date_to?: string
  ) => {
    try {
      const action = adminReportActions[type];

      if (!action) {
        toast.error("Tipo de relatório desconhecido.");
        return;
      }

      const response = await action(date_from, date_to);

      if (response?.message) {
        const messageError = response.message as string;
        handleError(messageError);
      } else {
        const buffer = Buffer.from(response.data);

        const blob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `relatorio-${type}.xlsx`;
        link.click();
        toast.success("Relatório gerado com sucesso.");
      }
    } catch (error) {
      toast.error("Erro desconhecido.");
    }
  };

  const generateReport = async (
    type: ReportActions,
    id: string,
    since?: string,
    before?: string
  ) => {
    try {
      const action = reportActions[type];

      if (!action) {
        toast.error("Tipo de relatório desconhecido.");
        return;
      }

      const response = await action(id, since, before);

      if (response?.message) {
        const messageError = response.message as string;
        handleError(messageError);
      } else {
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `relatorio-${type}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      toast.success("Relatório gerado com sucesso.");
    } catch (error) {
      toast.error("Erro desconhecido.");
    }
  };

  return { generateAdminReport, generateReport };
}
