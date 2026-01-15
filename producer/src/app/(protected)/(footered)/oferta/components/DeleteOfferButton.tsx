import { useState } from "react";
import { FaRegTrashCan, FaStoreSlash } from "react-icons/fa6";

import Modal from "@shared/components/Modal";
import { useHandleError } from "@shared/hooks/useHandleError";
import Loader from "@shared/components/Loader";

import { deleteOffer } from "@producer/_actions/offers/DELETE/delete-offer";
import { updateOffer } from "@producer/_actions/offers/PATCH/update-offer";
import { OfferDTO } from "@shared/interfaces/dtos";
import { toast } from "sonner";


interface DeleteOfferButtonProps {
  offer?: OfferDTO
  offerId: string;
  productName: string;
  onDeleteCard: (offerId: string) => void;
}

export default function DeleteOfferButton({
  offer,
  offerId,
  productName,
  onDeleteCard,
}: DeleteOfferButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState(`Essa ação removerá a oferta do produto ${productName} da sua lista de ofertas.`);

  const { handleError } = useHandleError();

  const handleOpenModal = () => {
    if (offer?.cycle_id && offer?.market_id) {
      setText(`Essa ação desvinculará a oferta do produto ${productName} da feira, fazendo com que ela não esteja mais disponível para os clientes dessa feira.`)
    }
    setIsModalOpen(true);
  };

  const DeleteOffer = async () => {
    setIsLoading(true);

    if (offer?.cycle_id && offer?.market_id) {
      try {
        const response = await updateOffer({
          offer_id: offerId,
          data: {
            market_id: null,
          },
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
      toast.success("Oferta desvinculada da feira com sucesso!");
    }

    else {
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
      toast.success("Oferta removida com sucesso!");
    };
  }

  return (
    <Modal
      bgCloseModal="white"
      bgConfirmModal="#FF7070"
      bgOpenModal="#2F4A4D"
      contentModal={text}
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
          {isLoading ? <Loader loaderType="component" /> : (offer?.market_id ? <FaStoreSlash /> : <FaRegTrashCan />)}
        </button>
      }
    />
  );
}
