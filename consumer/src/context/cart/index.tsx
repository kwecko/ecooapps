"use client";
import { FarmDTO, OfferDTO } from "@shared/interfaces/dtos";
import { ReactNode, createContext, useContext, useState } from "react";

interface OrderSchema {
  offer: OfferDTO;
  farm: FarmDTO;
  amount: number;
}

interface CartContextProps {
  cart: OrderSchema[];
  setCart: (cart: OrderSchema[]) => void;
  addOrder: (order: OrderSchema) => void;
  removeOrder: (offer_id: string) => void;
  findOrderByOfferId: (offer_id: string) => OrderSchema | undefined;
  updateOrderAmount: (offer_id: string, amount: number) => void;
}

const CartContext = createContext<CartContextProps>({
  cart: [],
  setCart: () => {},
  addOrder: () => {},
  removeOrder: () => {},
  findOrderByOfferId: () => undefined,
  updateOrderAmount: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<OrderSchema[]>([]);

  const addOrder = (order: OrderSchema) => {
    setCart((prevCart) => {
      const existingOrder = prevCart.find(
        (item) => item.offer.id === order.offer.id
      );
      if (existingOrder) {
        return prevCart.map((item) =>
          item.offer.id === order.offer.id
            ? { ...item, amount: item.amount + order.amount }
            : item
        );
      } else {
        return [...prevCart, order];
      }
    });
  };

  const removeOrder = (offer_id: string) => {
    setCart((prevCart) =>
      prevCart.filter((order) => order.offer.id !== offer_id)
    );
  };

  const findOrderByOfferId = (offer_id: string): OrderSchema | undefined => {
    return cart.find((order) => order.offer.id === offer_id);
  };

  const updateOrderAmount = (offer_id: string, amount: number) => {
    setCart((prevCart) =>
      prevCart.map((order) =>
        order.offer.id === offer_id ? { ...order, amount } : order
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addOrder,
        removeOrder,
        findOrderByOfferId,
        updateOrderAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartProvider() {
  return useContext(CartContext);
}
