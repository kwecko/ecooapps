import { GrView } from "react-icons/gr";

import { convertStatus } from "@shared/utils/convert-status";
import { formatPrice } from "@shared/utils/format-price";
import { formatDateToDateAndTime } from "@shared/utils/date-handlers";

import { BagDTO } from "@shared/interfaces/dtos";

export const getBagsTableColumns = ({
  navigateToBagDetails,
}: {
  navigateToBagDetails: (id: string) => void;
}) => {
  const isFromMarket = (row: BagDTO): boolean => {
    return !row.cycle_id;
  };

  return [
    {
      header: "Data da venda",
      key: "sales_date",
      colSpan: 3,
      render: function renderDate(row: BagDTO) {
        return formatDateToDateAndTime(row.created_at);
      },
    },
    {
      header: "Cliente",
      key: "user",
      colSpan: 3,
      render: function renderUser(row: BagDTO) {
        if (!row.customer) {
          return "Consumidor avulso";
        }
        return row.customer.first_name + " " + row.customer.last_name;
      },
    },
    {
      header: "Origem",
      key: "origin",
      colSpan: 2,
      render: function renderOrigin(row: BagDTO) {
        const fromMarket = isFromMarket(row);
        return (
          <span
            className={`px-2 py-1 rounded-md text-xs font-semibold ${
              fromMarket
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {fromMarket ? "Feira do dia" : "Ciclo"}
          </span>
        );
      },
    },
    {
      header: "Preço",
      key: "subtotal",
      colSpan: 2,
      render: function renderPrice(row: BagDTO) {
        return formatPrice(row.subtotal);
      },
    },
    {
      header: "Taxas",
      key: "fees",
      colSpan: 2,
      render: function renderFees(row: BagDTO) {
        return formatPrice(row.fee);
      },
    },
    {
      header: "Entrega",
      key: "shipping",
      colSpan: 2,
      render: function renderShipping(row: BagDTO) {
        return formatPrice(row.shipping);
      },
    },
    {
      header: "Status",
      key: "status",
      colSpan: 2,
      render: function renderStatus(row: BagDTO) {
        return (
          <span
            className={`font-semibold ${convertStatus(row.status).nameColor}`}
          >
            {convertStatus(row.status).name}
          </span>
        );
      },
    },
    {
      header: "",
      key: "delete",
      colSpan: 1,
      render: function renderView(row: BagDTO) {
        return (
          <button
            type="button"
            onClick={() => navigateToBagDetails(row.id)}
            className="flex justify-center items-center"
          >
            <GrView
              className="hover:text-rain-forest transition-colors delay-150"
              size={20}
            />
          </button>
        );
      },
    },
  ];
};
