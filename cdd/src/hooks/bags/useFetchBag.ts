import {
  fetchBag as fetchBagAction,
  FetchBagRequest,
} from "@cdd/app/_actions/bags/GET/fetch-bag";
import { useHandleError } from "@shared/hooks/useHandleError";
import { BagDTO } from "@shared/interfaces/dtos";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface UseFetchBagProps extends FetchBagRequest {}

export default function useFetchBag({ bag_id, page }: UseFetchBagProps) {
  const [data, setData] = useState<BagDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { handleError } = useHandleError();

  const fetchBag = async () => {
    await fetchBagAction({
      bag_id,
      page,
    })
      .then((response: any) => {
        if (response.message) {
          const messageError = response.message as string;
          handleError(messageError);
        } else if (response.data) {
          setData(response.data);
          return;
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  useEffect(() => {
    fetchBag().finally(() => {
      setIsLoading(false);
    });
  }, [bag_id, page]);

  return { data, isLoading, fetchBag };
}
