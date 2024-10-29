"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { FaBoxOpen } from "react-icons/fa6";
import { useRouter } from "next/navigation";

import { listBags } from "@cdd/app/_actions/bag/list-bags";

import { IBag } from "@shared/interfaces/bag";
import Loader from "@shared/components/Loader";
import SearchInput from "@shared/components/SearchInput";
import { useDebounce } from "@shared/hooks/useDebounce";
import { useHandleError } from "@shared/hooks/useHandleError";
import { useLocalStorage } from "@shared/hooks/useLocalStorage";
import StatusFilterButtons from "@shared/components/StatusFilterButton";
import OrderTable from "@shared/components/OrderTable";
import { useGetStatus, EnviarStatus, StatusMap } from "@shared/hooks/useGetStatus"

interface BagsProps {
  page: number;
  setTotalItems: (total: number) => void;
}

export interface IStatus {
  name: string;
  key: string[];
}

const statuses: IStatus[] = [
  { name: "Todas", key: ["SEPARATED", "DISPATCHED", "RECEIVED", "DEFERRED"] },
  { name: "Separadas", key: ["SEPARATED"] },
  { name: "Enviadas", key: ["DISPATCHED"] },
  { name: "Entregues", key: ["RECEIVED"] },
  { name: "Retornadas", key: ["DEFERRED"] },
];

export default function SendBagTable({ page, setTotalItems }: BagsProps) {
  const router = useRouter();

  const { getStatus } = useGetStatus();

  const [bags, setBags] = useState<IBag[]>([]);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<EnviarStatus>(
    statuses[0].key as EnviarStatus
  );

  const debounceSearch = useDebounce(name);
  const { handleError } = useHandleError();
  const { getFromStorage } = useLocalStorage();

  const handleStatusFilterClick = (status: IStatus) => {
    setSelectedStatus(status.key as EnviarStatus);
  };

  useEffect(() => {
    (() => {
      setIsLoading(true)
      const cycle= getFromStorage("selected-cycle");

      if (!cycle) {
        toast.error("Selecione um ciclo para montar uma sacola!");
        return;
      }

      const { id } = cycle

      console.log(selectedStatus)

      listBags({
        cycle_id: id,
        page,
        statuses: selectedStatus,
        name: debounceSearch
      })
        .then((response) => {
          if (response.message) {
            handleError(response.message)
          } else if (response.data) {
            setBags(response.data);
            setTotalItems(response.data.length)
            setIsLoading(false);
            return;
          }
        })
        .catch(() => {
          toast.error("Erro desconhecido.")
        })
    })();
  }, [page, debounceSearch, selectedStatus]);

  const handleClick = (id: string) => {
    router.push(`/enviar-sacola/${id}`);
  };

  const headers = [
    { label: "Código", style: "w-[30%]" },
    { label: "Cliente", style: "w-1/2" },
    { label: "Status", style: "w-1/5 text-center" },
  ];

  const info =

  bags.length > 0
    ? bags.map((bag) => ({
      id: bag.id,
      data: [
        { detail: bag.id },
        { detail: `${bag.user.first_name} ${bag.user.last_name}` },
        { detail: getStatus({ type: 'enviar', status: bag.status as StatusMap["enviar"]}) },
      ],
    }))
  : [];

  return (
    <div className="w-full h-full flex flex-col">
      <div className="sticky top-0 bg-default z-10">
        <div className="w-full flex gap-2 items-center mt-4 mb-4">
          <SearchInput onChange={setName} />
        </div>
        <StatusFilterButtons
          statuses={statuses}
          selectedStatus={selectedStatus}
          handleStatusFilterClick={handleStatusFilterClick}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center mt-3">
          <Loader className="mt-3" loaderType="component" />
        </div>
      ) : !isLoading && bags.length === 0 ? (
        <div className="flex flex-col justify-center gap-1 items-center mt-3 text-slate-gray">
          <FaBoxOpen className="text-walnut-brown" size={64} />
          <span className="text-center w-52">Nenhuma sacola encontrada!</span>
        </div>
      ) : (
        <div className="overflow-y-auto h-full">
          <OrderTable headers={headers} info={info} onRowClick={handleClick} />
        </div>
      )}
    </div>
  );
}
