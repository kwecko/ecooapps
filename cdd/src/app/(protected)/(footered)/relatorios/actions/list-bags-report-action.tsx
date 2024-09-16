import { ListBagsReport } from "@cdd/app/_actions/report/list-bags-report";
import { useHandleError } from "@shared/hooks/useHandleError"
import { toast } from "sonner";

export async function ListBagsReportAction(cycle_id: string){
  const { handleError } = useHandleError()

  await ListBagsReport(cycle_id)
    .then((response) => {
      if (response.message) {
        const messageError = response.message as string
        console.log(messageError)

        handleError(messageError)

      } else if (response.data) {
        console.log(response.data)

        return;
      }
    })
    .catch((error) => {
      toast.error(error)
    })
}