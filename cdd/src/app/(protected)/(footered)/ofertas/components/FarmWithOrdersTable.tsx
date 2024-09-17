"use client";

import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { FaCheck } from "react-icons/fa6";
import Loader from "@shared/components/Loader";
import { Boxes } from "@shared/interfaces/farm";
import { useHandleError } from "@shared/hooks/useHandleError";
import { useLocalStorage } from "@shared/hooks/useLocalStorage";

import StatusFilterButtons from "./StatusFilterButton";
import { twMerge } from "tailwind-merge";
import Table from "./table";
import { getBoxesWithOrders } from "@cdd/app/_actions/box/get-boxes-with-orders";
import SearchInput from "@shared/components/SearchInput";
import { useDebounce } from "@shared/hooks/useDebounce";

interface FarmsProps {
  page: number;
}

export interface IStatus {
  name: string;
  key: string;
}

const classes = {
  header:
    "truncate w-[30%] text-[#979797] font-inter border-b border-theme-background p-2 text-xs font-semibold text-center",
  body: "border-b-[1px] truncate text-[#545F71] px-2 py-3",
};

export function FarmWithOrdersTable({ page }: FarmsProps) {
  const router = useRouter();

  const statuses: IStatus[] = [
    {
      name: "Todas",
      key: "ALL",
    },
    {
      name: "Pendentes",
      key: "PENDING",
    },
    {
      name: "Aprovadas",
      key: "VERIFIED",
    },
    {
      name: "Rejeitadas",
      key: "CANCELLED",
    },
  ];

  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [isLoading, setIsLoading] = useState(false);
  const [farms, setFarms] = useState<Boxes[]>([]);
  const [farmsFiltered, setFarmFiltered] = useState<Boxes[]>([]);
  const [name, setName] = useState("");

  const { handleError } = useHandleError();
  const { getFromStorage } = useLocalStorage();
  const debounceSearch = useDebounce(name, 1000)

  const handleStatusFilterClick = (status: IStatus) => {
    if (selectedStatus === status.key || status.key === "ALL") {
      setSelectedStatus("ALL");
      setFarmFiltered(farms);
      return;
    }

    setFarmFiltered(() => farms.filter((item) => item.status === status.key));
    setSelectedStatus(status.key);
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const cycle = getFromStorage("selected-cycle");

      if (!cycle) {
        toast.error("Selecione um ciclo para ver os pedidos!");
        return;
      }

      const { id } = cycle;

      await getBoxesWithOrders({
        cycle_id: id,
        page,
        name: debounceSearch,
      })
        .then((response: any) => {
          if (response.message) {
            const messageError = response.message as string;
            handleError(messageError);
          } else if (response.data) {
            setFarms(response.data);
            setFarmFiltered(response.data);
            return;
          }
        })
        .catch(() => {
          toast.error("Erro desconhecido.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    })();
  }, [page, debounceSearch]);

  const getNextSaturdayDate = () => {
    const today = dayjs();
    const dayOfWeek = dayjs().get("day") + 1;

    const daysUntilSaturday = 7 - dayOfWeek;
    const nextSaturday = today.add(daysUntilSaturday, "day");

    return nextSaturday.format("DD/MM/YYYY");
  };

  const handleClick = (id: string) => {
    const path = `/ofertas/${id}`;
    router.push(path);
  };

  const getStatus = (status: "PENDING" | "CANCELLED" | "VERIFIED") => {
    const colorStatus = {
      PENDING: "bg-battleship-gray",
      CANCELLED: "bg-error",
      VERIFIED: "bg-rain-forest",
    };

    return (
      <div
        className={twMerge(
          "flex justify-center items-center m-auto bg-rain-forest w-4 h-4 p-1 rounded-full",
          `${colorStatus[status]}`
        )}
      >
        {status === 'VERIFIED' && (<FaCheck color="white" />)}
      </div>
    );
  };

  const headers = [
    { label: 'Prazo', style: 'w-[30%]' },
    { label: 'Produtor', style: 'w-1/2' },
    { label: 'Status', style: 'w-1/5 text-center' },
  ];

  const info = farmsFiltered?.map((farm) => ({
    id: farm.id,
    data: [
      { detail: getNextSaturdayDate() },  // Prazo
      { detail: farm.catalog.farm.name },  // Produtor
      { detail: getStatus(farm.status) },  // Status
    ]
  }));

  return (
    <div className="w-full h-full flex flex-col">
      <div>
        <div className="w-full flex gap-2 items-center mt-4 mb-4">
          <SearchInput onChange={setName} />
        </div>
        <StatusFilterButtons
          statuses={statuses}
          selectedStatus={selectedStatus}
          handleStatusFilterClick={(status) => handleStatusFilterClick(status)}
        />
      </div>

      {isLoading && <Loader className="mt-3" appId="CDD" loaderType="component" />}

      {farmsFiltered?.length === 0 && (
        <span className="text-center mt-3 text-slate-gray">
          {name === ""
            ? "Ainda não há pedidos."
            : "Nenhum produtor encontrado."}
        </span>
      )}

      {farmsFiltered && (
        <Table
          headers={headers}
          info={info}
          onRowClick={handleClick}
        />
      )}
    </div>
  );
}
