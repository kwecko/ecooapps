import { toast } from "sonner";

import { ReportActions } from "@shared/types/report";
import { useHandleError } from "@shared/hooks/useHandleError";
import { ListBagsReport } from "@shared/_actions/report/list-bags-report";

export function useReportGenerator() {
  const { handleError } = useHandleError();

  const reportActions: Record<ReportActions, (id: string) => Promise<any>> = {
    "list-bags": (id: string) => ListBagsReport(id),
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
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `relatorio-${type}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      toast.error("Erro desconhecido.");
    }
  };

  return { generateReport };
}
