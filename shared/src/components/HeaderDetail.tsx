import React, { ReactNode } from "react";
import { MiniTable } from "./MiniTable";

interface HeaderDetailProps {
  id: string | undefined;
  name: string | undefined;
  status?: string;
  selectStatus?: ReactNode;
  time: string;
  content?: ReactNode;
}

function HeaderDetail({
  id,
  name,
  time,
  status,
  selectStatus,
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
