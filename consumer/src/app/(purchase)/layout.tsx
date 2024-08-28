"use client";

import { CartProvider } from "@consumer/context/cart";
import Header from "../_components/header";
import SendTelegram from "../_components/sendTelegram";

export default function Produtores({ children }: React.PropsWithChildren) {
  return (
    <>
      <CartProvider>
        <div className="w-full h-screen overflow-hidden">
          <Header />
          {children}
        </div>
      </CartProvider>
    </>
  );
}
