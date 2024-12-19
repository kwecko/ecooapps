"use client";

import { useTelegram } from "@consumer/context/telegram";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RedirectCart() {
  const router = useRouter();
  const tg = useTelegram();

  useEffect(() => {
    tg.onEvent("mainButtonClicked", () => router.push("/carrinho"));
    return () => {
      tg.offEvent("mainButtonClicked", () => router.push("/carrinho"));
    };
  }, [tg]);	

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Ver Carrinho",
      color: "#545F71",
    });
  }, [tg]);

  useEffect(() => {
    tg.MainButton.show();
  }, [tg]);

  return <></>;
}
