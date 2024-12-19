"use client";

import { CartProvider } from "@consumer/context/cart";
import Header from "../_components/header";

export default function Produtores({ children }: React.PropsWithChildren) {
  console.log("ProdutoresLayout carregado!");
  return (
    <CartProvider>
      <div className="w-full h-screen overflow-hidden">
        <Header />
        {children}
      </div>
    </CartProvider>
  );
}
