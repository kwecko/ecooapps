import React from "react";

import fakedata from "./fakedata";

interface PendingDeliveriesTableProps {
  numberOfItems: number;
}

const style = {
  row: "py-2.5 border-b-2 border-custom-gray"
}

export function PendingDeliveriesTable({
  numberOfItems,
}: PendingDeliveriesTableProps) {
  const itemsToShow = fakedata.slice(0, numberOfItems);

  return (
    <table className="text-theme-primary">
      <tbody className="text-center">
        {
          itemsToShow.map(item => (
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
