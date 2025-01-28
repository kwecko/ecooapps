"use client";

import dynamic from "next/dynamic";

import useBagsPage from "@admin/app/(protected)/(sidebar)/pedidos";
import Title from "@admin/app/components/Title";
import { getBagsTableColumns } from "./config/table-config";

import TableSkeleton from "@admin/app/components/TableSkeleton";
import EmptyBox from "@shared/components/EmptyBox";
import GenericTable from "@shared/components/GenericTable";
import PagingButton from "@shared/components/PagingButton";
import DateInput from "@shared/components/DateInput";

function BagsPage() {
  const {
    page,
    bags,
    initialDate,
    finalDate,
    nextPage,
    prevPage,
    isPending,
    handleChangeInitialDate,
    handleChangeFinalDate,
    navigateToBagDetails,
  } = useBagsPage();

  return (
    <div className="w-full flex flex-col h-full gap-6 overflow-y-hidden items-stretch relative">
      <div className="flex justify-between items-start w-full">
        <Title>Pedidos</Title>

        <div className="flex gap-3 items-center">
          <DateInput
            label="Data inicial"
            value={initialDate}
            onChange={handleChangeInitialDate}
          />
          <DateInput
            label="Data final"
            value={finalDate}
            onChange={handleChangeFinalDate}
          />
        </div>
      </div>
      <div className="w-full h-full flex flex-col gap-5 overflow-auto justify-between items-center">
        {isPending && <TableSkeleton />}

        {!isPending && bags.length === 0 && <EmptyBox type="search" />}

        {!isPending && bags.length > 0 && (
          <GenericTable
            data={bags}
            columns={getBagsTableColumns({
              navigateToBagDetails,
            })}
            gridColumns={16}
          />
        )}

        {!isPending && bags.length > 0 && (
          <PagingButton value={page} nextPage={nextPage} backPage={prevPage} />
        )}
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(BagsPage), { ssr: false });
