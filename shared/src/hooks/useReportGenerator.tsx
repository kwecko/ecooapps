import { toast } from "sonner";

import { printDeliveriesReport } from "@shared/_actions/bags/GET/print-deliveries-report";
import { fetchSalesReport } from "@shared/_actions/bags/GET/fetch-sales-report";

import { useHandleError } from "@shared/hooks/useHandleError";
import { AdminReportActions, ReportActions } from "@shared/types/report";

export function useReportGenerator() {
  const { handleError } = useHandleError();

  const adminReportActions: Record<
    AdminReportActions,
    (date_from?: string, date_to?: string) => Promise<any>
  > = {
    sales: (date_from?: string, date_to?: string) =>
      fetchSalesReport({ date_from, date_to }),
  };

  const reportActions: Record<ReportActions, (id: string) => Promise<any>> = {
    "list-bags": (id: string) => printDeliveriesReport({ cycle_id: id }),
    "list-offers": () => {
      return Promise.resolve();
    },
    "cash-flow-cdd": () => {
      return Promise.resolve();
    },
    "cash-flow-producer": () => {
      return Promise.resolve();
    },
    "offer-history": () => {
      return Promise.resolve();
    },
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
      }
    } catch (error) {
      toast.error("Erro desconhecido.");
    }
  };

  const generateReport = async (type: ReportActions, id: string) => {
    try {
      const action = reportActions[type];

      if (!action) {
        toast.error("Tipo de relatório desconhecido.");
        return;
      }

      const response = await action(id);

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
    } catch (error) {
      toast.error("Erro desconhecido.");
    }
  };

  return { generateAdminReport, generateReport };
}
