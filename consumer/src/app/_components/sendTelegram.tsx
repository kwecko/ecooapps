"use client";

import { useEffect, useState } from "react";
import { useCartProvider } from "../../context/cart";
import Script from "next/script";

export default function sendTelegram() {
  const { cart } = useCartProvider();
  const [ totalPurchase, setTotalPurchase ] = useState(0);

  const mapQuantity = {
    "UNIT": 1,
    "WEIGHT": 500
  };

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
      total = total + (productCart.price * productCart.quantity);
    });

    setTotalPurchase(total);
    
  }, [cart]);

  const sendData = async () => {
    const tg = (window as any).Telegram.WebApp;

    cart.map((productCart) => {
      productCart.quantity = productCart.quantity * mapQuantity[productCart.pricing];
    });

    const purchase = {
      products: cart,
      total: totalPurchase
    }

    await tg.sendData(JSON.stringify(purchase));
  };

  return (
    <>
    </>
  );
}
