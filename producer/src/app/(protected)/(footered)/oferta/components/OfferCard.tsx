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
    <>
      <div
        key={offer.id}
        className="rounded-2xl mt-2 h-[80px] w-full flex items-center justify-between gap-2 bg-white snap-start px-2"
      >
        <div className="shrink-0 grow-0 basis-16">
          <Image
            loader={imageLoader}
            src={offer.product.image}
            alt={offer.product.name}
            width={60}
            height={60}
            className="rounded-lg w-24 aspect-1/1"
          />
        </div>
        <div className="flex flex-col text-slate-gray w-full shrink-1 grow-0 truncate overflow-x-hidden">
          <div className="font-medium text-base align-bottom mt-1 truncate text-ellipsis overflow-x-hidden">
            {offer.product.name}
          </div>
          <div className="text-xs text-slate-gray">
            Qtd.:{" "}
            {offer.product.pricing === "UNIT" ? (
              <span>{offer.amount} unidade{offer.amount > 1 ? "s" : ""}</span>
            ) : (
              <span>{offer.amount / 1000} kg</span>
            )}
          </div>
          <div className="text-xs text-slate-gray">
            Preço:{" "}
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format((offer.price*10)/12)} +20%
          </div>
        </div>
        <div className="flex flex-row justify-end shrink-0 grow-0 basis-16 gap-2 align-start h-full pt-3">
          <EditOfferButton offer={offer} />
          {
            onDeleteCard && (
              <DeleteOfferButton offerId={offer.id} productName={offer.product.name} onDeleteCard={onDeleteCard} />
            )
          }
        </div>
      </div>
    </>
  );
}
