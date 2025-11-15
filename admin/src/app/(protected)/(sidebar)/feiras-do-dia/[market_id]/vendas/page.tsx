"use client";

import Title from "@admin/app/components/Title";
import useVendasPage from "./index";

export default function VendasPage() {
  const { market_id } = useVendasPage();

  return (
    <div className="w-full flex flex-col h-full gap-6 overflow-y-hidden items-stretch relative">
      <Title>Vendas</Title>
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-gray-500">Hello World - Market ID: {market_id}</p>
      </div>
    </div>
  );
}

