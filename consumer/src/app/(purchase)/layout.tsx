"use client";

import { CartProvider } from "@consumer/context/cart";
import Header from "../_components/header";
import { TelegramProvider } from "@consumer/context/telegram";

export default function Produtores({ children }: React.PropsWithChildren) {
  return (
    <TelegramProvider>
      <CartProvider>
        <div className="w-full h-screen overflow-hidden">
          <Header />
          {children}
        </div>
      </CartProvider>
    </TelegramProvider>
  );
}
