import {
  listBoxes as listBoxesAction,
  ListBoxesRequest,
} from '@cdd/app/_actions/boxes/GET/list-boxes';
import { useHandleError } from '@shared/hooks/useHandleError';
import { useLocalStorage } from '@shared/hooks/useLocalStorage';
import { BoxDTO } from '@shared/interfaces/dtos';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface UseListBoxesProps {
  page: number;
  farm?: string;
  since?: string;
}

export default function useListBoxes({ page, farm, since }: UseListBoxesProps) {
  const [data, setData] = useState<BoxDTO[]>([] as BoxDTO[]);
  const [isLoading, setIsLoading] = useState(false);
  const { handleError } = useHandleError();
  const { getFromStorage } = useLocalStorage();

  const listBoxes = async () => {
    setIsLoading(true);
    const cycle = getFromStorage('selected-cycle');

    if (!cycle) {
      toast.error('Selecione um ciclo para ver os pedidos!');
      return;
    }

    const { id } = cycle;

    await listBoxesAction({
      page: page,
      farm: farm,
      cycle_id: id,
      since: since,
    }).then((response) => {
      if (response.message) {
        handleError(response.message);
      }
      setData(response.data);
    });
  };

  useEffect(() => {
    listBoxes().finally(() => {
      setIsLoading(false);
    });
  }, [page, farm]);

  const updateData = (newData: BoxDTO[]) => {
    setData(newData);
  };

  return { data, updateData, isLoading };
}
