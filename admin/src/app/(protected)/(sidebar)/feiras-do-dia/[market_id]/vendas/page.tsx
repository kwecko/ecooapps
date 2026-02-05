"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import useVendasPage from "./index";
import Title from "@admin/app/components/Title";
import { getBagsTableColumns } from "./config/table-config";
import ModalV2 from "@shared/components/ModalV2";
import ButtonV2 from "@shared/components/ButtonV2";
import Loader from "@shared/components/Loader";

import TableSkeleton from "@admin/app/components/TableSkeleton";
import EmptyBox from "@shared/components/EmptyBox";
import GenericTable from "@shared/components/GenericTable";
import PagingButton from "@shared/components/PagingButton";
import Button from "@shared/components/ButtonV2";
import { BagDTO } from "@shared/interfaces/dtos";
import { updateBagById } from "@admin/_actions/bags/update-bag-by-id";
import { useHandleError } from "@shared/hooks/useHandleError";
import { fetchMarket } from "@admin/_actions/markets/GET/fetch-market";

function VendasPage() {
  const router = useRouter();
  const {
    market_id,
    page,
    bags,
    nextPage,
    prevPage,
    isPending,
    reloadBags,
  } = useVendasPage();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBag, setSelectedBag] = useState<BagDTO | null>(null);
  const [isPendingCancel, startCancelTransition] = useTransition();
  const { handleError } = useHandleError();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchMarket({ market_id })
      .then((response) => {
        if (response.message) {
          console.error("Erro ao carregar o mercado:", response.message);
        } else {
          setIsOpen(response.data.open);
          console.log("Mercado carregado:", response.data);
        }
      })
      .catch((error) => {
        console.error("Erro desconhecido ao carregar o mercado:", error);
      });
  }, [market_id]);

  function handleViewBag(bag: BagDTO) {
    router.push(`/pedidos/${bag.id}`);
  }

  function handleDeleteBag(bag: BagDTO) {
    setSelectedBag(bag);
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
    setSelectedBag(null);
  }

  function handleConfirmCancel() {
    if (!selectedBag) return;

    startCancelTransition(async () => {
      const response = await updateBagById({
        bagId: selectedBag.id,
        data: {
          status: "CANCELLED",
        },
      });

      if (response.message) {
        handleError(response.message);
        return;
      }

      toast.success("Venda cancelada com sucesso!");
      handleCloseDeleteModal();
      reloadBags();
    });
  }

  function handleVender() {
    router.push(`/feiras-do-dia/${market_id}/vendas/vender`);
  }

  return (
    <div className="w-full flex flex-col h-full gap-4 overflow-y-hidden items-stretch relative">
      <div className="flex justify-between items-center w-full">
        <Title>Vendas</Title>
        <Button
          variant="default"
          className="flex w-32 justify-center items-center gap-3 bg-rain-forest"
          onClick={handleVender}
          disabled={isOpen === false}
        >
          Vender
        </Button>
      </div>
      <div className="w-full h-full flex flex-col gap-5 overflow-auto justify-between items-center">
        {isPending && <TableSkeleton />}

        {!isPending && bags.length === 0 && <EmptyBox type="search" />}

        {!isPending && bags.length > 0 && (
          <GenericTable
            data={bags}
            columns={getBagsTableColumns({
              onView: handleViewBag,
              onDelete: handleDeleteBag,
            })}
            gridColumns={16}
          />
        )}

        {!isPending && bags.length > 0 && (
          <PagingButton value={page} nextPage={nextPage} backPage={prevPage} />
        )}
      </div>

      {isDeleteModalOpen && selectedBag && (
        <ModalV2
          isOpen={isDeleteModalOpen}
          closeModal={handleCloseDeleteModal}
          className="w-152 bg-white text-coal-black"
          title="Atenção"
          iconClose={true}
        >
          <div className="w-full flex flex-col gap-5 items-center">
            <span className="w-86 text-center text-theme-primary">
              Você confirma que quer cancelar esta venda?
            </span>
            <div className="w-full flex justify-between items-center gap-4">
              <ButtonV2
                variant="default"
                type="button"
                onClick={handleCloseDeleteModal}
                className="bg-tertiary text-slate-dark border-none"
              >
                Cancelar
              </ButtonV2>
              <ButtonV2
                variant="default"
                type="button"
                onClick={handleConfirmCancel}
                className="bg-error border-none"
                disabled={isPendingCancel}
              >
                {isPendingCancel ? <Loader loaderType="login" /> : "Confirmar"}
              </ButtonV2>
            </div>
          </div>
        </ModalV2>
      )}
    </div>
  );
}

export default dynamic(() => Promise.resolve(VendasPage), { ssr: false });

