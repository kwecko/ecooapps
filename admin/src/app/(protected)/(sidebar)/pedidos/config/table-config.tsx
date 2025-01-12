import { GrView } from "react-icons/gr";

import { convertStatus } from "@shared/utils/convert-status";

import { BagDTO } from "@shared/interfaces/dtos";

function formatPrice(value: number): string {
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}

function formatDate(value: string): string {
  const date = new Date(value);
  const formattedDate = date.toLocaleDateString("pt-BR");
  const formattedTime = date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${formattedDate} | ${formattedTime}`;
}

export function getBagsTableColumns() {
  return [
    {
      header: "Data da venda",
      key: "sales_date",
      colSpan: 4,
      render: function renderDate(row: BagDTO) {
        return formatDate(row.created_at);
      },
    },
    {
      header: "Cliente",
      key: "user",
      colSpan: 4,
      render: function renderUser(row: BagDTO) {
        return row.user.first_name + " " + row.user.last_name;
      },
    },
    {
      header: "Preço",
      key: "price",
      colSpan: 2,
      render: function renderPrice(row: BagDTO) {
        return formatPrice(row.price);
      },
    },
    {
      header: "Taxas",
      key: "fees",
      colSpan: 2,
      render: function renderFees(row: BagDTO) {
        return "---";
      },
    },
    {
      header: "Entrega",
      key: "shipping",
      colSpan: 2,
      render: function renderShipping(row: BagDTO) {
        return "---";
      },
    },
    {
      header: "Status",
      key: "status",
      colSpan: 2,
      render: function renderStatus(row: BagDTO) {
        return convertStatus(row.status).name;
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
            onClick={() => {}}
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
}
