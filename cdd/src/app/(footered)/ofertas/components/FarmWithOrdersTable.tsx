"use client";

import { useRouter } from "next/navigation";
import { fecthFarmsWithOrders } from "@cdd/app/_actions/farm/fetch-farm-with-orders";
import dayjs from "dayjs";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { HiOutlineSearch, HiX } from "react-icons/hi";
import { useGetLocalStorage } from "@cdd/app/hooks/useGetLocalStorage";
import Loader from "@shared/components/Loader";
import { Farm } from "@cdd/interfaces/farm";
import { useHandleError } from "@cdd/app/hooks/useHandleError";

interface FarmsProps {
  page: number;
}

export function FarmWithOrdersTable({ page }: FarmsProps) {
  const router = useRouter();

  const [farms, setFarms] = useState<Farm[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("todos");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { handleError } = useHandleError()

  const handleStatusFilterClick = (status: string) => {
    setSelectedStatus(status);
  };

  const handleChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      setName(e.target.value);
    }, 300);
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const cycle = useGetLocalStorage("selected-cycle");

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
        .then((response) => {
          if (response.message) {
            const messageError = response.message as string

            handleError(messageError)
          } else if (response.data) {
            setFarms(response.data);
            setIsLoading(false);
            return;
          }
        })
        .catch(() => {
          toast.error("Erro desconhecido.")
        })
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
        <div className="w-full flex gap-2 mb-4 flex-wrap">
          <button
            disabled
            onClick={() => handleStatusFilterClick("Todas")}
            className={`${selectedStatus === "Todas"
                ? "bg-[#3E5055] text-sm text-white font-semibold px-2 rounded-[0.25rem] flex items-center h-[22px]"
                : "bg-[#979797] text-sm text-white font-semibold px-2 rounded-[0.25rem] flex items-center h-[22px]"
              }`}
          >
            Todas
            {selectedStatus === "Todas" && <HiX className="ml-1" />}
          </button>
          <button
            disabled
            onClick={() => handleStatusFilterClick("Pendente")}
            className={`${selectedStatus === "Pendente"
                ? "bg-[#3E5055] text-sm text-white font-semibold px-2 rounded-[0.25rem] flex items-center h-[22px]"
                : "bg-[#979797] text-sm text-white font-semibold px-2 rounded-[0.25rem] flex items-center h-[22px]"
              }`}
          >
            Pendentes
            {selectedStatus === "Pendente" && <HiX className="ml-1" />}
          </button>
          <button
            disabled
            onClick={() => handleStatusFilterClick("Concluída")}
            className={`${selectedStatus === "Concluída"
                ? "bg-[#3E5055] text-sm text-white font-semibold px-2 rounded-[0.25rem] flex items-center h-[22px]"
                : "bg-[#979797] text-sm text-white font-semibold px-2 rounded-[0.25rem] flex items-center h-[22px]"
              }`}
          >
            Concluídas
            {selectedStatus === "Concluída" && <HiX className="ml-1" />}
          </button>
          <button
            disabled
            onClick={() => handleStatusFilterClick("Rejeitada")}
            className={`${selectedStatus === "Rejeitada"
                ? "bg-[#3E5055] text-sm text-white font-semibold px-2 rounded-[0.25rem] flex items=center h-[22px]"
                : "bg-[#979797] text-sm text-white font-semibold px-2 rounded-[0.25rem] flex items-center h-[22px]"
              }`}
          >
            Rejeitadas
            {selectedStatus === "Rejeitada" && <HiX className="ml-1" />}
          </button>
        </div>
      </div>
      {isLoading ? (
        <Loader className="w-8 h-8 border-walnut-brown mt-3" />
      ) : !isLoading && farms.length === 0 ? (
        <span className="text-center mt-3 text-slate-gray">
          {name === "" ? "Ainda não há pedidos." : "Nenhum produtor encontrado."}
        </span>
      ) : (
        <table className="bg-white text-theme-primary text-left leading-7 w-full table-fixed rounded-lg mb-4 overflow-y-hidden">
          <thead className="w-full">
            <tr className="text-[rgb(84,95,113)]">
              <th className="truncate w-[30%] text-[#979797] font-inter border-b border-theme-background p-2 text-xs font-semibold text-center">
                Prazo
              </th>
              <th className="truncate w-1/2 text-[#979797] font-inter border-b border-theme-background p-2 text-xs font-semibold text-center">
                Produtor
              </th>
              <th className="truncate w-1/5 text-[#979797] font-inter border-b border-theme-background p-2 text-xs font-semibold text-center">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {farms.map((farm) => (
              <tr
                onClick={() => handleClick(farm.id)}
                key={farm.admin_id}
                className="text-center cursor-pointer"
              >
                <td
                  onClick={getNextSaturdayDate}
                  className="border-b-[1px] truncate text-[#545F71] px-2 py-3"
                >
                  {getNextSaturdayDate()}
                </td>
                <td className="border-b-[1px] truncate text-[#545F71] px-2 py-3">
                  {farm.name}
                </td>
                <td className="border-b-[1px] truncate text-[#545F71] px-2 py-3">
                  #
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
