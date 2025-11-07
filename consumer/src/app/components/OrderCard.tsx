import { useCartProvider } from "@consumer/context/cart";
import { use, useEffect, useState } from "react";

import { ProductCard } from "@consumer/app/components/ProductCard";
import { FarmDTO, OfferDTO } from "@shared/interfaces/dtos";
import { FaRegTrashCan } from "react-icons/fa6";

interface OrderCardProps {
  offer: OfferDTO;
  farm: FarmDTO;
  exclude: boolean;
}

export default function OrderCard({ offer, farm, exclude = false }: OrderCardProps) {
  const [count, _setCount] = useState(0);


	useEffect(() => {
		if(!offer.total){
			offer.total = ((farm.fee / 100) + 1 ) * offer.price;
		}
	}, [offer, farm.fee]);

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
      _setCount(Math.floor(offer.amount / 500));
      return;
    }

    const order = findOrderByOfferId(offer.id);
    if (order) {
      updateOrderAmount(offer.id, value);
    } else {
      addOrder({
        offer,
        farm,
        amount: value,
      });
    }

    _setCount(value);
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
						<div className="flex flex-row items-center justify-between w-full">
							<p className="text-left text-base leading-5 font-bold text-theme-home-bg">
								{offer.product.name}
							</p>
							{exclude && (
								<button onClick={() => removeOrder(offer.id)}>
									<span className="text-battleship-gray">
										{" "}
										<FaRegTrashCan className="h-inherit text-xl" />{" "}
									</span>
								</button>
							)}
						</div>
						<div>
							<p className="font-poppins text-xs font-semibold text-theme-primary">
								{farm.name}
							</p>
						</div>
          </ProductCard.InfoHeader>
          <ProductCard.Description description={offer.description || ""} />
        </ProductCard.Info>
      </ProductCard.Body>

      <ProductCard.Footer>
        <ProductCard.CostAmount
          price={offer.total}
          pricing={offer.product.pricing}
          amount={count}
        />
        <ProductCard.ControlAmount
          amount={count}
          setAmount={setCount}
          offer={offer}
        />
      </ProductCard.Footer>
    </ProductCard.Root>
  );
}
