"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
// Não precisa mais de useState

import { default as useListCurrentBags } from "@cdd/hooks/bags/useListCurrentBags";
import EmptyBox from "@shared/components/EmptyBox";
import GenericTable from "@shared/components/GenericTable";
import StatusFilterButtons from "@shared/components/StatusFilterButton";
import TablePaginationControl from "@shared/components/TablePaginationControl";
import { useDebounce } from "@shared/hooks/useDebounce";
import { useGetStatusText } from "@shared/hooks/useGetStatus";
// import usePageQueryParams from "@shared/hooks/usePageQueryParams";
import { BagDTO } from "@shared/interfaces/dtos";
import { BagStatus } from "@shared/types/bag-status";

type FilterStatus = {
  name: string;
  key: string[];
};

const statuses: FilterStatus[] = [
  {
    name: "todas",
    key: ["MOUNTED", "DISPATCHED", "RECEIVED", "DEFERRED", "FETCH", "FETCHED"],
  },
  { name: "separadas", key: ["MOUNTED", "FETCH"] },
  { name: "enviadas", key: ["DISPATCHED"] },
  { name: "entregues", key: ["RECEIVED", "FETCHED"] },
  { name: "retornadas", key: ["DEFERRED"] },
];

export default function SendBagTable() {
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

  const { data: bags, isLoading } = useListCurrentBags({
    page,
    user: debounceSearch,
    statuses: (statuses.find(
      (status) => status.name === selectedStatus
    )?.key ?? []) as BagStatus["send"][],
  });

  const handleStatusFilterClick = (status: FilterStatus) => {
    if (status.name === selectedStatus) {
      updateStatus("todas");
      return;
    }
    updateStatus(status.name);
  };

  const handleClick = (id: string) => {
    router.push(`/enviar-sacola/${id}`);
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
                  key: "customerName",
                  colSpan: 4,
                  render: (row: BagDTO) =>
                    `${row.customer.first_name} ${row.customer.last_name}`,
                },
                {
                  header: "Status",
                  key: "status",
                  colSpan: 4,
                  className: "items-center justify-center w-full",
                  render: (row: BagDTO) => {
                    let status = row.status;

                    if (status === "MOUNTED" && row.shipping > 0)
                      status = "FETCH";

                    if (
                      (status === "DISPATCHED" || status === "RECEIVED") &&
                      row.shipping > 0
                    )
                      status = "FETCHED";

                    return getStatus({
                      type: "enviar",
                      status: status as any,
                    });
                  },
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
