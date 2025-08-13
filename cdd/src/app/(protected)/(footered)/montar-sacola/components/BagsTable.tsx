"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { BagStatus } from "@shared/types/bag-status";

import EmptyBox from "@shared/components/EmptyBox";
import StatusFilterButtons from "@shared/components/StatusFilterButton";
import { useDebounce } from "@shared/hooks/useDebounce";

import GenericTable from "@shared/components/GenericTable";
import TablePaginationControl from "@shared/components/TablePaginationControl";
import { default as useListBags } from "@shared/hooks/bags/useListBags";
import { useGetStatusText } from "@shared/hooks/useGetStatus";
// import usePageQueryParams from "@shared/hooks/usePageQueryParams";
import { BagDTO } from "@shared/interfaces/dtos";

type FilterStatus = {
  name: string;
  key: string[];
};

const statuses: FilterStatus[] = [
  { name: "todas", key: ["VERIFIED", "MOUNTED"] },
  { name: "pendentes", key: ["VERIFIED"] },
  { name: "separadas", key: ["MOUNTED"] },
];

export default function BagsTable() {
  const router = useRouter();

  const { getStatus } = useGetStatusText();

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [selectedStatus, setSelectedStatus] = useState<string>(
    searchParams.get("status") ?? "todas"
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("status", selectedStatus);

    if (selectedStatus === "todas") params.delete("status");
    router.replace(`${pathname}?${params.toString()}`);
  }, [selectedStatus]);

  const page = Number(searchParams.get("p") ?? 1);
  const search = searchParams.get("q") ?? "";
  const debounceSearch = useDebounce(search, 300);

  const updateStatus = (status: string) => {
    setSelectedStatus(status);
  };

  const { data: bags, isLoading } = useListBags({
    page,
    statuses: statuses.find((status) => status.name === selectedStatus)
      ?.key as BagStatus["build"][],
    user: debounceSearch,
  });

  const handleStatusFilterClick = (status: FilterStatus) => {
    if (status.name === selectedStatus) {
      updateStatus("todas");
      return;
    }
    updateStatus(status.name);
  };

  const handleClick = (id: string) => {
    router.push(`/montar-sacola/${id}`);
  };

  return (
    <div className="flex flex-col gap-2.5 w-full items-center justify-between h-full">
      <div className="w-full flex flex-col gap-2.5 justify-start items-center">
        {/* <TableSearchInput
          placeholder={"Filtrar por cliente..."}
          icon="search"
          className="lg:self-end w-full"
        /> */}
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
                  key: "code",
                  colSpan: 4,
                },
                {
                  header: "Cliente",
                  key: "customer.name",
                  colSpan: 4,
                  render: (row: BagDTO) =>
                    `${row.customer.first_name} ${row.customer.last_name}`,
                },
                {
                  header: "Status",
                  key: "status",
                  colSpan: 4,
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
