"use client";

import SendTelegram from "@consumer/app/_components/sendTelegram";
import { useEffect, useState } from "react";
import { useCartProvider } from "../../../context/cart";
import OrderCard from "@consumer/app/components/OrderCard";
import { formatPrice } from "@shared/utils/format-price";

export default function FinalizarCompras() {
  const { cart } = useCartProvider();
  const [totalPurchase, setTotalPurchase] = useState(0);

  useEffect(() => {
    let total = 0;

    cart.forEach((productCart) => {
      if (productCart.offer.product.pricing === "UNIT") {
        total = total + productCart.offer.price * productCart.amount;
      } else if (productCart.offer.product.pricing === "WEIGHT") {
        total = total + (productCart.offer.price * productCart.amount * 500)/1000;
      }
    });

    setTotalPurchase(total);
  }, [cart]);

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 w-full overflow-y-scroll flex flex-col items-center gap-3.5 h-full pt-3.5">
        {cart && cart.length !== 0
          ? cart.map((product, index) => {
              return <OrderCard key={index} offer={product.offer} exclude={true} />;
            })
          : null}
      </div>
      <div className="sticky bottom-0 h-[49px] bg-[#F7F7F7] flex flex-col">
        <div className="bg-[#D1D1D6] ml-5 mr-5 w-[344px] border-[1px]"></div>
        <div className="px-5 w-full font-inter">
          <span className="w-1/2 text-left text-xs p-2 inline-block text-[#2F4A4D]">
            Total:
          </span>
          <span className="w-1/2 text-right text-xl font-semibold text-[#00735E] font-inter p-2 inline-block">
            {formatPrice(totalPurchase)}
          </span>
        </div>
      </div>
      <div className="min-h-[70px]">
        <SendTelegram />
      </div>
    </div>
  );
}
