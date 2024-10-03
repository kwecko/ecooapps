import React, { ReactNode } from "react";
import { formatPrice } from "@shared/utils/format-price";

interface ProductCardCostAmountProps
  extends React.HTMLAttributes<HTMLDivElement> {
  price: number;
  pricing: string;
  amount: number;
}

export default function ProductCardCostAmount({
  price,
  pricing,
  amount,
  ...rest
}: ProductCardCostAmountProps) {
  return (
    <div className="flex flex-col items-end w-full">
      <p className="text-xs font-bold text-battleship-gray">
        {pricing === "UNIT" && (
          <span>
            {formatPrice(price)}
            <span className="text-[10px]">/unid.</span>
          </span>
        )}
        {pricing === "WEIGHT" && (
          <span>
            {formatPrice(price / 2)}
            <span className="text-[10px]">/500g</span>
          </span>
        )}
      </p>
      <p className="text-lg font-bold text-slate-gray">
        {amount > 0 &&
          pricing === "UNIT" &&
          formatPrice(price * amount)}
        {amount > 0 && pricing === "WEIGHT" && (
          <span>
            {formatPrice((price / 2) * amount)}
            <span className="text-sm">/{amount * 0.5}kg</span>
          </span>
        )}
        {amount == 0 && formatPrice(0)}
      </p>
    </div>
  );
}
