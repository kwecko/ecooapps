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
    <div className="min-w-[350px] min-h-[156px] bg-[rgb(246,246,246)] flex rounded-2xl ml-2.5 mr-6 mt-4 mb-4">
      <div className="flex-none relative h-24 w-24 rounded-xl mt-3 mr-3 ml-3 mb-11">
        <Image
          className="rounded-xl"
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
      <div className="flex flex-col w-52 min-h-28 m-2.5">
        <div className="grow">
          <p className="w-full text-left font-poppins text-base text-[#2F4A4D]">
            {offer.product.name}
          </p>
          {offer.description && offer.description.length <= 70 ? (
            <div>
              <p className="w-full text-left font-poppins text-xs text-[#2F4A4D]">
                {offer.description}
              </p>
            </div>
          ) : null}

          {offer.description && offer.description.length > 70 ? (
            <div>
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
                  {offer.expandDescription ? "Leia menos" : "Leia mais"}
                </button>
              </p>
            </div>
          ) : null}
        </div>
        <div className="flex flex-row min-h-8">
          <div className="w-[124px] mr-2.5">
            <p className="w-full text-left font-poppins text-base text-[#2F4A4D] pt-3">
              {offer.price.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
              /{mapPriceText[offer.product.pricing]}
            </p>
          </div>

          <div className="flex-none bg-white rounded-md flex flex-row w-[86px] h-[30px] mt-2.5">
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
    </div>
  );
}
