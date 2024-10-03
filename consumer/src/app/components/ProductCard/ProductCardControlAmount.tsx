import React, { ReactNode } from "react";

import { convertPricingToQuantityInGrams } from "@shared/utils/convert-unit";
import { OfferWithProductDTO } from "@shared/interfaces/dtos/offer-with-product-dto";

interface ProductCardControlAmountProps
  extends React.HTMLAttributes<HTMLDivElement> {
  amount: number;
  setAmount: (amount: number) => void;
  offer: OfferWithProductDTO;
}

export default function ProductCardControlAmount({
  amount,
  setAmount,
  offer,
  ...rest
}: ProductCardControlAmountProps) {
  const handleAdd = () => {
    setAmount(amount + 1);
  };

  const handleRemove = () => {
    setAmount(amount - 1);
  };
  return (
    <div className="flex flex-col justify-end items-end w-24">
      <div className="bg-white rounded-md flex flex-row justify-between items-center w-24 h-7">
        <div className="flex items-center justify-center">
          <button
            type="button"
            className={
              amount != 0
                ? "text-[#00735E] text-2xl p-1.5"
                : "text-[#00735E] text-2xl p-1.5 opacity-25"
            }
            onClick={handleRemove}
            disabled={amount == 0}
          >
            -
          </button>
        </div>
        <div className="w-9 flex items-center justify-center">
          <p className="font-poppin text-base text-center text-[#2F4A4D] p-1">
            <input
              type="text"
              value={amount}
              className="w-9 text-center text-[#2F4A4D] text-base"
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </p>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="button"
            className={
              amount !=
              Math.floor(
                offer.amount /
                  convertPricingToQuantityInGrams(offer.product.pricing)
              )
                ? "text-[#00735E] text-2xl p-1.5"
                : "text-[#00735E] text-2xl p-1.5 opacity-25"
            }
            onClick={handleAdd}
            disabled={
              amount ==
              Math.floor(
                offer.amount /
                  convertPricingToQuantityInGrams(offer.product.pricing)
              )
            }
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
