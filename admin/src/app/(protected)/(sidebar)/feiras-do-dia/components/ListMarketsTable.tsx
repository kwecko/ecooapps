"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import EmptyBox from "@shared/components/EmptyBox";
import GenericTable from "@shared/components/GenericTable";
import PagingButton from "@shared/components/PagingButton";
import TableSkeleton from "@admin/app/components/TableSkeleton";

import useListMarkets from "@admin/hooks/useListMarkets";
import { getMarketsTableColumns } from "../config/table-config";
import { MarketDTO } from "@shared/interfaces/dtos";

export default function ListMarketsTable() {
  const [page, setPage] = useState(1);
  const router = useRouter();

  const {
    data: markets,
    isLoading,
  } = useListMarkets({
    page,
  });

  const nextPage = () => {
    if (markets.length < 20) {
      return;
    }
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const navigateToMarketDetails = (id: string) => {
    // Por enquanto, apenas navega para a página de detalhes
    // router.push(`/feiras-do-dia/${id}`);
    console.log("Navigate to market:", id);
  };

  return (
    <div className="w-full h-full flex flex-col gap-5 overflow-auto justify-between items-center">
      {isLoading && <TableSkeleton />}

      {!isLoading && markets.length === 0 && <EmptyBox type="search" />}

      {!isLoading && markets.length > 0 && (
        <GenericTable
          data={markets}
          columns={getMarketsTableColumns({
            navigateToMarketDetails,
          })}
          gridColumns={16}
        />
      )}

      {!isLoading && markets.length > 0 && (
        <PagingButton value={page} nextPage={nextPage} backPage={prevPage} />
      )}
    </div>
  );
}

