import { FiEdit } from "react-icons/fi";
import { BiRotateLeft } from "react-icons/bi";

import {
  convertPaymentStatus,
  convertPaymentType,
} from "@shared/utils/convert-payment";

import { PaymentDTO } from "@shared/interfaces/dtos";

export const getBagDetailsTableColumns = ({
  selectBagPayment,
}: {
  selectBagPayment: (payment: PaymentDTO) => void;
}) => {
  return [
    {
      header: "ID Pagamento",
      key: "payment_id",
      colSpan: 4,
      render: function renderPaymentId(row: PaymentDTO) {
        return row.id;
      },
    },
    {
      header: "Método",
      key: "method",
      colSpan: 4,
      render: function renderUser(row: PaymentDTO) {
        return convertPaymentType(row.method).name;
      },
    },
    {
      header: "Status",
      key: "status",
      colSpan: 2,
      render: function renderPrice(row: PaymentDTO) {
        return (
          <span
            className={`font-semibold ${
              convertPaymentStatus(row.status).nameColor
            }`}
          >
            {convertPaymentStatus(row.status).name}
          </span>
        );
      },
    },
    {
      header: "Editar",
      key: "edit",
      colSpan: 2,
      render: function renderView(row: PaymentDTO) {
        return (
          <button
            type="button"
            onClick={() => selectBagPayment(row)}
            className="flex justify-center items-center"
          >
            <FiEdit
              className="hover:text-rain-forest transition-colors delay-150"
              size={20}
            />
          </button>
        );
      },
    },
    {
      header: "Devolver",
      key: "return",
      colSpan: 1,
      render: function renderView(row: PaymentDTO) {
        return (
          <button type="button" onClick={() => {}} className="">
            <BiRotateLeft
              className="hover:text-red-500 transition-colors delay-150"
              size={20}
            />
          </button>
        );
      },
    },
  ];
};
