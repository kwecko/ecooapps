"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { FaBoxOpen } from "react-icons/fa6";
import { useRouter } from "next/navigation";

import { listBags } from "@cdd/app/_actions/bag/list-bags";

import Table from "@shared/components/Table";
import { IBag } from "@shared/interfaces/bag";
import Loader from "@shared/components/Loader";
import SearchInput from "@shared/components/SearchInput";
import { useDebounce } from "@shared/hooks/useDebounce";
import { useHandleError } from "@shared/hooks/useHandleError";
import { useLocalStorage } from "@shared/hooks/useLocalStorage"
import { useGetStatus, EnviarStatus } from "@shared/hooks/useGetStatus"

interface BagsProps {
  page: number;
  setTotalItems: (total: number) => void;
}

export default function SendBagTable({ page, setTotalItems }: BagsProps) {
  const router = useRouter();

  const { getStatus } = useGetStatus();

  const [name, setName] = useState("");
  const [bags, setBags] = useState<IBag[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const debounceSearch = useDebounce(name)
  const { handleError } = useHandleError()
  const { getFromStorage } = useLocalStorage()

  useEffect(() => {
    (() => {
      setIsLoading(true);
      const cycle = getFromStorage("selected-cycle");

      if (!cycle) {
        toast.error("Selecione um ciclo para ver os pedidos!");
        return;
      }

      const { id } = cycle

      listBags({
        cycle_id: id,
        page,
        status: "SEPARATED",
        name: debounceSearch
      })
        .then((response) => {
          if (response.message) {
            console.log(response.message)

            handleError(response.message)
          } else if (response.data) {
            setBags(response.data);
            return;
          }
        })
        .catch(() => {
          toast.error("Erro desconhecido.")
        })

      listBags({
        cycle_id: id,
        page,
        status: "DISPATCHED",
        name: debounceSearch
      })
        .then((response) => {
          if (response.message) {
            const messageError = response.message as string

            handleError(messageError)
          } else if (response.data) {
            setBags(prevBags => [...prevBags, ...response.data]);
            setIsLoading(false);
            setTotalItems(bags.length)
            return;
          }
        })
        .catch(() => {
          toast.error("Erro desconhecido.")
        })
    })();
  }, [page, debounceSearch]);

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
          { detail: bag.id }, // Código
          { detail: bag.user.first_name }, // Cliente
          { detail: getStatus({ type: 'enviar', status: bag.status as EnviarStatus }) }, // Status
        ],
      }))
    : [];

  return (
    <div className="w-full h-full flex flex-col">
      <div>
        <div className="w-full flex gap-2 items-center mt-4 mb-4">
          <SearchInput onChange={setName} />
        </div>
      </div>
      {isLoading ? (
        <Loader
          className="mt-3"
          loaderType="component"
        />
      ) : !isLoading && bags.length === 0 ? (
        <div className="flex flex-col justify-center gap-1 items-center mt-3 text-slate-gray">
          <FaBoxOpen className="text-walnut-brown" size={64} />
          <span className="text-center w-52">Nenhuma sacola encontrada!</span>
        </div>
      ) : (
        <Table headers={headers} info={info} onRowClick={handleClick} />
      )}
    </div>
  );
}
