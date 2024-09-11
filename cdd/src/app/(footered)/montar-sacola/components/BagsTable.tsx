"use client";

import { useRouter } from "next/navigation";
import { listBags } from "@cdd/app/_actions/bag/list-bags";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { HiOutlineSearch } from "react-icons/hi";
import Button from "@shared/components/Button";
import { Bag } from "@shared/interfaces/bag"
import { useLocalStorage } from "@shared/hooks/useLocalStorage"
import Loader from "@shared/components/Loader";
import { useHandleError } from "@shared/hooks/useHandleError";
interface BagsProps {
  page: number;
}

export default function BagsTable({ page }: BagsProps) {
  const router = useRouter();

  const [bags, setBags] = useState<Bag[]>([]);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { handleError } = useHandleError()
  const { getFromStorage } = useLocalStorage()

  const handleChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      setName(e.target.value);
    }, 300);
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      const cycle = getFromStorage("selected-cycle");

      if (!cycle) {
        toast.error("Selecione um ciclo para montar uma sacola!");
        return;
      }

      const { id } = cycle;

      await listBags({
        cycle_id: id,
        page,
        status: "PENDING",
        name
      })
        .then((response) => {
          if (response.message) {
            const messageError = response.message as string

            handleError(messageError)
          } else if (response.data) {
            setBags(response.data);
            return;
          }
        })
        .catch(() => {
          toast.error("Erro desconhecido.")
        })

      await listBags({
        cycle_id: id,
        page,
        status: "SEPARATED",
        name
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
  }, [page, name]);

  const fakeData = [
    {
      id: "205004",
      user: {
        first_name: "Eduardo",
        last_name: "Teixeira"
      },
      status: "PENDING"
    },
    {
      id: "998324",
      user: {
        first_name: "Maria",
        last_name: "Souza"
      },
      status: "PENDING"
    },
    {
      id: "279941",
      user: {
        first_name: "José",
        last_name: "Oliveira"
      },
      status: "PENDING"
    },
    {
      id: "278501",
      user: {
        first_name: "Ana",
        last_name: "Santos"
      },
      status: "PENDING"
    },
    {
      id: "712948",
      user: {
        first_name: "Carlos",
        last_name: "Silva"
      },
      status: "PENDING"
    },
    {
      id: "712049",
      user: {
        first_name: "Mariana",
        last_name: "Souza"
      },
      status: "PENDING"
    },
    {
      id: "712050",
      user: {
        first_name: "José",
        last_name: "Oliveira"
      },
      status: "SEPARATED"
    },
    {
      id: "712053",
      user: {
        first_name: "Ana",
        last_name: "Santos"
      },
      status: "SEPARATED"
    },
    {
      id: "712078",
      user: {
        first_name: "Carlos",
        last_name: "Silva"
      },
      status: "SEPARATED"
    },
    {
      id: "570190",
      user: {
        first_name: "Mariana",
        last_name: "Souza"
      },
      status: "SEPARATED"
    },
    {
      id: "570191",
      user: {
        first_name: "Guilherme",
        last_name: "Santos"
      },
      status: "SEPARATED"
    },
    {
      id: "570192",
      user: {
        first_name: "Paulo",
        last_name: "Cardoso"
      },
      status: "SEPARATED"
    },
  ];

  console.log(localStorage)

  const id = localStorage.getItem("bag_id");
  if (id !== null) {
    const bag = fakeData.find((bag) => bag.id === id);
    if (bag) {
      bag.status = "SEPARATED";
    }
  }

  const handleClick = (id: string) => {
    const path = `/montar-sacola/${id}`;
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
                className="border border-french-gray rounded-md h-12 p-4 pr-10 text-base inter-font w-full"
                type="text"
              />
              <button disabled>
                <HiOutlineSearch
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  size={24}
                />
              </button>
            </form>
          </div>
        </div>
      </div>
      {isLoading ? (
        <Loader className="w-8 h-8 border-walnut-brown mt-3" />
      ) : !isLoading && fakeData.length === 0 ? (
        <span className="text-center mt-3 text-slate-gray">
          {name === "" ? "Ainda não há sacolas para serem montadas." : "Nenhum cliente encontrado."}
        </span>
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
            {fakeData.map((bag) => (
              <tr onClick={() => handleClick(bag.id)} key={bag.id} className="text-center cursor-pointer">
                <td className="border-b-[1px] truncate text-[#545F71] px-2 py-3">
                  {/* {getNextSaturdayDate()} */}
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
