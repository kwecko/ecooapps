"use client";

import { useEffect, useState } from "react";
import { useCartProvider } from "../../context/cart";
import Script from "next/script";
import { convertPricingToQuantityInGrams } from "@shared/utils/convert-unit";

export default function sendTelegram() {
  const { cart } = useCartProvider();
  const [totalPurchase, setTotalPurchase] = useState(0);

  useEffect(() => {
    const tg = (window as any).Telegram.WebApp;
    tg.onEvent("mainButtonClicked", sendData);
    return () => {
      tg.offEvent("mainButtonClicked", sendData);
    };
  });

  useEffect(() => {
    const tg = (window as any).Telegram.WebApp;

    tg.MainButton.setParams({
      text: "Fazer Pedido",
      color: "#00735E",
    });
  });

  useEffect(() => {
    const tg = (window as any).Telegram.WebApp;
    tg.MainButton.show();
  }, [cart]);

  useEffect(() => {
    let total = 0;

    cart.forEach((productCart) => {
      const price = productCart.offer.product.pricing === "UNIT" ? productCart.offer.price : productCart.offer.price * 0.5;
      total = total + price * productCart.amount;
    });

    setTotalPurchase(total);
  }, [cart]);

  const sendData = async () => {
    const tg = (window as any).Telegram.WebApp;

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
        price: productCart.offer.product.pricing === "UNIT" ? productCart.offer.price : productCart.offer.price * 0.5,
        amount: productCart.offer.amount,
        quantity: productCart.amount,
        pricing: productCart.offer.product.pricing,
      })),
      total: totalPurchase,
    };

    await tg.sendData(JSON.stringify(purchase));
  };

  return (<> </>);
}
