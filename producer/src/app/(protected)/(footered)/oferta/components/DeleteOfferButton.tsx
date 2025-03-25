import { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";

import Modal from "@shared/components/Modal";
import { useHandleError } from "@shared/hooks/useHandleError";
import Loader from "@shared/components/Loader";

import { deleteOffer } from "@producer/_actions/offers/DELETE/delete-offer";


interface DeleteOfferButtonProps {
  offerId: string;
  productName: string;
  onDeleteCard: (offerId: string) => void;
}

export default function DeleteOfferButton({
  offerId,
  productName,
  onDeleteCard,
}: DeleteOfferButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { handleError } = useHandleError();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const DeleteOffer = async () => {
    setIsLoading(true);
    try {
      const response = await deleteOffer({
        offer_id: offerId,
      });

      if (response.message) {
        handleError(response.message as string);
        return;
      }

    } catch (error) {
      handleError(error as string);
      setIsLoading(false);
      return;
    }

    onDeleteCard(offerId);
    setIsModalOpen(false);
    setIsLoading(false);
  };

  return (
    <Modal
      bgCloseModal="white"
      bgConfirmModal="#FF7070"
      bgOpenModal="#2F4A4D"
      contentModal={`Essa ação removerá a oferta do produto ${productName} da sua lista de ofertas.`}
      modalAction={DeleteOffer}
      titleCloseModal="Manter"
      titleConfirmModal="Remover"
      titleContentModal="Deseja remover a oferta?"
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      buttonOpenModal={
        <button
          className="text-white self-start rounded-md p-2 text-xl font-bold bg-[#FF7070]"
          title="Remover oferta"
          aria-label="Remover oferta"
          aria-hidden="true"
          onClick={handleOpenModal}
        >
          {isLoading ? <Loader loaderType="component" /> : <FaRegTrashCan />}
        </button>
      }
    />
  );
}
