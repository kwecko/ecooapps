import React from "react";

import { BagDTO } from "@shared/interfaces/dtos";
import { formatPrice } from "@shared/utils/format-price";
import { convertOfferAmount, convertUnit } from "../utils/convert-unit";

export interface GroupOrderProps {
  orders: BagDTO["orders"];
}

export default function GroupOrder({ orders }: GroupOrderProps) {
  if (orders.length === 0) {
    return <span>Não há mais ofertas...</span>;
  }

  const accepted: {
    [key: string]: {
      amount: number;
      unit: string;
      farmName: string;
      price: number;
    };
  } = {};

  const rejected: {
    [key: string]: {
      amount: number;
      unit: string;
      farmName: string;
      price: number;
    };
  } = {};

  orders.forEach((order) => {
    const unit = convertUnit(order.offer.product.pricing);
    const productKey = `${order.offer.product.name}-${order.offer.farm.name}-${unit}`;
    const amount = convertOfferAmount(
      order.amount,
      order.offer.product.pricing
    );
    const price =
      order.offer.product.pricing === "UNIT"
        ? order.offer.price * order.amount
        : (order.offer.price * order.amount) / 1000;

    const isRejected = order.status !== "RECEIVED";
    const target = isRejected ? rejected : accepted;

    if (target[productKey]) {
      target[productKey].amount = parseFloat(
        (target[productKey].amount + amount).toFixed(1)
      );
    } else {
      target[productKey] = {
        amount: parseFloat(amount.toFixed(1)),
        unit: unit,
        farmName: order.offer.farm.name,
        price: price,
      };
    }
  });

  return (
    <div className="overflow-y-auto">
      {Object.entries(accepted).map(([key, descriptionOrder]) => (
        <div
          key={key}
          className="flex flex-col font-normal text-base leading-5.5 tracking-tight-2 font-inter"
        >
          {`${descriptionOrder.amount} ${descriptionOrder.unit} - ${
            key.split("-")[0]
          } - ${formatPrice(descriptionOrder.price)} `}
          <span className="text-sm leading-5.5 font-semibold text-theme-primary font-poppins">
            ({descriptionOrder.farmName})
          </span>
          <br />
        </div>
      ))}

      {Object.entries(rejected).length > 0 && (
        <div className="mt-2">
          <h4 className="text-red-600 font-semibold mb-1">
            {" "}
            Itens não entregues:
          </h4>
          {Object.entries(rejected).map(([key, descriptionOrder]) => (
            <div
              key={key}
              className="flex flex-col font-normal text-base leading-5.5 tracking-tight-2 font-inter text-red-500"
            >
              {`${descriptionOrder.amount} ${descriptionOrder.unit} - ${
                key.split("-")[0]
              } `}
              <span className="text-sm leading-5.5 font-semibold text-red-500 font-poppins">
                ({descriptionOrder.farmName})
              </span>
              <br />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
