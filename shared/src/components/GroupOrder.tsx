import React from "react";

import { BagMergeDTO } from "@shared/interfaces/dtos";
import { convertOfferAmount, convertUnit } from "../utils/convert-unit";

export interface GroupOrderProps {
  orders: BagMergeDTO["orders"];
}

export default function GroupOrder({ orders }: GroupOrderProps) {
  const description: {
    [key: string]: { amount: number; unit: string; farmName: string };
  } = {};

  orders.forEach((order) => {
    const productName = order.offer.product.name;
    const productKey = `${productName}-${order.offer.catalog.farm.name}`;

    if (description[productKey]) {
      description[productKey].amount = parseFloat(
        (
          description[productKey].amount +
          convertOfferAmount(order.amount, order.offer.product.pricing)
        ).toFixed(1)
      );
    } else {
      description[productKey] = {
        amount: parseFloat(
          convertOfferAmount(order.amount, order.offer.product.pricing).toFixed(
            1
          )
        ),
        unit: convertUnit(order.offer.product.pricing),
        farmName: order.offer.catalog.farm.name,
      };
    }
  });

  return (
    <>
      {Object.entries(description).map(([key, descriptionOrder]) => (
        <div key={key} className="flex flex-col mb-5">
          {`${descriptionOrder.amount} ${descriptionOrder.unit} - ${
            key.split("-")[0]
          } `}
          <span className="text-sm font-semibold text-theme-primary">{`(${descriptionOrder.farmName})`}</span>
        </div>
      ))}
    </>
  );
}
