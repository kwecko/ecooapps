import Image from "next/image"

import { LuEye, LuEyeOff, LuPencil } from "react-icons/lu";

import { ModalKeys } from "..";
import { ProductDTO } from "@shared/interfaces/dtos"

export function getProductTableColumns(
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
        return row.pricing === "WEIGHT" ? "Kilo" : "Unidade";
      },
    },
    {
      header: "Perecivel",
      key: "perishable",
      colSpan: 2,
      render: function renderCategory(row: ProductDTO) {
        return row.perishable ? "Sim" : "Não";
      },
    },
    {
      header: "",
      key: "hide",
      colSpan: 0.5,
      render: function renderEdit(row: ProductDTO) {
        return (
            <button
              type="button"
              onClick={() => toggleModal("isArchivedProductModal", row)}
              className="flex justify-center items-center hover:text-rain-forest transition-colors delay-150"
            >
              {row.archived ? <LuEyeOff size={20} /> : <LuEye size={20} />}
            </button>
        );
      },
    },
    {
      header: "",
      key: "edit",
      colSpan: 0.5,
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
  ];
}