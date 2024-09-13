"use client";

import { useRouter } from "next/navigation";
import { fecthFarmsWithOrders } from "@cdd/app/_actions/farm/fetch-farm-with-orders";
import dayjs from "dayjs";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { HiOutlineSearch } from "react-icons/hi";
import Loader from "@shared/components/Loader";
import { Boxes } from "@shared/interfaces/farm";
import { useHandleError } from "@shared/hooks/useHandleError";
import { useLocalStorage } from "@shared/hooks/useLocalStorage";

import StatusFilterButtons from "./StatusFilterButton";
import { twMerge } from "tailwind-merge";

interface FarmsProps {
  page: number;
}

export interface IStatus {
  name: string;
  key: string;
}

const styles = {
  itemHeader:
    "truncate w-[30%] text-[#979797] font-inter border-b border-theme-background p-2 text-xs font-semibold text-center",
  itemBody: "border-b-[1px] truncate text-[#545F71] px-2 py-3",
};

export function FarmWithOrdersTable({ page }: FarmsProps) {
  const router = useRouter();

  const statuses: IStatus[] = [
    {
      name: "Todas",
      key: "ALL"
    },
    {
      name: "Pendentes",
      key: "PENDING"
    },
    {
      name: "Concluídas",
      key: "RECEIVED"
    },
    {
      name: "Rejeitadas",
      key: "CANCELLED"
    }
  ];

  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [isLoading, setIsLoading] = useState(false);
  const [farms, setFarms] = useState<Boxes[]>([]);
  const [farmsFiltered, setFarmFiltered] = useState<Boxes[]>([])
  const [name, setName] = useState("");

  const { handleError } = useHandleError();
  const { getFromStorage } = useLocalStorage();

  const handleStatusFilterClick = (status: IStatus) => {
    if (selectedStatus === status.key || status.key === "ALL") {
      setSelectedStatus("ALL");
      setFarmFiltered(farms);
      return;
    }

    setFarmFiltered(() => farms.filter((item => item.status === status.key)))
    setSelectedStatus(status.key);
  };

  const handleChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      setName(e.target.value);
    }, 300);
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

      await fecthFarmsWithOrders({
        cycle_id: id,
        page,
        name,
      })
        .then((response: any) => {
          if (response.message) {
            const messageError = response.message as string;
            handleError(messageError);
          } else if (response.data) {
            setFarms(response.data);
            setFarmFiltered(response.data)
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
  }, [page, name]);

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

  const getStatus = (status: "PENDING" | "CANCELLED" | "RECEIVED") => {
    const colorStatus = {
      PENDING: "bg-battleship-gray",
      CANCELLED: "bg-error",
      RECEIVED: "bg-rain-forest"
    }

    return (
      <div
        className={
          twMerge('flex justify-center items-center m-auto bg-rain-forest w-4 h-4 p-1 rounded-full',
            `${colorStatus[status]}`
          )}
      >
        <span className="text-white text-xs" />
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div>
        <div className="w-full flex gap-2 items-center mt-4 mb-4">
          <div className="w-full relative">
            <form>
              <input
                onChange={handleChangeSearchInput}
                className="border border-french-gray active:border-none rounded-md h-12 p-4 pr-10 text-base inter-font w-full"
                type="text"
              />
              <button disabled>
                <HiOutlineSearch
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500"
                  size={24}
                />
              </button>
            </form>
          </div>
        </div>
        <StatusFilterButtons
          statuses={statuses}
          selectedStatus={selectedStatus}
          handleStatusFilterClick={(status) => handleStatusFilterClick(status)}
        />
      </div>
      {isLoading ? (
        <Loader className="w-8 h-8 border-walnut-brown mt-3" />
      ) : isLoading && farmsFiltered?.length === 0 ? (
        <span className="text-center mt-3 text-slate-gray">
          {name === ""
            ? "Ainda não há pedidos."
            : "Nenhum produtor encontrado."}
        </span>
      ) : (
        <table className="bg-white text-theme-primary text-left leading-7 w-full table-fixed rounded-lg mb-4 overflow-y-hidden">
          <thead className="w-full">
            <tr className="text-[rgb(84,95,113)]">
              <th className={twMerge("w-[30%]", styles.itemHeader)}>Prazo</th>
              <th className={twMerge("w-1/2", styles.itemHeader)}>Produtor</th>
              <th className={twMerge("w-1/5", styles.itemHeader)}>Status</th>
            </tr>
          </thead>
          <tbody>
            {farmsFiltered?.map((farm) => (
              <tr key={farm.id} onClick={() => handleClick(farm.id)} className="text-center cursor-pointer">
                <td onClick={getNextSaturdayDate} className={styles.itemBody}>{getNextSaturdayDate()}</td>
                <td className={styles.itemBody}>{farm.catalog.farm.name}</td>
                <td className={styles.itemBody}>{getStatus(farm.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
