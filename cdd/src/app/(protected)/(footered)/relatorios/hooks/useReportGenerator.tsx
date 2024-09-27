import { toast } from "sonner";
import { ListBagsReport } from "@cdd/app/_actions/report/list-bags-report";
import { useHandleError } from "@shared/hooks/useHandleError";

export function useReportGenerator() {
  const { handleError } = useHandleError();

  const reportActions: Record<string, (id: string) => Promise<any>> = {
    "listar-sacolas": (id: string) => ListBagsReport(id),
    "listar-ofertas": () => {
      return Promise.resolve();
    },
    "cash-flow": () => {
      return Promise.resolve();
    },
  };

  const generateReport = async (type: string, id: string) => {
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
