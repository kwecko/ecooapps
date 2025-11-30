"use client";

import Loader from "@shared/components/Loader";
import ModalV2 from "@shared/components/ModalV2";
import ButtonV2 from "@shared/components/ButtonV2";
import { OfferDTO } from "@shared/interfaces/dtos";
import useDeleteOfferModal from "./index";

interface DeleteOfferModalProps {
  isOpen: boolean;
  closeModal: () => void;
  offer: OfferDTO | null;
  reloadOffers: () => void;
}

export default function DeleteOfferModal({
  isOpen,
  closeModal,
  offer,
  reloadOffers,
}: DeleteOfferModalProps) {
  const { isPending, handleDelete } = useDeleteOfferModal({
    closeModal,
    reloadOffers,
  });

  return (
    <ModalV2
      isOpen={isOpen}
      closeModal={closeModal}
      className="w-152 bg-white text-coal-black"
      title="Atenção"
      iconClose={true}
    >
      <div className="w-full flex flex-col gap-5 items-center">
        <span className="w-86 text-center text-theme-primary">
          Você confirma que quer excluir a oferta do produto "{offer?.product?.name}" do produtor "{offer?.farm?.name}"?
        </span>
        <div className="w-full flex justify-between items-center gap-4">
          <ButtonV2
            variant="default"
            type="button"
            onClick={closeModal}
            className="bg-tertiary text-slate-dark border-none"
          >
            Cancelar
          </ButtonV2>
          <ButtonV2
            variant="default"
            type="button"
            onClick={() => handleDelete(offer?.id as string)}
            className="bg-error border-none"
          >
            {isPending ? <Loader loaderType="login" /> : "Excluir"}
          </ButtonV2>
        </div>
      </div>
    </ModalV2>
  );
}

