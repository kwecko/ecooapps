"use client";

import dynamic from "next/dynamic";

import Title from "@admin/app/components/Title";
import ListMarketsTable from "./components/ListMarketsTable";
import Button from "@shared/components/ButtonV2";
import CreateMarketModal from "./components/CreateMarketModal/CreateMarketModal";
import useMarketsPage from "./index";

function MarketsPage() {
  const { toggleModal, isOpenCreateMarketModal } = useMarketsPage();

  return (
    <div className="w-full flex flex-col h-full gap-6 overflow-y-hidden items-stretch relative">
      <div className="flex justify-between items-start w-full">
        <Title>Feiras do dia</Title>
        <Button
          type="button"
          variant="default"
          className="flex w-64 justify-center items-center gap-3 bg-theme-highlight text-white"
          onClick={() => toggleModal("isOpenCreateMarketModal")}
        >
          Nova feira
        </Button>
      </div>
      <ListMarketsTable />

      {isOpenCreateMarketModal && (
        <CreateMarketModal
          isOpen={isOpenCreateMarketModal}
          closeModal={() => toggleModal("isOpenCreateMarketModal")}
        />
      )}
    </div>
  );
}

export default dynamic(() => Promise.resolve(MarketsPage), { ssr: false });

