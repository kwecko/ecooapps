"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import useEstoquePage from "./index";
import Title from "@admin/app/components/Title";
import { getOfferTableColumns } from "./config/table-config";
import AddStockModal from "./components/AddStockModal/AddStockModal";
import UpdateOfferModal from "./components/UpdateOfferModal/UpdateOfferModal";
import DeleteOfferModal from "./components/DeleteOfferModal/DeleteOfferModal";

import TableSkeleton from "@admin/app/components/TableSkeleton";
import Button from "@shared/components/ButtonV2";
import EmptyBox from "@shared/components/EmptyBox";
import GenericTable from "@shared/components/GenericTable";
import PagingButton from "@shared/components/PagingButton";
import SearchInput from "@shared/components/SearchInput";
import { OfferDTO } from "@shared/interfaces/dtos";

function EstoquePage() {
  const {
    market_id,
    search,
    setSearch,
    page,
    nextPage,
    prevPage,
    offers,
    isPending,
    handleAddStock,
    isOpenAddStockModal,
    setIsOpenAddStockModal,
    reloadOffers,
  } = useEstoquePage();

  const [isOpenUpdateOfferModal, setIsOpenUpdateOfferModal] = useState(false);
  const [isOpenDeleteOfferModal, setIsOpenDeleteOfferModal] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<OfferDTO | null>(null);

  function handleEditOffer(offer: OfferDTO) {
    setSelectedOffer(offer);
    setIsOpenUpdateOfferModal(true);
  }

  function handleDeleteOffer(offer: OfferDTO) {
    setSelectedOffer(offer);
    setIsOpenDeleteOfferModal(true);
  }

  function handleCloseUpdateModal() {
    setIsOpenUpdateOfferModal(false);
    setSelectedOffer(null);
  }

  function handleCloseDeleteModal() {
    setIsOpenDeleteOfferModal(false);
    setSelectedOffer(null);
  }

  return (
    <div className="w-full flex flex-col h-full gap-4 overflow-y-hidden items-stretch relative">
      <div className="flex justify-between items-center w-full">
      <Title>Estoque</Title>

        <div className="flex gap-3 items-center">
          <SearchInput
            placeholder="Filtrar pelo nome do produto"
            onChange={setSearch}
            value={search}
            type="secondary"
            className="w-86"
          />
          <Button
            variant="default"
            className="flex w-64 justify-center items-center gap-3 bg-rain-forest"
            onClick={handleAddStock}
          >
            Adicionar ao estoque +
          </Button>
        </div>
      </div>
      <div className="w-full h-full flex flex-col gap-5 overflow-auto justify-between items-center">
        {isPending && <TableSkeleton />}

        {!isPending && offers.length === 0 && <EmptyBox type="search" />}

        {!isPending && offers.length > 0 && (
          <GenericTable
            data={offers}
            columns={getOfferTableColumns({
              onEdit: handleEditOffer,
              onDelete: handleDeleteOffer,
            })}
            gridColumns={16}
          />
        )}

        {!isPending && offers.length > 0 && (
          <PagingButton value={page} nextPage={nextPage} backPage={prevPage} />
        )}
      </div>

      {isOpenAddStockModal && (
        <AddStockModal
          isOpen={isOpenAddStockModal}
          closeModal={() => setIsOpenAddStockModal(false)}
          market_id={market_id}
          reloadOffers={reloadOffers}
        />
      )}

      {isOpenUpdateOfferModal && selectedOffer && (
        <UpdateOfferModal
          isOpen={isOpenUpdateOfferModal}
          closeModal={handleCloseUpdateModal}
          offer={selectedOffer}
          reloadOffers={reloadOffers}
        />
      )}

      {isOpenDeleteOfferModal && selectedOffer && (
        <DeleteOfferModal
          isOpen={isOpenDeleteOfferModal}
          closeModal={handleCloseDeleteModal}
          offer={selectedOffer}
          reloadOffers={reloadOffers}
        />
      )}
    </div>
  );
}

export default dynamic(() => Promise.resolve(EstoquePage), { ssr: false });

