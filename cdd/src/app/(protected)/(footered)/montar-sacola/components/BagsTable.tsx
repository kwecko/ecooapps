"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { BagStatus } from "@shared/types/bag-status";

import EmptyBox from "@shared/components/EmptyBox";
import StatusFilterButtons from "@shared/components/StatusFilterButton";
import { useDebounce } from "@shared/hooks/useDebounce";

import useListCurrentBags from "@cdd/hooks/bags/useListCurrentBags";
import GenericTable from "@shared/components/GenericTable";
import TablePaginationControl from "@shared/components/TablePaginationControl";
import TableSearchInput from "@shared/components/TableSearchInput";
import { useGetStatus } from "@shared/hooks/useGetStatus";
import usePageQueryParams from "@shared/hooks/usePageQueryParams";
import { BagDTO } from "@shared/interfaces/dtos";

type FilterStatus = {
  name: string;
  key: string[];
};

const statuses: FilterStatus[] = [
  { name: "todas", key: ["PENDING", "SEPARATED"] },
  { name: "pendentes", key: ["PENDING"] },
  { name: "separadas", key: ["SEPARATED"] },
];

export default function BagsTable() {
  const router = useRouter();

  const { getStatus } = useGetStatus();

  const searchParams = useSearchParams();
  const selectedStatus = searchParams.get("status") ?? "todas";
  const pathname = usePathname();

  const { page, query } = usePageQueryParams();
  const debounceSearch = useDebounce(query, 300);

  const setSelectedStatus = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("status", status);
    router.push(`${pathname}?${params.toString()}`);
  };

  const { data: bags, isLoading } = useListCurrentBags({
    page,
    statuses: statuses.find((status) => status.name === selectedStatus)
      ?.key as BagStatus["build"][],
    user: debounceSearch,
  });

  const handleStatusFilterClick = (status: FilterStatus) => {
    if (status.name === selectedStatus) {
      setSelectedStatus("todas");
      return;
    }

    const statusName = status.name;

    setSelectedStatus(statusName);
  };

  const handleClick = (id: string) => {
    router.push(`/montar-sacola/${id}`);
  };

  return (
    <div className="flex flex-col gap-2.5 w-full items-center justify-between h-full">
      <div className="w-full flex flex-col gap-2.5 justify-start items-center">
        <TableSearchInput
          placeholder={"Filtrar por cliente..."}
          icon="search"
          className="lg:self-end w-full"
        />
        <StatusFilterButtons
          statuses={statuses}
          selectedStatus={selectedStatus}
          handleStatusFilterClick={(status: FilterStatus) =>
            handleStatusFilterClick(status)
          }
        />
      </div>
      {!isLoading && (
        <>
          {bags?.length === 0 && (
            <>
              {debounceSearch && <EmptyBox type="search" />}
              {!debounceSearch && <EmptyBox type="box" />}
            </>
          )}
          {bags?.length > 0 && (
            <GenericTable
              gridColumns={12}
              columns={[
                {
                  header: "Código",
                  key: "id",
                  colSpan: 4,
                },
                {
                  header: "Cliente",
                  key: "customer.first_name",
                  colSpan: 6,
                },
                {
                  header: "Status",
                  key: "status",
                  colSpan: 2,
                  className: "items-center justify-center w-full",
                  render: (row: BagDTO) =>
                    getStatus({
                      type: "montar",
                      status: row.status as BagStatus["build"],
                    }),
                },
              ]}
              data={bags}
              onRowClick={(row) => handleClick(row.id)}
            />
          )}
          <TablePaginationControl className="justify-self-end" />
        </>
      )}
    </div>
  );
}
