"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import { LuTrash2 } from "react-icons/lu";

import useVenderPage from "./index";
import Title from "@admin/app/components/Title";
import Button from "@shared/components/ButtonV2";
import SearchInput from "@shared/components/SearchInput";
import FinalizeSaleModal from "./components/FinalizeSaleModal";
import CreatePaymentModal from "./components/CreatePaymentModal";
import { formatPrice } from "@shared/utils/format-price";
import { addTaxToPrice } from "@shared/utils/convert-tax";
import { convertUnitToLabel, convertPricingToQuantityInGrams } from "@shared/utils/convert-unit";
import { OfferDTO } from "@shared/interfaces/dtos";
import { CreatePaymentDTO } from "@shared/interfaces/dtos/payment-dto";
import { createPayment } from "@admin/_actions/payment/create-bag-payment";
import { useHandleError } from "@shared/hooks/useHandleError";
import { toast } from "sonner";
import { useTransition } from "react";

interface CartItem {
  offer: OfferDTO;
  quantity: number;
}

function VenderPage() {
  const router = useRouter();
  const {
    market_id,
    search,
    setSearch,
    offers,
    isPending,
  } = useVenderPage();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [bagId, setBagId] = useState<string>("");
  const [isPendingPayment, startPaymentTransition] = useTransition();
  const { handleError } = useHandleError();

  const handleAddToCart = (offer: OfferDTO) => {
    const existingItem = cart.find((item) => item.offer.id === offer.id);
    const increment = offer.product.pricing === "WEIGHT" ? 0.5 : 1;
    
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.offer.id === offer.id
            ? { ...item, quantity: item.quantity + increment }
            : item
        )
      );
    } else {
      setCart([...cart, { offer, quantity: increment }]);
    }
  };

  const handleUpdateQuantity = (offerId: string, delta: number) => {
    setCart(
      cart
        .map((item) => {
          if (item.offer.id === offerId) {
            const increment = item.offer.product.pricing === "WEIGHT" ? 0.5 : 1;
            const minQuantity = increment; // 0.5 para WEIGHT, 1 para UNIT
            const newQuantity = item.quantity + (delta * increment);
            return { ...item, quantity: Math.max(minQuantity, newQuantity) };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveFromCart = (offerId: string) => {
    setCart(cart.filter((item) => item.offer.id !== offerId));
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => {
      const unitPrice = item.offer.price;
      return sum + unitPrice * item.quantity;
    }, 0);
  };

  const calculateTax = () => {
    return cart.reduce((sum, item) => {
      const unitPrice = item.offer.price;
      const priceWithTax = addTaxToPrice(unitPrice, 0.2);
      const tax = priceWithTax - unitPrice;
      return sum + tax * item.quantity;
    }, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleAvançar = () => {
    if (cart.length === 0) {
      return;
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOrderCreated = (bag_id: string) => {
    setBagId(bag_id);
    setIsPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setBagId("");
    router.push(`/feiras-do-dia/${market_id}/vendas`);
  };

  const handleCreatePayment = (payment: CreatePaymentDTO) => {
    startPaymentTransition(async () => {
      const response = await createPayment({
        data: {
          bag_id: payment.bag_id,
          method: payment.method,
          flag: payment.flag,
        },
      });

      if (response.message) {
        handleError(response.message);
        return;
      }

      toast.success("Pagamento criado com sucesso!");
      handleClosePaymentModal();
    });
  };

  const handleBack = () => {
    router.back();
  };


  const isProductInCart = (offerId: string) => {
    return cart.some((item) => item.offer.id === offerId);
  };

  return (
    <div className="w-full flex flex-col h-full gap-4 overflow-y-hidden items-stretch relative">
      <div className="flex items-center gap-4 w-full">
        <Title>Sacola</Title>
        <div className="flex-1">
          <SearchInput
            placeholder="Buscar por nome do produto"
            onChange={setSearch}
            value={search}
            type="primary"
            className="w-full"
          />
        </div>
      </div>

      <div className="w-full flex flex-col gap-4 h-full overflow-y-auto">

        {offers.length > 0 && (
          <div className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <div className="grid grid-cols-5 gap-4 text-sm font-semibold text-gray-700">
                <div>Produto</div>
                <div>Produtor</div>
                <div>Preço</div>
                <div>Taxas</div>
                <div className="text-center">Ações</div>
              </div>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className="grid grid-cols-5 gap-4 px-4 py-3 border-b border-gray-100 hover:bg-gray-50 items-center"
                >
                  <div className="text-sm">{offer.product.name}</div>
                  <div className="text-sm text-gray-600">{offer.farm.name}</div>
                  <div className="text-sm font-medium">
                    {formatPrice(offer.price)} / {convertUnitToLabel(offer.product.pricing)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatPrice(addTaxToPrice(offer.price, 0.2) - offer.price)} / {convertUnitToLabel(offer.product.pricing)}
                  </div>
                  <div className="flex justify-center">
                    {isProductInCart(offer.id) ? (
                      <span className="px-3 py-1 bg-gray-300 text-gray-600 rounded-md text-sm cursor-not-allowed">
                        Adicionado
                      </span>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(offer)}
                        className="px-3 py-1 bg-rain-forest text-white rounded-md text-sm hover:bg-rain-forest/90 transition-colors"
                      >
                        Adicionar
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {cart.length > 0 && (
          <div className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <div className="grid grid-cols-5 gap-4 text-sm font-semibold text-gray-700">
                <div>Produto</div>
                <div>Produtor</div>
                <div>Preço</div>
                <div>Taxas</div>
                <div className="text-center">Quantidade</div>
              </div>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {cart.map((item) => {
                const unitPrice = item.offer.price;
                const priceWithTax = addTaxToPrice(unitPrice, 0.2);
                const tax = priceWithTax - unitPrice;
                const subtotal = unitPrice * item.quantity;
                const totalTax = tax * item.quantity;

                return (
                  <div
                    key={item.offer.id}
                    className="grid grid-cols-5 gap-4 px-4 py-3 border-b border-gray-100 hover:bg-gray-50 items-center"
                  >
                    <div className="text-sm">{item.offer.product.name}</div>
                    <div className="text-sm text-gray-600">{item.offer.farm.name}</div>
                    <div className="text-sm font-medium">
                      {formatPrice(subtotal)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatPrice(totalTax)}
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleUpdateQuantity(item.offer.id, -1)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                      >
                        <HiOutlineMinus size={16} />
                      </button>
                      <span className="text-sm font-medium text-center min-w-[80px]">
                        {item.quantity % 1 === 0 ? item.quantity : item.quantity.toFixed(1)} {item.offer.product.pricing === "WEIGHT" ? "kg" : "un."}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(item.offer.id, 1)}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                      >
                        <HiOutlinePlus size={16} />
                      </button>
                      <button
                        onClick={() => handleRemoveFromCart(item.offer.id)}
                        className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors text-red-600"
                        title="Remover produto"
                      >
                        <LuTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div className="text-sm font-semibold text-gray-700">TOTAL</div>
                <div className="flex gap-4">
                  <div className="text-sm font-medium">
                    Preço: {formatPrice(calculateSubtotal())}
                  </div>
                  <div className="text-sm font-medium">
                    Taxas: {formatPrice(calculateTax())}
                  </div>
                  <div className="text-sm font-bold">
                    TOTAL: {formatPrice(calculateTotal())}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {isPending && (
          <div className="text-center py-8 text-gray-500">
            Carregando produtos...
          </div>
        )}

        {!isPending && offers.length === 0 && search && (
          <div className="text-center py-8 text-gray-500">
            Nenhum produto encontrado
          </div>
        )}
      </div>

      <div className="flex justify-end gap-3 mt-auto pt-4 border-t border-gray-200">
        <Button
          variant="default"
          onClick={handleBack}
          className="bg-tertiary text-slate-dark border-none w-32"
        >
          Voltar
        </Button>
        <Button
          variant="default"
          onClick={handleAvançar}
          disabled={cart.length === 0}
          className="bg-rain-forest border-none w-32"
        >
          Avançar
        </Button>
      </div>

      {isModalOpen && (
        <FinalizeSaleModal
          isOpen={isModalOpen}
          closeModal={handleCloseModal}
          market_id={market_id}
          cart={cart}
          subtotal={calculateSubtotal()}
          tax={calculateTax()}
          total={calculateTotal()}
          onOrderCreated={handleOrderCreated}
        />
      )}

      {isPaymentModalOpen && bagId && (
        <CreatePaymentModal
          isOpen={isPaymentModalOpen}
          bag_id={bagId}
          total={calculateTotal()}
          loading={isPendingPayment}
          createNewPayment={handleCreatePayment}
          closeModal={handleClosePaymentModal}
        />
      )}
    </div>
  );
}

export default dynamic(() => Promise.resolve(VenderPage), { ssr: false });
