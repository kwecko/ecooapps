"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import ModalV2 from "@shared/components/ModalV2";
import ButtonV2 from "@shared/components/ButtonV2";
import SearchableSelect from "@admin/app/(protected)/(sidebar)/feiras-do-dia/[market_id]/estoque/components/SearchableSelect";
import Input from "@shared/components/Input";
import Loader from "@shared/components/Loader";
import { formatPrice } from "@shared/utils/format-price";
import { addTaxToPrice } from "@shared/utils/convert-tax";
import { listUsers } from "@admin/_actions/users/GET/list-users";
import { createOrder } from "@admin/_actions/orders/POST/create-order";
import { useHandleError } from "@shared/hooks/useHandleError";
import { OfferDTO } from "@shared/interfaces/dtos";

interface CartItem {
  offer: OfferDTO;
  quantity: number;
}

interface FinalizeSaleModalProps {
  isOpen: boolean;
  closeModal: () => void;
  market_id: string;
  cart: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  onOrderCreated: (bag_id: string) => void;
}

export default function FinalizeSaleModal({
  isOpen,
  closeModal,
  market_id,
  cart,
  subtotal,
  tax,
  total,
  onOrderCreated,
}: FinalizeSaleModalProps) {
  const router = useRouter();
  const [isCasualClient, setIsCasualClient] = useState(true);
  const [selectedUser, setSelectedUser] = useState<{ value: string; label: string } | null>(null);
  const [isPending, startTransition] = useTransition();
  const { handleError } = useHandleError();

  const searchUsers = async (search: string): Promise<{ value: string; label: string }[]> => {
    try {
      const trimmedSearch = search.trim();
      if (trimmedSearch.length < 3) {
        return [];
      }

      const nameParts = trimmedSearch.split(" ");
      const first_name = nameParts[0] || "";
      const last_name = nameParts.slice(1).join(" ") || "";

      const response = await listUsers({
        page: 1,
        first_name: first_name,
        last_name: last_name || undefined,
        roles: "USER",
      });

      if (response.message) {
        handleError(response.message);
        return [];
      }

      const users = response.data || [];
      return users.map((user: any) => ({
        value: user.id,
        label: `${user.first_name} ${user.last_name}`.trim(),
      }));
    } catch {
      return [];
    }
  };

  const handleSubmit = () => {
    if (!isCasualClient && !selectedUser) {
      toast.error("Selecione um cliente ou marque como cliente avulso");
      return;
    }

    if (cart.length === 0) {
      toast.error("Adicione pelo menos um produto à venda");
      return;
    }

    startTransition(async () => {
      const orders = cart.map((item) => ({
        offer_id: item.offer.id,
        amount: item.offer.product.pricing === "UNIT" 
          ? item.quantity 
          : item.quantity * 1000,
      }));

      const orderData: any = {
        market_id,
        orders,
      };

      if (!isCasualClient && selectedUser) {
        orderData.user_id = selectedUser.value;
      }

      const response = await createOrder(orderData);

      if (response.message) {
        handleError(response.message);
        return;
      }

      const bag_id = response.data?.id || response.data?.bag_id;
      if (!bag_id) {
        handleError("Erro ao criar venda. ID da sacola não encontrado.");
        return;
      }

      toast.success("Venda realizada com sucesso!");
      closeModal();
      onOrderCreated(bag_id);
    });
  };

  const handleClose = () => {
    setIsCasualClient(true);
    setSelectedUser(null);
    closeModal();
  };

  return (
    <ModalV2
      isOpen={isOpen}
      closeModal={handleClose}
      className="w-152 bg-white text-coal-black"
      title="Vender"
      iconClose={true}
    >
      <div className="flex flex-col gap-4 max-h-[calc(95vh-140px)] overflow-y-auto pr-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cliente avulso?
          </label>
          <select
            value={isCasualClient ? "sim" : "nao"}
            onChange={(e) => {
              setIsCasualClient(e.target.value === "sim");
              if (e.target.value === "sim") {
                setSelectedUser(null);
              }
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-highlight focus:border-transparent"
          >
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
          </select>
        </div>

        <SearchableSelect
          label="Qual o nome do consumidor?"
          placeholder="Digite para buscar o consumidor..."
          value={selectedUser}
          onSearch={searchUsers}
          onChange={(option) => setSelectedUser(option)}
          disabled={isCasualClient}
        />

        <div className="border-t border-gray-200 pt-4 mt-2">
          <div className="flex flex-col gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preço de custo:
              </label>
              <Input
                type="text"
                value={formatPrice(subtotal)}
                disabled
                className="text-theme-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Taxa:
              </label>
              <Input
                type="text"
                value="20%"
                disabled
                className="text-theme-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                TOTAL:
              </label>
              <Input
                type="text"
                value={formatPrice(total)}
                disabled
                className="text-theme-primary font-bold"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center gap-4 pt-4 border-t border-gray-200">
          <ButtonV2
            variant="default"
            type="button"
            onClick={handleClose}
            className="bg-tertiary text-slate-dark border-none"
          >
            Cancelar
          </ButtonV2>
          <ButtonV2
            variant="default"
            type="button"
            onClick={handleSubmit}
            className="bg-rain-forest border-none"
            disabled={isPending}
          >
            {isPending ? <Loader loaderType="login" /> : "Vender"}
          </ButtonV2>
        </div>
      </div>
    </ModalV2>
  );
}
