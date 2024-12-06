import React from "react";
import { twMerge } from "tailwind-merge";

import EmptyBoxInformation from "@shared/components/EmptyBoxInformation";
import EmptyBox from "./EmptyBox";

const styles = {
  itemHeader:
    "truncate text-battleship-gray font-inter border-b border-theme-background p-3 text-xs font-semibold text-left",
  itemBody: "border-b border-theme-background truncate font-inter text-grayish-blue p-3 text-left",
  itemHeaderAdmin:
    "truncate text-theme-primary font-inter border-b border-theme-[#9BA5B7] pl-3 pb-2 text-base font-semibold text-left",
  itemBodyAdmin: "border-b border-theme-[#9BA5B7] truncate font-inter text-theme-primary pl-3 text-left",
};

interface OrderTableProps {
  headers: Array<{ label: string; style?: string }>;
  info: {
    id: string;
    data: { detail: string | JSX.Element; style?: string }[];
  }[];
  onRowClick?: (id: string) => void;
  type?: "admin";
}

const OrderTable = ({ headers, info, type, onRowClick }: OrderTableProps) => {
  if (type === "admin") {
    return (
      <div className="flex bg-white rounded-2xl pt-2 gap-1">
        <div className="w-full max-h-152 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-white z-10">
              <tr className="text-left border-b border-gray-300">
                {headers.map((header, index) => (
                  <th
                  key={index}
                  className={twMerge(
                    styles.itemHeaderAdmin,
                    header.style,
                    index === 0 ? "pl-8" : ""
                  )}
                  >
                  {header.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {info.map((products) => (
                <tr
                  key={products.id}
                  onClick={onRowClick && (() => onRowClick(products.id))}
                  className="text-center cursor-pointer"
                >
                  {products.data.map((product, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={twMerge(styles.itemBodyAdmin, product.style)}
                    >
                      {product.detail}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full">
        <table className="bg-white text-theme-primary leading-7 w-full table-fixed rounded-lg mb-auto">
          <thead className="bg-white sticky top-0 z-10">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className={twMerge(styles.itemHeader, header.style)}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {info.map((products) => (
              <tr
                key={products.id}
                onClick={onRowClick && (() => onRowClick(products.id))}
                className="text-center cursor-pointer"
              >
                {products.data.map((product, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={twMerge(styles.itemBody, product.style)}
                  >
                    {product.detail}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
