"use client";

import dynamic from "next/dynamic";

import useVendasPage from "./index";
import Title from "@admin/app/components/Title";
import { getBagsTableColumns } from "./config/table-config";

import TableSkeleton from "@admin/app/components/TableSkeleton";
import EmptyBox from "@shared/components/EmptyBox";
import GenericTable from "@shared/components/GenericTable";
import PagingButton from "@shared/components/PagingButton";
import { BagDTO } from "@shared/interfaces/dtos";

function VendasPage() {
  const {
    market_id,
    page,
    bags,
    nextPage,
    prevPage,
    isPending,
  } = useVendasPage();

  function handleViewBag(bag: BagDTO) {
    // TODO: Implementar funcionalidade de visualizar
  }

  function handleEditBag(bag: BagDTO) {
    // TODO: Implementar funcionalidade de editar
  }

  function handleDeleteBag(bag: BagDTO) {
    // TODO: Implementar funcionalidade de deletar
  }

  return (
    <div className="w-full flex flex-col h-full gap-4 overflow-y-hidden items-stretch relative">
      <div className="flex justify-between items-center w-full">
        <Title>Vendas</Title>
      </div>
      <div className="w-full h-full flex flex-col gap-5 overflow-auto justify-between items-center">
        {isPending && <TableSkeleton />}

        {!isPending && bags.length === 0 && <EmptyBox type="search" />}

        {!isPending && bags.length > 0 && (
          <GenericTable
            data={bags}
            columns={getBagsTableColumns({
              onView: handleViewBag,
              onEdit: handleEditBag,
              onDelete: handleDeleteBag,
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

export default dynamic(() => Promise.resolve(VendasPage), { ssr: false });

