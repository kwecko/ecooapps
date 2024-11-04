  "use client";

  import { toast } from "sonner";
  import { useEffect, useState } from "react";
  import { useRouter } from "next/navigation";

  import StatusFilterButtons from "./StatusFilterButton";

  import Table from "@shared/components/Table"
  import Loader from "@shared/components/Loader";
  import { IBoxes } from "@shared/interfaces/farm";
  import { useDebounce } from "@shared/hooks/useDebounce";
  import SearchInput from "@shared/components/SearchInput";
  import { useGetStatus } from "@shared/hooks/useGetStatus";
  import { useHandleError } from "@shared/hooks/useHandleError";
  import { useLocalStorage } from "@shared/hooks/useLocalStorage";
  import { getNextSaturdayDate } from "@shared/utils/get-next-saturday-date";
  import EmptyBox from "@shared/components/EmptyBox";

  import { getBoxesWithOrders } from "@cdd/app/_actions/box/get-boxes-with-orders";

  interface FarmsProps {
    page: number;
    setTotalItems: (total: number) => void;
  }

  export interface IStatus {
    name: string;
    key: string;
  }

  export function FarmWithOrdersTable({ page, setTotalItems }: FarmsProps) {
    const router = useRouter();

    const { getStatus } = useGetStatus();

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
        name: "Verificados",
        key: "VERIFIED",
      },
      {
        name: "Cancelados",
        key: "CANCELLED",
      },
    ];

    const [selectedStatus, setSelectedStatus] = useState("ALL");
    const [isLoading, setIsLoading] = useState(false);
    const [farms, setFarms] = useState<IBoxes[]>([]);
    const [farmsFiltered, setFarmFiltered] = useState<IBoxes[]>([]);
    const [name, setName] = useState("");

    const { handleError } = useHandleError();
    const { getFromStorage } = useLocalStorage();
    const debounceSearch = useDebounce(name, 1000);

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
              { detail: getNextSaturdayDate() }, // Prazo
              { detail: farm.catalog.farm.name }, // Produtor
              { detail: getStatus({ type: 'oferta', status: farm.status }) }, // Status
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
            handleStatusFilterClick={(status) => handleStatusFilterClick(status)}
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
            type="box"
          />
        ) : (
          <Table headers={headers} info={info} onRowClick={handleClick} />
        )}
      </div>
    );
  }
