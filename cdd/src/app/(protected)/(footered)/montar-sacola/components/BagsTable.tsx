"use client";

import { useEffect, useState } from "react";
import { FaBoxOpen } from "react-icons/fa6";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { listBags } from "@cdd/app/_actions/bag/list-bags";

import Button from "@shared/components/Button";
import { Bag } from "@shared/interfaces/bag"
import { useLocalStorage } from "@shared/hooks/useLocalStorage"
import Loader from "@shared/components/Loader";
import { useHandleError } from "@shared/hooks/useHandleError";
import { useDebounce } from "@shared/hooks/useDebounce";
import SearchInput from "@shared/components/SearchInput";

interface BagsProps {
  page: number;
}

export default function BagsTable({ page }: BagsProps) {
  const router = useRouter();

  const [bags, setBags] = useState<Bag[]>([]);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const debounceSearch = useDebounce(name)
  const { handleError } = useHandleError()
  const { getFromStorage } = useLocalStorage()

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
        status: "PENDING",
        name: debounceSearch
      })
        .then((response) => {
          if (response.message) {
            const messageError = response.message as string

            handleError(messageError)
          } else if (response.data) {
            console.log(response.data)

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
        status: "SEPARATED",
        name: debounceSearch
      })
        .then((response) => {
          if (response.message) {
            const messageError = response.message as string

            handleError(messageError)
          } else if (response.data) {
            setBags(prevBags => [...prevBags, ...response.data]);
            setIsLoading(false);
            return;
          }
        })
        .catch(() => {
          toast.error("Erro desconhecido.")
        })
    })();
  }, [page, debounceSearch]);

  const handleClick = (id: string) => {
    router.push(`/montar-sacola/${id}`);
  };

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
          appId="CDD"
          loaderType="component"
        />
      ) : !isLoading && bags.length === 0 ? (
        <div className="flex flex-col justify-center gap-1 items-center mt-3 text-slate-gray">
          <FaBoxOpen className="text-walnut-brown" size={64} />
          <span className="text-center">Nenhuma sacola < br/> encontrada!</span>
        </div>
      ) : (
        <table className="bg-white text-theme-primary text-left leading-7 w-full table-fixed rounded-lg mb-4 overflow-y-hidden">
          <thead className="w-full">
            <tr className="text-[rgb(84,95,113)]">
              <th className="truncate w-1/5 text-[#979797] font-inter border-b border-theme-background p-2 text-xs font-semibold text-center">
                Código
              </th>
              <th className="truncate w-1/2 text-[#979797] font-inter border-b border-theme-background p-2 text-xs font-semibold text-center">
                Cliente
              </th>
              <th className="truncate w-[30%] text-[#979797] font-inter border-b border-theme-background p-2 text-xs font-semibold text-center">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {bags.map((bag) => (
              <tr onClick={() => handleClick(bag.id)} key={bag.id} className="text-center cursor-pointer">
                <td className="border-b-[1px] truncate text-[#545F71] px-2 py-3">
                  {bag.id}
                </td>
                <td className="border-b-[1px] truncate text-[#545F71] px-2 py-3">
                  {`${bag.user.first_name} ${bag.user.last_name}`}
                </td>
                {bag.status === "PENDING" ? (
                  <td className="border-b-[1px] truncate text-white font-semibold px-2 py-2">
                    <Button className="w-full bg-walnut-brown px-3 py-2 rounded-3xl">Montar</Button>
                  </td>
                ) : (
                  <td className="w-full border-b-[1px] truncate text-theme-primary font-semibold px-2 py-2">
                    <Button className="w-full bg-theme-background px-3 py-2 rounded-3xl">Pronta</Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
