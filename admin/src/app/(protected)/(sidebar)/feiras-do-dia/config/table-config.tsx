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
      header: "Estoque",
      key: "stock",
      colSpan: 2,
      render: function renderStock(row: MarketDTO) {
        return row.offers_count || 0;
      },
    },
    {
      header: "Vendas",
      key: "sales",
      colSpan: 2,
      render: function renderSales(row: MarketDTO) {
        return row.bags_count || 0;
      },
    },
    {
      header: "Faturamento",
      key: "revenue",
      colSpan: 3,
      render: function renderRevenue(row: MarketDTO) {
        return formatPrice(row.revenue || 0);
      },
    },
    {
      header: "Lucro (taxas)",
      key: "profit",
      colSpan: 3,
      render: function renderProfit(row: MarketDTO) {
        return formatPrice(row.fee || 0);
      },
    },
    {
      header: "Status",
      key: "status",
      colSpan: 3,
      render: function renderStatus(row: MarketDTO) {
        return (
          <button
            type="button"
            onClick={() => navigateToMarketDetails(row.id)}
            className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg font-semibold text-xs sm:text-sm transition-colors whitespace-nowrap w-full ${
              row.open
                ? "bg-theme-highlight text-white hover:bg-opacity-90"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            <span className="hidden sm:inline">{row.open ? "Visualizar Feira" : "Finalizada"}</span>
            <span className="sm:hidden">{row.open ? "Visualizar" : "Finalizada"}</span>
          </button>
        );
      },
    },
  ];
};

