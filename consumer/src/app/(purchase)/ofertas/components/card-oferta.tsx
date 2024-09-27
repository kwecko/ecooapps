import { Offer } from "@consumer/app/_actions/fetch-catalogs-by-id";
import Image, { ImageLoader } from "next/image";
import { useEffect, useState } from "react";
import { useCartProvider } from "../../../../context/cart";

export default function CardOferta({
  offer,
  exclude,
}: {
  offer: Offer;
  exclude: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(false);


  const toggleDescription = (offer: any) => {
    offer.expandDescription = !offer.expandDescription;
    setIsExpanded(!isExpanded);
  };

  const mapQuantity = {
    UNIT: 1,
    WEIGHT: 500,
  };

  const mapPrice = {
    UNIT: 1,
    WEIGHT: 2,
  };

  const mapPriceText = {
    UNIT: "unid.",
    WEIGHT: "kg",
  };

  const mapTextQuantity = {
    UNIT: `unid.`,
    WEIGHT: `${mapQuantity["WEIGHT"]}g`,
  };

  const [count, setCount] = useState(0);
  const { cart, setCart } = useCartProvider();

  useEffect(() => {
    offer.expandDescription = false;
    let indexProductCart = cart.findIndex((productCart) => {
      return (
        productCart.id == offer.product.id && productCart.offerId == offer.id
      );
    });
    if (indexProductCart !== -1) {
      setCount(cart[indexProductCart].quantity);
    }
  }, [cart, offer.id]);

  const handleAdd = () => {
    let indexProductCart = cart.findIndex(
      (productCart) =>
        productCart.id == offer.product.id && productCart.offerId == offer.id
    );
    let newCart = [...cart];

    if (indexProductCart === -1) {
      newCart.push({
        id: offer.product.id,
        name: offer.product.name,
        image: offer.product.image,
        price: offer.price / mapPrice[offer.product.pricing],
        pricing: offer.product.pricing,
        amount: offer.amount,
        description: offer.description,
        quantity: count + 1,
        offerId: offer.id,
        expandDescription: false,
      });
      setCount(count + 1);
      setCart(newCart);
      return;
    }

    newCart[indexProductCart].quantity = count + 1;
    setCount(count + 1);
    setCart(newCart);
  };

  const handleRemove = () => {
    let indexProductCart = cart.findIndex(
      (productCart) =>
        productCart.id == offer.product.id && productCart.offerId == offer.id
    );
    let newCart = [...cart];

    newCart[indexProductCart].quantity = count - 1;
    setCount(count - 1);
    setCart(newCart);

    if (newCart[indexProductCart].quantity == 0) {
      newCart.splice(indexProductCart, 1);
      setCart(newCart);
    }
  };

  const imageLoader: ImageLoader = ({ src }) => {
    return `https://res.cloudinary.com/dwm7zdljf/image/upload/v1706539060/products/256x256_${src}`;
  };

  return (
    <div className="w-[350px] bg-[rgb(246,246,246)] flex flex-col rounded-2xl justify-start p-2.5 items-start">
      {/* Product div */}
      <div className="flex flex-row w-full gap-2.5">
        <div className="relative h-24 w-24 rounded-xl shrink-0">
          <Image
            className="rounded-xl h-24 w-24"
            loader={imageLoader}
            src={offer.product.image}
            width={100}
            height={100}
            alt={`${offer.product.name.toLowerCase()}.jpg`}
          />
          <div className="absolute flex justify-center bottom-0 right-0 bg-[#3E5155] text-white items-center w-12 h-5 rounded-tl-xl rounded-br-xl text-xs">
            {mapTextQuantity[offer.product.pricing]}
          </div>
        </div>
        <div className="flex flex-col w-full h-full justify-between">
          <div className="flex flex-col justify-between w-full">
            <p className="w-full text-left font-poppins text-base leading-5 font-bold
            text-[#2F4A4D]">
              {offer.product.name}
            </p>
            {/* Description div */}
            <div className="w-[calc(100%-2.5rem)]">
              {offer.description && offer.description.length <= 70 ? (
                <p className="w-full text-left font-poppins text-xs text-[#2F4A4D]">
                  {offer.description}
                </p>
              ) : null}

              {offer.description && offer.description.length > 70 ? (
                <>
                  <p className="w-full text-left font-poppins text-xs text-[#2F4A4D]">
                    {offer.expandDescription
                      ? offer.description
                      : `${offer?.description?.slice(0, 70)}...`}
                  </p>
                  <p>
                    <button
                      onClick={() => toggleDescription(offer)}
                      className="text-[#2F4A4D] text-xs font-semibold underline"
                    >
                      {offer.expandDescription ? "Fechar" : "Leia mais"}
                    </button>
                  </p>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Order div */}
      <div className="w-full flex flex-row justify-between gap-2.5">
        {/* Price div */}
        <div className="flex flex-col items-end w-full">
          <p className="font-poppins text-xs font-bold text-battleship-gray">
            {offer.product.pricing === "UNIT" && (
              <span>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(offer.price)}<span className="text-[10px]">/unid.</span>
              </span>
            )}
            {offer.product.pricing === "WEIGHT" && (
              <span>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(offer.price / 2)}<span className="text-[10px]">/500g</span>
              </span>
            )}
          </p>
          <p className="font-poppins text-lg font-bold text-slate-gray">
            {count > 0 ? (
              <>
                {
                  offer.product.pricing === "UNIT" && (
                    <span>
                      {(
                        (offer.price) * count
                      ).toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  )
                }
                {offer.product.pricing === "WEIGHT" && (
                  <span>
                    {(
                      (offer.price / 2) * count
                    ).toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}<span className="text-sm">/{count * 0.5}kg</span>
                  </span>
                )}
              </>
            ) : (
              <span>
                {(0).toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            )}
          </p>
        </div>
        {/* Control amount div */}
        <div className="flex flex-col justify-end items-end w-[86px]">
          <div className="bg-white rounded-md flex flex-row w-[86px] h-7">
            <div className="flex items-center justify-center">
              <button
                type="button"
                className={
                  count != 0
                    ? "text-[#00735E] text-2xl p-1.5"
                    : "text-[#00735E] text-2xl p-1.5 opacity-25"
                }
                onClick={handleRemove}
                disabled={count == 0}
              >
                -
              </button>
            </div>
            <div className="w-9 flex items-center justify-center">
              <p className="font-poppin text-base text-center text-[#2F4A4D] p-1">
                {count}
              </p>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="button"
                className={
                  count !=
                    Math.floor(offer.amount / mapQuantity[offer.product.pricing])
                    ? "text-[#00735E] text-2xl p-1.5"
                    : "text-[#00735E] text-2xl p-1.5 opacity-25"
                }
                onClick={handleAdd}
                disabled={
                  count ==
                  Math.floor(offer.amount / mapQuantity[offer.product.pricing])
                }
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
