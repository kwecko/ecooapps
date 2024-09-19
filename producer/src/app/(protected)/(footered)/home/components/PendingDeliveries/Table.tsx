import React from "react";

import { IPendingDeliveries } from ".";

const style = {
  row: "py-2.5 border-b-2 border-custom-gray"
}

interface IPendingDeliveriesTableProps {
  pendingDeliveries: IPendingDeliveries[]
}

export function PendingDeliveriesTable({ pendingDeliveries }: IPendingDeliveriesTableProps) {

  if (pendingDeliveries.length === 0) {
    return (
      <h1>Não há entregas pendentes</h1>
    )
  }

  return (
    <table className="text-theme-primary">
      <tbody className="text-center">
        {
          pendingDeliveries.map((item: IPendingDeliveries) => (
            <tr className="text-left">
              <td className={style.row}>{item.quantidade}</td>
              <td className={style.row}>{item.produto}</td>
              <td className={style.row}>{item.dataVenda}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}
