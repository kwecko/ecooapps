import { formatDateToDDMMYYYY } from "@shared/utils/date-handlers";
import { formatPrice } from "@shared/utils/format-price";

import { MarketDTO } from "@shared/interfaces/dtos";

export const getMarketsTableColumns = ({
  navigateToMarketDetails,
}: {
  navigateToMarketDetails: (id: string) => void;
}) => {
  return [
    {
      header: "Data da feira",
      key: "created_at",
      colSpan: 3,
      render: function renderDate(row: MarketDTO) {
        const date = new Date(row.created_at);
        const formatted = formatDateToDDMMYYYY(date);
        return formatted ? formatted.replace(/-/g, "/") : "-";
      },
    },
    {
      header: "Vendas",
      key: "sales",
      colSpan: 2,
      render: function renderSales(row: MarketDTO) {
        // Usando o número de bags como vendas
        return row.bags?.length || 0;
      },
    },
    {
      header: "Faturamento",
      key: "revenue",
      colSpan: 3,
      render: function renderRevenue(row: MarketDTO) {
        // Calculando faturamento a partir das bags (vendas reais)
        const revenue = row.bags?.reduce((sum, bag) => sum + (bag.subtotal || 0), 0) || 0;
        return formatPrice(revenue);
      },
    },
    {
      header: "Lucro (taxas)",
      key: "profit",
      colSpan: 3,
      render: function renderProfit(row: MarketDTO) {
        // Calculando lucro a partir das taxas das bags
        const profit = row.bags?.reduce((sum, bag) => sum + (bag.fee || 0), 0) || 0;
        return formatPrice(profit);
      },
    },
    {
      header: "Status",
      key: "status",
      colSpan: 2,
      render: function renderStatus(row: MarketDTO) {
        return (
          <button
            type="button"
            onClick={() => navigateToMarketDetails(row.id)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
              row.open
                ? "bg-theme-highlight text-white hover:bg-opacity-90"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            {row.open ? "Visualizar Feira" : "Finalizada"}
          </button>
        );
      },
    },
  ];
};

