import React from "react";

import { IPendingDeliveries } from ".";
import { FaBoxOpen } from "react-icons/fa6";

import { convertUnit } from '@shared/utils/convert-unit';
import { getNextSaturdayDate } from "@shared/utils/get-next-saturday-date";

const style = {
  row: "py-2.5 border-b-2 border-custom-gray"
}

interface IPendingDeliveriesTableProps {
  pendingDeliveries: IPendingDeliveries[]
}

export function PendingDeliveriesTable({ pendingDeliveries }: IPendingDeliveriesTableProps) {
  if (!pendingDeliveries) {
    return (
      <div className="flex flex-col justify-center gap-1 items-center mt-3 text-slate-gray">
        <FaBoxOpen className="text-walnut-brown" size={64} />
        <span className="text-center">Não há entregas <br /> pendentes!</span>
      </div>
    )
  }

  return (
    <table className="text-theme-primary">
      <tbody className="text-center">
        {
          pendingDeliveries?.map((item: IPendingDeliveries) => {
            return (
              <tr key={item.id} className="text-left">
                <td className={style.row}>{item.offer.amount}{convertUnit(item.offer.product.pricing)}</td>
                <td className={style.row}>{item.offer.product.name}</td>
                <td className={style.row}>{getNextSaturdayDate().split('/').slice(0, 2).join('/')}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  );
}
