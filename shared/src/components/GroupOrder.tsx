import React from "react";

import { BagOrder } from "../interfaces/bag-order";
import { convertUnit } from "../utils/convert-unit";

interface GroupOrderProps {
  orders: BagOrder["orders"];
}

export default function GroupOrder({
  orders
}: GroupOrderProps) {
  const description: { [key: string]: { amount: number; unit: string; farmName: string } } = {};

  orders.forEach((order) => {
    const productName = order.offer.product.name;
    const productKey = `${productName}-${order.offer.catalog.farm.name}`; // Unique key per product and farm

    if (description[productKey]) {
      description[productKey].amount += order.amount;
    } else {
      description[productKey] = {
        amount: order.amount,
        unit: convertUnit(order.offer.product.pricing),
        farmName: order.offer.catalog.farm.name,
      };
    }
  });

  return (
    <div className="flex gap-8 items-start text-theme-primary border-b border-theme-background p-3">
      <span className="w-1/5">Conteúdo:</span>
      <div className="w-4/5">
        {Object.entries(description).map(([key, descriptionOrder]) => (
          <div key={key} className="flex flex-col mb-5">
            {`${descriptionOrder.amount}${descriptionOrder.unit} - ${key.split('-')[0]} `}
            <span className="text-sm font-semibold text-theme-primary">{`(${descriptionOrder.farmName})`}</span>
          </div>
        ))}
      </div>
    </div>
  )
}