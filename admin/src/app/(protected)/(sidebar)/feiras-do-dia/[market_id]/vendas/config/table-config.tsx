import { GrView } from "react-icons/gr";
import { LuPencil, LuTrash2 } from "react-icons/lu";

import { convertStatus } from "@shared/utils/convert-status";
import { formatPrice } from "@shared/utils/format-price";
import { formatDateToDateAndTime } from "@shared/utils/date-handlers";

import { BagDTO } from "@shared/interfaces/dtos";

interface GetBagsTableColumnsProps {
  onView?: (bag: BagDTO) => void;
  onEdit?: (bag: BagDTO) => void;
  onDelete?: (bag: BagDTO) => void;
}

export function getBagsTableColumns({
  onView,
  onEdit,
  onDelete,
}: GetBagsTableColumnsProps = {}) {
  return [
    {
      header: "Data da venda",
      key: "sales_date",
      colSpan: 4,
      render: function renderDate(row: BagDTO) {
        return formatDateToDateAndTime(row.created_at);
      },
    },
    {
      header: "Cliente",
      key: "user",
      colSpan: 4,
      render: function renderUser(row: BagDTO) {
        if (!row.customer) {
          return "Consumidor avulso";
        }
        return row.customer.first_name + " " + row.customer.last_name;
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
      header: "Ver",
      key: "view",
      colSpan: 0.5,
      render: function renderView(row: BagDTO) {
        return (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onView?.(row);
            }}
            className="flex justify-center items-center hover:text-rain-forest transition-colors delay-150"
          >
            <GrView size={20} />
          </button>
        );
      },
    },
    {
      header: "Edit.",
      key: "edit",
      colSpan: 0.5,
      render: function renderEdit(row: BagDTO) {
        return (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(row);
            }}
            className="flex justify-center items-center hover:text-rain-forest transition-colors delay-150"
          >
            <LuPencil size={20} />
          </button>
        );
      },
    },
    {
      header: "Del.",
      key: "delete",
      colSpan: 0.5,
      render: function renderDelete(row: BagDTO) {
        return (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(row);
            }}
            className="flex justify-center items-center hover:text-red-500 transition-colors delay-150"
          >
            <LuTrash2 size={20} />
          </button>
        );
      },
    },
  ];
}
