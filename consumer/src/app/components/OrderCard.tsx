import { useEffect, useState } from "react";
import { useCartProvider } from "@consumer/context/cart";
import { OfferWithProductDTO } from "@shared/interfaces/dtos/offer-with-product-dto";

import { ProductCard } from "@consumer/app/components/ProductCard";
import { FaRegTrashCan } from "react-icons/fa6";

interface OrderCardProps {
  offer: OfferWithProductDTO;
  exclude: boolean;
}

export default function OrderCard({
  offer,
  exclude = false,
}: OrderCardProps) {
  const [count, _setCount] = useState(0);

  const setCount = (value: number) => {
    if (isNaN(value)) {
      _setCount(0);
      return;
    }
    if (value <= 0) {
      removeOrder(offer.id);
      _setCount(0);
      return;
    }
    if (offer.product.pricing === "UNIT" && value > offer.amount) {
      _setCount(offer.amount);
      return;
    } else if (
      offer.product.pricing === "WEIGHT" &&
      value * 500 > offer.amount
    ) {
      console.log(Math.floor(offer.amount / 500));
      _setCount(Math.floor(offer.amount / 500));
      return;
    }

    const order = findOrderByOfferId(offer.id);
    if (order) {
      updateOrderAmount(offer.id, value);
    } else {
      addOrder({
        offer,
        amount: value,
      });
    }

    _setCount(value);
    console.log(cart);
  };

  const { cart, addOrder, removeOrder, updateOrderAmount, findOrderByOfferId } =
    useCartProvider();

  useEffect(() => {
    const order = findOrderByOfferId(offer.id);
    if (order) {
      _setCount(order.amount);
    } else {
      _setCount(0);
    }
  });

  return (
    <ProductCard.Root>
      <ProductCard.Body>
        <ProductCard.Image product={offer.product} />
        <ProductCard.Info>
          <ProductCard.InfoHeader>
            <p
              className="text-left text-base leading-5 font-bold
            text-[#2F4A4D] truncate"
            >
              {offer.product.name}
            </p>
            {exclude && (
              <button onClick={() => removeOrder(offer.id)}>
                <span className="text-battleship-gray">
                  {" "}
                  <FaRegTrashCan className="h-inherit text-xl"/>{" "}
                </span>
              </button>
            )}
          </ProductCard.InfoHeader>
          <ProductCard.Description description={offer.description || ""} />
        </ProductCard.Info>
      </ProductCard.Body>

      <ProductCard.Footer>
        <ProductCard.CostAmount
          price={offer.price}
          pricing={offer.product.pricing}
          amount={count}
        />
        <ProductCard.ControlAmount amount={count} setAmount={setCount} offer={offer} />
      </ProductCard.Footer>
    </ProductCard.Root>
  );
}
