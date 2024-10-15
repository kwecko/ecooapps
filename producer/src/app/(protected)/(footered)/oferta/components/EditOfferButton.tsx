import { IOfferWithProduct } from "@shared/interfaces/offer";
import { LuPenSquare } from "react-icons/lu";
import { FaArrowUp } from "react-icons/fa6";
import { useRouter } from "next/navigation";

interface EditOfferButtonProps {
    offer: IOfferWithProduct;
    repeat?: boolean;
}

export default function EditOfferButton({ offer, repeat = false }: EditOfferButtonProps) {
    const router = useRouter();

    const type = repeat ? "Repetir" : "Editar";

    const handleEditOffer = () => {
        sessionStorage.setItem("edit-offer-data", JSON.stringify(offer));
        router.push(`/oferta/${type.toLowerCase()}`);
    };

    return (
        <button className="text-white self-start rounded-md p-2 text-xl font-bold bg-[#2F4A4D]" title={`${type} oferta`}
            aria-label={`${type} oferta`} aria-hidden="true"
            onClick={handleEditOffer}
        >
            {repeat ? <FaArrowUp /> : <LuPenSquare />}
        </button>
    )
}