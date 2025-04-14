"use client";

import { useTelegram } from "@consumer/context/telegram";
import { convertPricingToQuantityInGrams } from "@shared/utils/convert-unit";
import { useEffect, useState } from "react";
import { useCartProvider } from "../../context/cart";

export default function sendTelegram() {
  const { cart } = useCartProvider();
  const [totalPurchase, setTotalPurchase] = useState(0);
  const tg = useTelegram();

  useEffect(() => {
    tg.onEvent("mainButtonClicked", sendData);
    return () => {
      tg.offEvent("mainButtonClicked", sendData);
    };
  }, [tg, cart, totalPurchase]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Fazer Pedido",
      color: "#00735E",
    });
  }, [tg]);

  useEffect(() => {
    tg.MainButton.show();
  }, [tg]);

  useEffect(() => {
    let total = 0;

    cart.forEach((productCart) => {
      const price = productCart.offer.product.pricing === "UNIT" ? productCart.offer.total : productCart.offer.total * 0.5;
      total = total + price * productCart.amount;
    });

    setTotalPurchase(total);
  }, [cart, tg]);

  const sendData = async () => {
    cart.map((productCart) => {
      productCart.amount =
        productCart.amount * convertPricingToQuantityInGrams(productCart.offer.product.pricing);
    });

    const purchase = {
      products: cart.map((productCart) => ({
        offerId: productCart.offer.id,
        id: productCart.offer.id,
        name: productCart.offer.product.name,
        description: productCart.offer.description,
        price: productCart.offer.product.pricing === "UNIT" ? productCart.offer.total : productCart.offer.total * 0.5,
        amount: productCart.offer.amount,
        quantity: productCart.amount,
        pricing: productCart.offer.product.pricing,
      })),
      total: totalPurchase,
    };

    await tg.sendData(JSON.stringify(purchase));
  };

  return (<></>);
}
