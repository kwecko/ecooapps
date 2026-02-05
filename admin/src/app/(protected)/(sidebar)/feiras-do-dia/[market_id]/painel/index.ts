"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

import useFetchMarket from "@admin/hooks/useFetchMarket";
import { listBags } from "@admin/_actions/bags/GET/list-bags";
import { useHandleError } from "@shared/hooks/useHandleError";
import { BagDTO } from "@shared/interfaces/dtos";

export default function usePainelPage() {
  const params = useParams();
  const router = useRouter();
  const market_id = params?.market_id as string;
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [isOpenEndMarketModal, setIsOpenEndMarketModal] = useState(false);
  const [latestBags, setLatestBags] = useState<BagDTO[]>([]);
  const [isLoadingBags, startBagsTransition] = useTransition();
  const { handleError } = useHandleError();

  const { data: market, isLoading, updateData } = useFetchMarket({
    market_id,
    page: 1,
  });

  useEffect(() => {
    setDate(new Date().toLocaleDateString("pt-BR"));
    setTime(new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }));
  }, []);

  useEffect(() => {
    if (market_id) {
      startBagsTransition(() => {
        listBags({ page: 1, market_id })
          .then((response) => {
            if (response.message) {
              handleError(response.message);
              return;
            }
            const bags = response.data || [];
            setLatestBags(bags.slice(0, 8));
          })
          .catch(() => {
            toast.error("Erro ao carregar vendas.");
          });
      });
    }
  }, [market_id]);

  const totalSales = market?.bags_count || 0;
  const totalRevenue = latestBags.reduce((sum, bag) => sum + (bag.subtotal || bag.total || 0), 0);
  const totalStock = market?.offers_count || 0;

  const handleEndMarket = () => {
    setIsOpenEndMarketModal(true);
  };

  const handleManageSales = () => {
    router.push(`/feiras-do-dia/${market_id}/vendas`);
  };

  const handleSell = () => {
    router.push(`/feiras-do-dia/${market_id}/vendas/vender`);
  };

  const handleManageStock = () => {
    router.push(`/feiras-do-dia/${market_id}/estoque`);
  };

  const handleAddStock = () => {
    router.push(`/feiras-do-dia/${market_id}/estoque?openModal=true`);
  };

  return {
    market_id,
    market,
    isLoading: isLoading || isLoadingBags,
    time,
    date,
    totalSales,
    totalRevenue,
    totalStock,
    latestBags,
    handleEndMarket,
    handleManageSales,
    handleSell,
    handleManageStock,
    handleAddStock,
    isOpenEndMarketModal,
    setIsOpenEndMarketModal,
  };
}

