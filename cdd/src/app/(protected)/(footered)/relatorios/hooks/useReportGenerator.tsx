import { toast } from "sonner";
import { ListBagsReport } from "@cdd/app/_actions/report/list-bags-report";
import { useHandleError } from "@shared/hooks/useHandleError";

export function useReportGenerator() {
  const { handleError } = useHandleError();

  const generateReport = async (type: string, id: string) => {
    try {
      let response;

      switch (type) {
        case "listar-sacolas":
          response = await ListBagsReport(id);
          break;
        case "listar-ofertas":
          console.log("listar-ofertas")
          break;
        case "cash-flow":
          console.log("cash-flow")
          break;
        default:
          toast.error("Tipo de relatório desconhecido.");
          return;
      }

      if (response.message) {
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
