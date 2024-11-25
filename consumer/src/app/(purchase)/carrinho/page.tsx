"use client";

import SendTelegram from "@consumer/app/_components/sendTelegram";
import OrderCard from "@consumer/app/components/OrderCard";
import Modal from "@shared/components/Modal";
import { formatPrice } from "@shared/utils/format-price";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCartProvider } from "../../../context/cart";

export default function FinalizarCompras() {
  const router = useRouter();
  const { cart, setCart } = useCartProvider();
  const [cartByFarm, setCartByFarm] = useState(
    {} as Record<string, typeof cart>
  );
  const [totalPurchase, setTotalPurchase] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFarmId, setOpenFarmId] = useState<string | null>(null);
  const [openFarmIds, setOpenFarmIds] = useState<string[]>([]);

  const toggleAccordion = (farmId: string) => {
    if (openFarmIds.includes(farmId))
      setOpenFarmIds(openFarmIds.filter((id) => id !== farmId));
    else setOpenFarmIds([...openFarmIds, farmId]);
  };

  useEffect(() => {
    let total = 0;

    cart.forEach((productCart) => {
      if (productCart.offer.product.pricing === "UNIT") {
        total = total + productCart.offer.price * productCart.amount;
      } else if (productCart.offer.product.pricing === "WEIGHT") {
        total =
          total + (productCart.offer.price * productCart.amount * 500) / 1000;
      }
    });

    setTotalPurchase(total);
  }, [cart]);

  useEffect(() => {
    const groupedByFarm = cart.reduce((acc, item) => {
      const farmId = item.offer.farm.id;
      if (!acc[farmId]) {
        acc[farmId] = []; // Inicializa o array se não existir
      }
      acc[farmId].push(item); // Adiciona o item ao array correspondente
      return acc;
    }, {} as Record<string, typeof cart>); //

    setCartByFarm(groupedByFarm);
  }, [cart]);

  return (
    <div className="flex flex-col h-full">
      <div className="px-3 w-full overflow-y-scroll flex flex-col items-center gap-3.5 h-full pt-3.5 mb-5">
        {cartByFarm && Object.keys(cartByFarm).length !== 0
          ? Object.keys(cartByFarm).map((farmId) => {
              return (
                <>
                  <div className="w-full h-10 pl-4 pt-3 text-theme-primary ">
                    <button
                      onClick={() => toggleAccordion(farmId)}
                      className="w-full flex items-center gap-1.5 font-poppins text-xs font-normal"
                    >
                      <span>{cartByFarm[farmId][0].offer.farm.name}</span>
                      <span>
                        {openFarmIds.includes(farmId) ? (
                          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L5 5L9 1" stroke="#2F4A4D" />
                          </svg>
                        ) : (
                          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 5L5 1L9 5" stroke="#2F4A4D" />
                          </svg>
                        )}
                      </span>
                    </button>
                  </div>

                  {openFarmIds.includes(farmId)
                    ? cartByFarm[farmId].map((product, index) => {
                        return (
                          <OrderCard
                            key={index}
                            offer={product.offer}
                            exclude={true}
                          />
                        );
                      })
                    : null}
                </>
              );
            })
          : ""}
        <div>
          <button
            className="w-50 h-10 rounded-md text-center bg-theme-primary text-white font-poppins text-xs font-semibold"
            onClick={() => router.push("/inicio")}
          >
            Adicionar Produtos
          </button>
        </div>
        {cart.length != 0 && (
          <div>
            <button
              className="text-theme-primary font-poppins text-xs font-semibold"
              onClick={() => setIsModalOpen(true)}
            >
              Limpar Carrinho
            </button>
            {isModalOpen && (
              <Modal
                bgCloseModal="white"
                bgConfirmModal="#FF7070"
                bgOpenModal="#2F4A4D"
                modalAction={() => setCart([])}
                titleCloseModal="Não"
                titleConfirmModal="Sim"
                titleContentModal="Deseja limpar todos os itens do carrinho?"
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
              />
            )}
          </div>
        )}
      </div>

      <div className="sticky bottom-0 h-12.25 bg-theme-background flex flex-col">
        <div className="bg-french-gray ml-5 mr-5 w-86 border"></div>
        <div className="px-5 w-full font-inter">
          <span className="w-1/2 text-left text-xs p-2 inline-block text-theme-home-bg">
            Total:
          </span>
          <span className="w-1/2 text-right text-xl font-semibold text-theme-highlight font-inter p-2 inline-block">
            {formatPrice(totalPurchase)}
          </span>
        </div>
      </div>
      <div className="min-h-17">
        <SendTelegram />
      </div>
    </div>
  );
}
