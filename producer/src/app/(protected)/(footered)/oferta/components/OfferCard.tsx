import { OfferWithProductDTO } from "@shared/domain/dtos/offer-with-product-dto";
import Image, { ImageLoader } from "next/image";
import EditOfferButton from "./EditOfferButton";
import DeleteOfferButton from "./DeleteOfferButton";

interface OfferCardProps {
  offer: OfferWithProductDTO;
  onDeleteCard?: (offerId: string) => void;
}

export default function OfferCard({ offer, onDeleteCard }: OfferCardProps) {
  const imageLoader: ImageLoader = ({ src }) => {
    return `https://res.cloudinary.com/dwm7zdljf/image/upload/v1706539060/products/256x256_${src}`;
  };

  return (
    <div
      key={offer.id}
      className="rounded-2xl min-h-[5.625rem] h-[5.625rem] max-h-[5.625rem] w-full flex items-start pt-2.5 justify-between gap-2 bg-white snap-start px-2.5"
    >
      <div className="shrink-0 grow-0 basis-16 max-h-[3.75rem] max-w-[3.75rem]">
        <Image
          loader={imageLoader}
          src={offer.product.image}
          alt={offer.product.name}
          width={60}
          height={60}
          className="rounded-[10px] w-24 aspect-1/1 h-[3.75rem]"
        />
      </div>
      <div className="flex flex-col text-slate-gray w-full shrink-1 grow-0 truncate overflow-x-hidden">
        <div className="font-medium text-base align-bottom mt-1 truncate text-ellipsis overflow-x-hidden">
          {offer.product.name}
        </div>
        <div className="text-xs text-slate-gray">
          Qtd.:{" "}
          {offer.product.pricing === "UNIT" ? (
            <span>
              {offer.amount} unidade{offer.amount > 1 ? "s" : ""}
            </span>
          ) : (
            <span>{offer.amount / 1000} kg</span>
          )}
        </div>
        <div className="text-xs text-slate-gray">
          Preço:{" "}
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format((offer.price * 10) / 12)}{" "}
          +20%
        </div>
      </div>
      <div className="flex flex-row h-full justify-start shrink-0 grow-0 basis-16 gap-2 align-start">
        <EditOfferButton offer={offer} />
        {onDeleteCard && (
          <DeleteOfferButton
            offerId={offer.id}
            productName={offer.product.name}
            onDeleteCard={onDeleteCard}
          />
        )}
      </div>
    </div>
  );
}
