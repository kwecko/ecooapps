"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RedirectCart() {
  const router = useRouter();
  useEffect(() => {
    const tg = (window as any).Telegram.WebApp;
    tg.onEvent("mainButtonClicked", () => router.push("/carrinho"));
    return () => {
      tg.offEvent("mainButtonClicked", () => router.push("/carrinho"));
    };
  });

  useEffect(() => {
    const tg = (window as any).Telegram.WebApp;

    tg.MainButton.setParams({
      text: "Ver Carrinho",
      color: "#545F71",
    });
  });

  useEffect(() => {
    const tg = (window as any).Telegram.WebApp;
    tg.MainButton.show();
  }, []);

  return <></>;
}
