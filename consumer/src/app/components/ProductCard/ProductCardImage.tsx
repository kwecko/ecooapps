import { ProductDTO } from "@shared/interfaces/dtos";
import {
  convertPricingToGrams,
  convertPricingToQuantityInGrams,
} from "@shared/utils/convert-unit";
import Image from "next/image";

export const ProductCardImage = ({ product }: { product: ProductDTO }) => {
  return (
    <div className="relative h-24 w-24 rounded-xl col-span-2">
      <Image
        className="rounded-xl h-24 w-24"
        src={product.image}
        width={100}
        height={100}
        alt={`${product.name.toLowerCase()}.jpg`}
      />
      <div className="absolute flex justify-center bottom-0 right-0 bg-theme-default text-white items-center w-12 h-5 rounded-tl-xl rounded-br-xl text-xs">
        {`${
          product.pricing === "UNIT"
            ? ""
            : convertPricingToQuantityInGrams(product.pricing)
        }${convertPricingToGrams(product.pricing)}`}
      </div>
    </div>
  );
};
