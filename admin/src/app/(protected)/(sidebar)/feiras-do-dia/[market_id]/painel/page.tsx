"use client";

import Title from "@admin/app/components/Title";
import Card from "@admin/app/components/Card";
import Copyright from "@admin/app/components/Copyright";
import LatestSalesTable from "./components/LatestSalesTable";
import MarketStatsCard from "./components/MarketStatsCard";
import EndMarketModal from "./components/EndMarketModal/EndMarketModal";
import Loader from "@shared/components/Loader";
import usePainelPage from "./index";

export default function PainelPage() {
  const {
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
  } = usePainelPage();

  if (isLoading) {
    return (
      <div className="w-full flex flex-col h-full gap-6 overflow-y-hidden items-stretch relative">
        <Title>Painel da Feira</Title>
        <div className="w-full h-full flex items-center justify-center">
          <Loader loaderType="login" />
        </div>
      </div>
    );
  }

  if (!market) {
    return (
      <div className="w-full flex flex-col h-full gap-6 overflow-y-hidden items-stretch relative">
        <Title>Painel da Feira</Title>
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-gray-500">Feira não encontrada</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-hidden">
      <div className="grid grid-cols-10 h-full gap-14 overflow-y-auto">
        <div className="flex flex-col h-full col-span-6 gap-8">
          <Card
            title="Feira do dia"
            className="w-full flex flex-col gap-4 justify-between items-stretch p-6"
            size="h-44 p-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <div className="text-xs font-inter">Feira:</div>
                <div className="text-4xl font-semibold text-slate-blue">
                  {market.name || "Feira do dia"}
                </div>
                {market.description && (
                  <div className="text-sm text-gray-600 mt-1">
                    {market.description}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    market.open ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    market.open ? "text-green-600" : "text-gray-600"
                  }`}
                >
                  {market.open ? "Aberta" : "Finalizada"}
                </span>
              </div>
            </div>
            <div className="text-xs font-inter mt-4">
              Data: <span className="font-bold">{date}</span> | Hora:{" "}
              <span className="font-bold">{time}</span>
            </div>
          </Card>

          <Card title="Últimas vendas" className="w-full">
            <div className="max-h-112 overflow-y-auto">
              <LatestSalesTable bags={latestBags} />
            </div>
          </Card>

          <div className="mt-auto mr-auto">
            <Copyright type="primary" />
          </div>
        </div>

        <div className="flex flex-col col-span-4 gap-6">
          <MarketStatsCard
            title="Número de vendas do dia"
            value={totalSales}
            formatAsPrice={false}
            buttons={[
              {
                label: "Gerenciar vendas",
                onClick: handleManageSales,
              },
              {
                label: "Vender",
                onClick: handleSell,
                disabled: !market.open,
              },
            ]}
          />

          <MarketStatsCard
            title="Produtos em estoque"
            value={totalStock}
            formatAsPrice={false}
            buttons={[
              {
                label: "Gerenciar o estoque",
                onClick: handleManageStock,
                disabled: !market.open,
              },
              {
                label: "Adicionar ao estoque",
                onClick: handleAddStock,
                disabled: !market.open,
              },
            ]}
          />

          <MarketStatsCard
            title="Total em vendas do dia"
            value={totalRevenue}
            formatAsPrice={true}
            buttons={[
              {
                label: "Encerrar feira do dia",
                onClick: handleEndMarket,
                disabled: !market.open,
              },
            ]}
          />
        </div>
      </div>

      {isOpenEndMarketModal && (
        <EndMarketModal
          isOpen={isOpenEndMarketModal}
          closeModal={() => setIsOpenEndMarketModal(false)}
          market={market}
        />
      )}
    </div>
  );
}
