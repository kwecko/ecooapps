"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { FaBoxOpen } from "react-icons/fa6";
import StatusFilterButtons from "@shared/components/StatusFilterButton";

import OrderTable from "@shared/components/OrderTable";
import Loader from "@shared/components/Loader";
import { IBoxes } from "@shared/interfaces/farm";
import { useDebounce } from "@shared/hooks/useDebounce";
import SearchInput from "@shared/components/SearchInput";
import { useGetStatus } from "@shared/hooks/useGetStatus";
import { useHandleError } from "@shared/hooks/useHandleError";
import { useLocalStorage } from "@shared/hooks/useLocalStorage";
import { getNextSaturdayDate } from "@shared/utils/get-next-saturday-date";
import { OfferStatus, IBagStatus } from "@shared/interfaces/bag-status";
import EmptyBox from "@shared/components/EmptyBox";

import { getBoxesWithOrders } from "@cdd/app/_actions/box/get-boxes-with-orders";

interface FarmsProps {
  page: number;
  setTotalItems: (total: number) => void;
}

export interface IStatus {
  name: string;
  key: string[];
}

const statuses: IStatus[] = [
  { name: "Todas", key: ["PENDING", "VERIFIED", "CANCELLED"] },
  { name: "Pendentes", key: ["PENDING"] },
  { name: "Verificados", key: ["VERIFIED"] },
  { name: "Cancelados", key: ["CANCELLED"] },
];

export function FarmWithOrdersTable({ page, setTotalItems }: FarmsProps) {
  const router = useRouter();

  const { getStatus } = useGetStatus();

  const [farms, setFarms] = useState<IBoxes[]>([]);
  const [farmsFiltered, setFarmFiltered] = useState<IBoxes[]>([]);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<OfferStatus>(
    statuses[0].key as OfferStatus
  );

  const debounceSearch = useDebounce(name, 1000);
  const { handleError } = useHandleError();
  const { getFromStorage } = useLocalStorage();

  const handleStatusFilterClick = (status: IStatus) => {
    if (selectedStatus === status.key) {
      setSelectedStatus(statuses[0].key as OfferStatus);
      setFarmFiltered(farms);
      return;
    }

    setFarmFiltered(() => farms.filter((item) => status.key.includes(item.status)));
    setSelectedStatus(status.key as OfferStatus);
  };

    useEffect(() => {
      (() => {
        setIsLoading(true);
        const cycle = getFromStorage("selected-cycle");

        if (!cycle) {
          toast.error("Selecione um ciclo para ver os pedidos!");
          return;
        }

        const { id } = cycle;

        getBoxesWithOrders({
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
              setTotalItems(response.data.length);
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

    const handleClick = (id: string) => {
      router.push(`/ofertas/${id}`);
    };

    const headers = [
      { label: "Prazo", style: "w-[30%]" },
      { label: "Produtor", style: "w-1/2" },
      { label: "Status", style: "w-1/5 text-center" },
    ];

    const info =
      farmsFiltered.length > 0
        ? farmsFiltered.map((farm) => ({
            id: farm.id,
            data: [
              { detail: getNextSaturdayDate() },
              { detail: farm.catalog.farm.name },
              { detail: getStatus({ type: 'oferta', status: farm.status as IBagStatus["offer"]}) },
            ],
          }))
        : [];

    return (
      <div className="w-full h-full flex flex-col">
        <div>
          <div className="w-full flex gap-2 items-center mt-4 mb-4">
            <SearchInput onChange={setName} />
          </div>
          <StatusFilterButtons
            statuses={statuses}
            selectedStatus={selectedStatus}
            handleStatusFilterClick={(status: IStatus) => handleStatusFilterClick(status)}
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center mt-3">
            <Loader className="mt-3" loaderType="component" />
          </div>
        ) : debounceSearch && farmsFiltered.length === 0 ? (
          <EmptyBox
            type="search"
          />
        ) : farmsFiltered.length === 0 ? (
          <EmptyBox
            type="bag"
          />
        ) : (
          <OrderTable headers={headers} info={info} onRowClick={handleClick} />
        )}
      </div>
    );
  };