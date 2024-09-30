import { OfferWithProductDTO } from "@shared/domain/dtos/offer-with-product-dto";
import Image, { ImageLoader } from "next/image";
import EditOfferButton from "./EditOfferButton";
import DeleteOfferButton from "./DeleteOfferButton";
import {
  convertUnitFull,
  convertOfferAmount,
} from "@shared/utils/convert-unit";
import { removeTaxFromPrice } from "@shared/utils/convert-tax";

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
      className="rounded-2xl w-full flex items-start justify-between gap-2 bg-white snap-start px-2.5 pr-3.5 pb-4 pt-3"
    >
      <div className="shrink-0 grow-0 basis-16 max-h-15 max-w-15">
        <Image
          loader={imageLoader}
          src={offer.product.image}
          alt={offer.product.name}
          width={60}
          height={60}
          className="rounded-2.5 w-24 aspect-1/1 h-15"
        />
      </div>
      <div className="flex flex-col text-theme-default tracking-tight-2 w-full shrink-1 grow-0 truncate overflow-x-hidden pl-1">
        <div className="font-medium text-base leading-5 align-bottom pt-1.5 pb-1 truncate text-ellipsis overflow-x-hidden">
          {offer.product.name}
        </div>
        <div className="text-xxs leading-4">
          Qtd.:{" "}
          <span>
            {convertOfferAmount(offer.amount, offer.product.pricing)}{" "}
            {convertUnitFull(offer.product.pricing, offer.amount > 1)}
          </span>
        </div>
        <div className="text-xxs leading-4">
          Preço:{" "}
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(removeTaxFromPrice(offer.price, 0.2))}{" "}
          +20%
        </div>
      </div>
      <div className="flex flex-row h-full justify-start shrink-0 grow-0 basis-16 gap-2.5 align-start">
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
