"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { listBags } from "@cdd/app/_actions/bag/list-bags";

import { IBag } from "@shared/interfaces/bag"
import { BuildStatus, IBagStatus } from "@shared/interfaces/bag-status"

import Loader from "@shared/components/Loader";
import { useDebounce } from "@shared/hooks/useDebounce";
import SearchInput from "@shared/components/SearchInput";
import StatusFilterButtons from "@shared/components/StatusFilterButton";
import OrderTable from "@shared/components/OrderTable";
import { useHandleError } from "@shared/hooks/useHandleError";
import { useLocalStorage } from "@shared/hooks/useLocalStorage";
import EmptyBox from "@shared/components/EmptyBox";

import { useGetStatus } from "@shared/hooks/useGetStatus"

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
  const [selectedStatus, setSelectedStatus] = useState<BuildStatus>(
    statuses[0].key as BuildStatus
  );

  const debounceSearch = useDebounce(name)
  const { handleError } = useHandleError()
  const { getFromStorage } = useLocalStorage()

  const handleStatusFilterClick = (status: IStatus) => {
    if (selectedStatus === status.key) {
      setSelectedStatus(statuses[0].key as BuildStatus);
      return;
    }

    setSelectedStatus(status.key as BuildStatus);
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
            { detail: getStatus({ type: 'montar', status: bag.status as IBagStatus["build"]}) },
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
          <Loader
            className="mt-3"
            loaderType="component"
          />
        ) : debounceSearch && bags.length === 0 ? (
          <EmptyBox
            type="search"
          />
        ) : bags.length === 0 ? (
          <EmptyBox
            type="bag"
          />
        ) : (
          <OrderTable headers={headers} info={info} onRowClick={handleClick} />
        )}
      </div>
    );
}
