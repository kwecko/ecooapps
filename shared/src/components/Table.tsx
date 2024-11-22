import React from "react";
import { twMerge } from "tailwind-merge";

import EmptyBoxInformation from "@shared/components/EmptyBoxInformation";

const styles = {
  itemHeader:
    "truncate text-battleship-gray font-inter border-b border-theme-background p-3 text-xs font-semibold text-left",
  itemBody: "border-b-[1px] truncate text-grayish-blue p-3 text-left",
};

interface TableProps {
  headers: Array<{ label: string; style?: string }>;
  info: {
    id: string;
    data: { detail: string | JSX.Element; style?: string }[];
  }[];
  onRowClick?: (id: string) => void;
}

const Table = ({ headers, info, onRowClick }: TableProps) => {
  if (!info.length) {
    return (
      <EmptyBoxInformation style="m-auto">
        Nenhuma Caixa Encontrada!
      </EmptyBoxInformation>
    );
  }

  return (
    <table className="bg-white text-theme-primary leading-7 w-full table-fixed rounded-lg mt-3 mb-auto">
      <thead className="w-full">
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
            onClick={() => onRowClick && onRowClick(products.id)}
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
  );
};

export default Table;
