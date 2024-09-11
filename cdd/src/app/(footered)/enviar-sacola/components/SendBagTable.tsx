"use client";

import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { HiOutlineSearch } from "react-icons/hi";
import Button from "@shared/components/Button";
import Loader from "@shared/components/Loader";

interface BagsProps {
  page: number;
}

interface Bag {
  id: string;
  user: {
    first_name: string;
    last_name: string;
  };
  status: string;
}

export default function SendBagTable({ page }: BagsProps) {
  const router = useRouter();

  const [bags, setBags] = useState<Bag[]>([]);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      setName(e.target.value);
    }, 300);
  };

  useEffect(() => {
    setIsLoading(true);

    // Simulando dados ao invés de fazer uma requisição real
    const fakeBags: Bag[] = [
      {
        id: "12345",
        user: { first_name: "João", last_name: "Silva" },
        status: "SEPARATED",
      },
      {
        id: "12346",
        user: { first_name: "Maria", last_name: "Oliveira" },
        status: "DISPATCHED",
      },
      {
        id: "12347",
        user: { first_name: "Carlos", last_name: "Pereira" },
        status: "SEPARATED",
      },
      {
        id: "12348",
        user: { first_name: "Ana", last_name: "Souza" },
        status: "DISPATCHED",
      },
    ];

    // Filtrando dados simulados com base no nome
    const filteredBags = fakeBags.filter((bag) =>
      `${bag.user.first_name} ${bag.user.last_name}`
        .toLowerCase()
        .includes(name.toLowerCase())
    );

    setTimeout(() => {
      setBags(filteredBags);
      setIsLoading(false);
    }, 1000); // Simulando tempo de carregamento
  }, [page, name]);

  const handleClick = (id: string) => {
    const path = `/enviar-sacola/${id}`;
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
      ) : !isLoading && bags.length === 0 ? (
        <span className="text-center mt-3 text-slate-gray">
          {name === "" ? "Ainda não há sacolas para serem enviadas." : "Nenhum cliente encontrado."}
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
            {bags.map((bag) => (
              <tr onClick={() => handleClick(bag.id)} key={bag.id} className="text-center cursor-pointer">
                <td className="border-b-[1px] truncate text-[#545F71] px-2 py-3">
                  {bag.id}
                </td>
                <td className="border-b-[1px] truncate text-[#545F71] px-2 py-3">
                  {`${bag.user.first_name} ${bag.user.last_name}`}
                </td>
                {bag.status === "SEPARATED" ? (
                  <td className="border-b-[1px] truncate text-white font-semibold px-2 py-2">
                    <Button className="w-full bg-walnut-brown px-3 py-2 rounded-3xl">Enviar</Button>
                  </td>
                ) : (
                  <td className="w-full border-b-[1px] truncate text-theme-primary font-semibold px-2 py-2">
                    <Button className="w-full bg-theme-background px-3 py-2 rounded-3xl">Enviada</Button>
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
