import React from "react";

import { BagDTO } from "@shared/interfaces/dtos";
import { convertOfferAmount, convertUnit } from "../utils/convert-unit";

export interface GroupOrderProps {
  orders: BagDTO["orders"];
}

export default function GroupOrder({ orders }: GroupOrderProps) {
  if (orders.length === 0) {
    return <span>Não há mais ofertas...</span>;
  }

  const description: {
    [key: string]: { amount: number; unit: string; farmName: string };
  } = {};

  orders.forEach((order) => {
    const unit = convertUnit(order.offer.product.pricing);
    const productKey = `${order.offer.product.name}-${order.offer.catalog.farm.name}-${unit}`;

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
      unit: unit,
      farmName: order.offer.catalog.farm.name,
      };
    }
  });

  return (
    <div className="overflow-y-auto">
      {Object.entries(description).map(([key, descriptionOrder]) => (
        <div
          key={key}
          className="flex flex-col font-normal text-base leading-5.5 tracking-tight-2 font-inter"
        >
          {`${descriptionOrder.amount} ${descriptionOrder.unit} - ${
            key.split("-")[0]
          } `}
          <span className="text-sm leading-5.5 font-semibold text-theme-primary font-poppins">{`(${descriptionOrder.farmName})`}</span>
          <br />
        </div>
      ))}
    </div>
  );
}
