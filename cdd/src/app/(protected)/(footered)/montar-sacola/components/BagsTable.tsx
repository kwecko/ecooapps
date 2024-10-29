"use client";

import { useEffect, useState } from "react";
import { FaBoxOpen } from "react-icons/fa6";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { listBags } from "@cdd/app/_actions/bag/list-bags";

import { IBag } from "@shared/interfaces/bag"
import Loader from "@shared/components/Loader";
import { useDebounce } from "@shared/hooks/useDebounce";
import SearchInput from "@shared/components/SearchInput";
import StatusFilterButtons from "@shared/components/StatusFilterButton";
import OrderTable from "@shared/components/OrderTable";
import { useHandleError } from "@shared/hooks/useHandleError";
import { useLocalStorage } from "@shared/hooks/useLocalStorage";
import { useGetStatus, MontarStatus, StatusMap } from "@shared/hooks/useGetStatus"

interface BagsProps {
  page: number;
  setTotalItems: (total: number) => void;
}

export interface IStatus {
  name: string;
  key: string[];
}

const statuses: IStatus[] = [
  { name: "Todas", key: ["PENDING", "SEPARATED"] },
  { name: "Pendentes", key: ["PENDING"] },
  { name: "Separadas", key: ["SEPARATED"] }
];

export default function BagsTable({ page, setTotalItems }: BagsProps) {
  const router = useRouter();

  const { getStatus } = useGetStatus();

  const [bags, setBags] = useState<IBag[]>([]);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<MontarStatus>(
    statuses[0].key as MontarStatus
  );

  const debounceSearch = useDebounce(name)
  const { handleError } = useHandleError()
  const { getFromStorage } = useLocalStorage()

  const handleStatusFilterClick = (status: IStatus) => {
    setSelectedStatus(status.key as MontarStatus);
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
    router.push(`/montar-sacola/${id}`);
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
            { detail: getStatus({ type: 'montar', status: bag.status as StatusMap["montar"]}) },
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
