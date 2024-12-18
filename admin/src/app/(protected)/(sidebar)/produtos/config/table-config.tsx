import Image from "next/image"

import { LuPencil } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";

import { ProductDTO } from "@shared/interfaces/dtos"

export function getProductTableColumns(imageLoader: (args: { src: string }) => string) {
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
          <div>Carregando...</div>
        );
      },
    },
    { header: "Nome", key: "name", colSpan: 4 },
    {
      header: "Categoria",
      key: "category",
      colSpan: 4,
      render: function renderCategory() {
        return "---"
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
      
      render: function renderEdit() {
        return (
          <button
            type="button"
            onClick={() => alert("Editar produto")}
            className="flex justify-center items-center"
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
      render: function renderDelete() {
        return (
          <button
            type="button"
            onClick={() => alert("Deletar produto")}
            className="flex justify-center items-center"
          >
            <FaRegTrashAlt size={20} />
          </button>
        );
      },
    },
  ];
}