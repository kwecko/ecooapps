import { formatPrice } from "@shared/utils/format-price";
import React, { ReactNode } from "react";
import { MiniTable } from "./MiniTable";

interface HeaderDetailProps {
  id: string | undefined;
  name: string | undefined;
  status?: string;
  selectStatus?: ReactNode;
  time: string;
  isShipping?: boolean;
  address?: string;
  totalAmount?: number;
  content?: ReactNode;
}

function HeaderDetail({
  id,
  name,
  status,
  selectStatus,
  time,
  isShipping,
  address,
  totalAmount,
  content,
}: HeaderDetailProps) {
  const rows: Array<{ title: string; value: any; className?: string }> = [];

  rows.push({
    title: "Pedido:",
    value: id,
  });

  rows.push({
    title: "Status:",
    value: selectStatus ?? status,
    className: selectStatus ? "!overflow-visible" : "",
  });

  rows.push({
    title: "Consumidor:",
    value: name,
  });

  rows.push({
    title: "Prazo:",
    value: time,
  });

  rows.push({
    title: "Modalidade:",
    value: isShipping ? "Retirada" : "Delivery",
  });

  if (isShipping) {
    rows.push({
      title: "Endereço:",
      value: address,
    });
  }

  rows.push({
    title: "Valor total:",
    value: totalAmount
      ? `${formatPrice(totalAmount)}`
      : "R$ 0,00",
  });

  rows.push({
    title: "Conteúdo:",
    value: content,
  });

  return (
    <MiniTable.Root>
      <MiniTable.Body>
        {rows.map((row, index) => (
          <MiniTable.Row key={index}>
            <MiniTable.HeaderCell>{row.title}</MiniTable.HeaderCell>
            <MiniTable.Cell
              className={`col-span-2 relative ${row.className || ""}`}
            >
              {row.value}
            </MiniTable.Cell>
          </MiniTable.Row>
        ))}
      </MiniTable.Body>
    </MiniTable.Root>
  );
}

export default HeaderDetail;
