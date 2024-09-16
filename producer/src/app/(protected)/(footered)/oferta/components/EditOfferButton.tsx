import { OfferWithProductDTO } from "@shared/domain/dtos/offer-with-product-dto";
import { LuPenSquare } from "react-icons/lu";
import { useRouter } from "next/navigation";

interface EditOfferButtonProps {
    offer: OfferWithProductDTO
}

export default function EditOfferButton({ offer }: EditOfferButtonProps) {
    const router = useRouter();

    const handleEditOffer = () => {
        sessionStorage.setItem("edit-offer-data", JSON.stringify(offer));
        router.push("/oferta/editar");
    };

    return (
        <button className="text-white self-start rounded-md p-2 text-xl font-bold bg-[#2F4A4D]" title="Editar oferta"
            aria-label="Editar oferta" aria-hidden="true"
            onClick={handleEditOffer}
        >
            <LuPenSquare />
        </button>
    )
}