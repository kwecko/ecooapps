import React, { ReactNode } from "react";
import { MiniTable } from "./MiniTable";

interface HeaderDetailProps {
  id: string | undefined;
  name: string | undefined;
  status?: string;
  selectStatus?: ReactNode;
  time: string;
  isShipping?: boolean;
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
  totalAmount,
  content,
}: HeaderDetailProps) {
  const rows = [
    {
      title: "Pedido:",
      value: id,
    },
    {
      title: "Status:",
      value: selectStatus ?? status,
      className: selectStatus ? "!overflow-visible" : "",
    },
    {
      title: "Consumidor:",
      value: name,
    },
    {
      title: "Prazo:",
      value: time,
    },
    {
      title: "Modalidade:",
      value: isShipping ? "Delivery" : "Retirada",
    },
    {
      title: "Valor total:",
      value: totalAmount ? `R$ ${totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "R$ 0,00",
    },
    {
      title: "Conteúdo:",
      value: content,
    },
  ];

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
