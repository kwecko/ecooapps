"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { listCurrentBags } from "@cdd/_actions/bags/GET/list-current-bags";

import { BagStatus, SendStatus } from "@shared/types/bag-status";

import EmptyBox from "@shared/components/EmptyBox";
import Loader from "@shared/components/Loader";
import OrderTable from "@shared/components/OrderTable";
import SearchInput from "@shared/components/SearchInput";
import StatusFilterButtons from "@shared/components/StatusFilterButton";
import { useDebounce } from "@shared/hooks/useDebounce";
import { useGetStatus } from "@shared/hooks/useGetStatus";
import { useHandleError } from "@shared/hooks/useHandleError";
import { useLocalStorage } from "@shared/hooks/useLocalStorage";
import { BagDTO } from "@shared/interfaces/dtos";

interface BagsProps {
  page: number;
  setTotalItems: (total: number) => void;
}

type FilterStatus = {
  name: string;
  key: string[];
};

const statuses: FilterStatus[] = [
  { name: "Todas", key: ["SEPARATED", "DISPATCHED", "RECEIVED", "DEFERRED"] },
  { name: "Separadas", key: ["SEPARATED"] },
  { name: "Enviadas", key: ["DISPATCHED"] },
  { name: "Entregues", key: ["RECEIVED"] },
  { name: "Retornadas", key: ["DEFERRED"] },
];

export default function SendBagTable({ page, setTotalItems }: BagsProps) {
  const router = useRouter();

  const { getStatus } = useGetStatus();

  const [bags, setBags] = useState<BagDTO[]>([]);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<SendStatus>(
    statuses[0].key as SendStatus
  );

  const debounceSearch = useDebounce(name);
  const { handleError } = useHandleError();
  const { getFromStorage } = useLocalStorage();

  const handleStatusFilterClick = (status: FilterStatus) => {
    if (selectedStatus === status.key) {
      setSelectedStatus(statuses[0].key as SendStatus);
      return;
    }
    setSelectedStatus(status.key as SendStatus);
  };

  useEffect(() => {
    (() => {
      setIsLoading(true);
      const cycle = getFromStorage("selected-cycle");

      if (!cycle) {
        toast.error("Selecione um ciclo para montar uma sacola!");
        return;
      }

      const { id } = cycle;

      listCurrentBags({
        cycle_id: id,
        page,
        statuses: selectedStatus,
        name: debounceSearch,
      })
        .then((response) => {
          if (response.message) {
            handleError(response.message);
          } else if (response.data) {
            setBags(response.data);
            setTotalItems(response.data.length);
            setIsLoading(false);
            return;
          }
        })
        .catch(() => {
          toast.error("Erro desconhecido.");
        });
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
            {
              detail: getStatus({
                type: "enviar",
                status: bag.status as BagStatus["send"],
              }),
            },
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
        <Loader className="mt-3" loaderType="component" />
      ) : debounceSearch && bags.length === 0 ? (
        <EmptyBox type="search" />
      ) : bags.length === 0 ? (
        <EmptyBox type="box" />
      ) : (
        <div className="overflow-y-auto h-full">
          <OrderTable headers={headers} info={info} onRowClick={handleClick} />
        </div>
      )}
    </div>
  );
}
