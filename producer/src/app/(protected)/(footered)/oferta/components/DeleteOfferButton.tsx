import useUpdateCatalog from "@producer/hooks/catalogs/useUpdateCatalog";
import Modal from "@shared/components/Modal";
import { useHandleError } from "@shared/hooks/useHandleError";
import { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
interface DeleteOfferButtonProps {
  catalogId: string;
  offerId: string;
  productName: string;
  onDeleteCard: (offerId: string) => void;
}

export default function DeleteOfferButton({
  catalogId,
  offerId,
  productName,
  onDeleteCard,
}: DeleteOfferButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleError } = useHandleError();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const { deleteOffers } = useUpdateCatalog();

  const DeleteOffer = async () => {
    const success = await deleteOffers({
      catalog_id: catalogId,
      offers: [{ id: offerId }],
    });

    if (!success) return;
    onDeleteCard(offerId);
    setIsModalOpen(false);
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
          <FaRegTrashCan />
        </button>
      }
    />
  );
}
