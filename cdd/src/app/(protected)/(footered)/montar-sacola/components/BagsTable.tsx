"use client";

import { useEffect, useState } from "react";
import { FaBoxOpen, FaCheck } from "react-icons/fa6";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { listBags } from "@cdd/app/_actions/bag/list-bags";

import Button from "@shared/components/Button";
import { IBag } from "@shared/interfaces/bag"
import { useLocalStorage } from "@shared/hooks/useLocalStorage"
import Loader from "@shared/components/Loader";
import { useHandleError } from "@shared/hooks/useHandleError";
import { useDebounce } from "@shared/hooks/useDebounce";
import SearchInput from "@shared/components/SearchInput";
import { IBagStatus } from "../page";
import { twMerge } from "tailwind-merge";
import { HiDotsHorizontal } from "react-icons/hi";
import StatusFilterButtons from "@shared/components/StatusFilterButton";
import OrderTable from "@shared/components/OrderTable";

interface BagsProps {
  page: number;
  selectedStatus: IBagStatus;
  setSelectedStatus: (status: IBagStatus) => void;
}

export interface IStatus {
  name: string;
  key: string;
}

const statuses: IStatus[] = [
  { name: "Pendentes", key: "PENDING" },
  { name: "Separadas", key: "SEPARATED" }
];

export default function BagsTable({ page, selectedStatus, setSelectedStatus }: BagsProps) {
  const router = useRouter();

  const [bags, setBags] = useState<IBag[]>([]);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const debounceSearch = useDebounce(name)
  const { handleError } = useHandleError()
  const { getFromStorage } = useLocalStorage()

  const handleStatusFilterClick = (status: IStatus) => {
    setSelectedStatus({ status: status.key as IBagStatus["status"] });
  };

  useEffect(() => {
    setIsLoading(true);
    const cycle = getFromStorage("selected-cycle");

    if (!cycle) {
      toast.error("Selecione um ciclo para ver os pedidos!");
      setIsLoading(false);
      return;
    }

    const { id } = cycle;

    listBags({
      cycle_id: id,
      page,
      status: selectedStatus.status,
      name: debounceSearch,
    })
      .then((response) => {
        if (response.data) {
          setBags(response.data);
        } else {
          toast.error("Nenhuma sacola encontrada.");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        handleError(error);
        setIsLoading(false);
      });
  }, [page, debounceSearch, selectedStatus]);

  const handleClick = (id: string) => {
    router.push(`/montar-sacola/${id}`);
  };

  const getStatus = (
    status: IBagStatus["status"]
  ) => {
    const colorStatus = {
      PENDING: "bg-walnut-brown",
      SEPARATED: "bg-rain-forest",
    };

    return (
      <div
        className={twMerge(
          "flex justify-center items-center m-auto bg-rain-forest w-4 h-4 rounded-full",
          `${colorStatus[status]}`
        )}
      >
        {status === "PENDING" && <HiDotsHorizontal className="p-0.5" color="white" />}
        {status === "SEPARATED" && <FaCheck size={10} color="white" />}
      </div>
    );
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
            { detail: getStatus(bag.status as IBagStatus["status"]) },
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
            selectedStatus={selectedStatus.status}
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
