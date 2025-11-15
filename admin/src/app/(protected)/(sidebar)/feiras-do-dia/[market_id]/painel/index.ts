"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import useFetchMarket from "@admin/hooks/useFetchMarket";

export default function usePainelPage() {
  const params = useParams();
  const router = useRouter();
  const market_id = params?.market_id as string;
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [isOpenEndMarketModal, setIsOpenEndMarketModal] = useState(false);

  const { data: market, isLoading, updateData } = useFetchMarket({
    market_id,
    page: 1,
  });

  useEffect(() => {
    setDate(new Date().toLocaleDateString("pt-BR"));
    setTime(new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }));
  }, []);

  const totalSales = market?.bags?.length || 0;
  const totalRevenue = market?.bags?.reduce((sum, bag) => sum + (bag.subtotal || bag.total || 0), 0) || 0;
  const totalStock = market?.offers?.reduce((sum, offer) => sum + (offer.amount || 0), 0) || 0;

  const latestBags = market?.bags
    ? [...market.bags]
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 8)
    : [];

  const handleEndMarket = () => {
    setIsOpenEndMarketModal(true);
  };

  const handleManageSales = () => {
    router.push(`/feiras-do-dia/${market_id}/vendas`);
  };

  const handleSell = () => {
    toast.info("Funcionalidade em desenvolvimento");
  };

  const handleManageStock = () => {
    router.push(`/feiras-do-dia/${market_id}/estoque`);
  };

  const handleAddStock = () => {
    toast.info("Funcionalidade em desenvolvimento");
  };

  return {
    market_id,
    market,
    isLoading,
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

