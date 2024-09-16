import { FaRegTrashCan } from "react-icons/fa6";
import Modal from "@shared/components/Modal";
import { useState } from "react";
import { deleteOffer } from "@producer/app/_actions/offers/delete-offer";
import { toast } from "sonner";
import { useHandleError } from "@shared/hooks/useHandleError";

interface DeleteOfferButtonProps {
    offerId: string;
    productName: string;
    onDeleteCard: (offerId: string) => void;
}

export default function DeleteOfferButton({ offerId, productName, onDeleteCard }: DeleteOfferButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { handleError } = useHandleError();

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const DeleteOffer = async () => {
        try {
            const response = await deleteOffer({ offer_id: offerId });

            if (response.message) {
                handleError(response.message as string);
            } else {
                toast.success("Oferta removida com sucesso!");
                onDeleteCard(offerId);
            }
        } catch {
            handleError("Erro desconhecido.");
        } finally {
            setIsModalOpen(false);
        }
    }

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
            titleOpenModal="Remover oferta"
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}

            buttonOpenModal={
                <button className="text-white self-start rounded-md p-2 text-xl font-bold bg-[#FF7070]" title="Remover oferta"
                    aria-label="Remover oferta" aria-hidden="true" onClick={handleOpenModal}
                >
                    <FaRegTrashCan />
                </button>}
        />
    );
}