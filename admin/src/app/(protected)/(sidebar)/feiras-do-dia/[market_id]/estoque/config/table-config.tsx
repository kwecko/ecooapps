import Image from "next/image";

import { LuPencil, LuTrash2 } from "react-icons/lu";

import { OfferDTO } from "@shared/interfaces/dtos";

export function getOfferTableColumns() {
  return [
    {
      header: "Imagem",
      key: "image",
      colSpan: 2,
      render: function renderImage(row: OfferDTO) {
        return row.product?.image ? (
          <Image
            src={row.product.image}
            alt={row.product.name}
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
    {
      header: "Produto",
      key: "product",
      colSpan: 3,
      render: function renderProduct(row: OfferDTO) {
        return row.product?.name || "-";
      },
    },
    {
      header: "Produtor",
      key: "farm",
      colSpan: 3,
      render: function renderFarm(row: OfferDTO) {
        return row.farm?.name || "-";
      },
    },
    {
      header: "Quantidade",
      key: "amount",
      colSpan: 2,
      render: function renderAmount(row: OfferDTO) {
        return row.amount || 0;
      },
    },
    {
      header: "Preço de Ve",
      key: "price",
      colSpan: 2,
      render: function renderPrice(row: OfferDTO) {
        return new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(row.price || 0);
      },
    },
    {
      header: "Comentário",
      key: "comment",
      colSpan: 2,
      render: function renderComment(row: OfferDTO) {
        return row.comment || "-";
      },
    },
    {
      header: "Edit.",
      key: "edit",
      colSpan: 0.5,
      render: function renderEdit(row: OfferDTO) {
        return (
          <button
            type="button"
            className="flex justify-center items-center hover:text-rain-forest transition-colors delay-150"
            onClick={() => {
              // TODO: Implementar edição
            }}
          >
            <LuPencil size={20} />
          </button>
        );
      },
    },
    {
      header: "Del.",
      key: "delete",
      colSpan: 0.5,
      render: function renderDelete(row: OfferDTO) {
        return (
          <button
            type="button"
            className="flex justify-center items-center hover:text-red-500 transition-colors delay-150"
            onClick={() => {
              // TODO: Implementar exclusão
            }}
          >
            <LuTrash2 size={20} />
          </button>
        );
      },
    },
  ];
}

