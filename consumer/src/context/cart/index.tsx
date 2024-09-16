"use client";
import React, { ReactNode, createContext, useContext, useState } from "react";

export interface ProductCart {
  id: string;
  name: string;
  price: number;
  pricing: "UNIT" | "WEIGHT";
  image: string;
  amount: number;
  description: string;
  quantity: number;
  offerId: string;
  expandDescription?: boolean;
}

interface CartContextProps {
  cart: ProductCart[];
  setCart: (cart: ProductCart[] | []) => void
}

const CartContext = createContext<CartContextProps>({
  cart: [],
  setCart: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState([] as ProductCart[] | []);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartProvider() {
  const context = useContext(CartContext);
  return context;
}
