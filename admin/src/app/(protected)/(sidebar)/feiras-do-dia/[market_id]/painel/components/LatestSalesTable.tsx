"use client";

import GenericTable from "@shared/components/GenericTable";
import { BagDTO } from "@shared/interfaces/dtos";
import { convertPaymentType } from "@shared/utils/convert-payment";
import { formatPrice } from "@shared/utils/format-price";
import { formatDateToDDMMYYYY } from "@shared/utils/date-handlers";

interface LatestSalesTableProps {
  bags: BagDTO[];
}

export default function LatestSalesTable({ bags }: LatestSalesTableProps) {
  const columns = [
    {
      header: "Cliente",
      colSpan: 4,
      key: "client",
      render: (row: BagDTO) => {
        const firstName = row.customer?.first_name || "";
        const lastName = row.customer?.last_name || "";
        const fullName = `${firstName} ${lastName}`.trim();
        return fullName || "Consumidor avulso";
      },
    },
    {
      header: "Valor",
      colSpan: 3,
      key: "value",
      render: (row: BagDTO) => {
        return formatPrice(row.subtotal || row.total || 0);
      },
    },
    {
      header: "Data da venda",
      colSpan: 4,
      key: "date",
      render: (row: BagDTO) => {
        const date = new Date(row.created_at);
        const formatted = formatDateToDDMMYYYY(date);
        return formatted ? formatted.replace(/-/g, "/") : "-";
      },
    },
    {
      header: "Pagamento",
      colSpan: 5,
      key: "payment",
      render: (row: BagDTO) => {
        if (!row.payment) return "-";
        return convertPaymentType(row.payment.method).name;
      },
    },
  ];

  return (
    <div className="w-full">
      {bags.length > 0 ? (
        <GenericTable gridColumns={16} columns={columns} data={bags} />
      ) : (
        <div className="text-center text-gray-500 py-8">Nenhuma venda registrada</div>
      )}
    </div>
  );
}

