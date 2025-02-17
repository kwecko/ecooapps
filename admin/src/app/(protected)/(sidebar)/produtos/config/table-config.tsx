import Image from "next/image"

import { LuPencil } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";

import { ModalKeys } from "..";
import { ProductDTO } from "@shared/interfaces/dtos"

export function getProductTableColumns(
  imageLoader: (args: { src: string }) => string,
  toggleModal: (modalName: ModalKeys, product?: ProductDTO) => void
) {
  return [
    {
      header: "Imagem",
      key: "image",
      colSpan: 2,
      render: function renderImage(row: ProductDTO) {
        return row.image ? (
          <Image
            loader={imageLoader}
            src={row.image}
            alt={row.name}
            width={50}
            priority
            height={50}
            className="rounded-lg"
          />
        ) : (
          null
        );
      },
    },
    { header: "Nome", key: "name", colSpan: 4 },
    {
      header: "Categoria",
      key: "category",
      colSpan: 4,
      render: function renderCategory(row: ProductDTO) {
        return row.category.name;
      },
    },
    {
      header: "Unidade",
      key: "pricing",
      colSpan: 2,
      render: function renderPricing(row: ProductDTO) {
        return row.pricing === "WEIGHT" ? "kilo" : "unidade";
      },
    },
    {
      header: "Perecivel",
      key: "perishable",
      colSpan: 2,
      render: function renderCategory() {
        return "---"
      },
    },
    {
      header: "",
      key: "edit",
      colSpan: 1,
      render: function renderEdit(row: ProductDTO) {
        return (
          <button
            type="button"
            onClick={() => toggleModal("isOpenUpdateProductModal", row)}
            className="flex justify-center items-center hover:text-rain-forest transition-colors delay-150"
          >
            <LuPencil size={20} />
          </button>
        );
      },
    },
    {
      header: "",
      key: "delete",
      colSpan: 1,
      render: function renderDelete(row: ProductDTO) {
        return (
          <button
            type="button"
            onClick={() => toggleModal("isOpenDeleteProductModal", row)}
            className="flex justify-center items-center"
          >
            <FaRegTrashAlt className="hover:text-error transition-colors delay-150" size={20} />
          </button>
        );
      },
    },
  ];
}