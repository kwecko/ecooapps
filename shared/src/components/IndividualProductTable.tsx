import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import EmptyBoxInformation from "@shared/components/EmptyBoxInformation";
import { useHandleError } from "@shared/hooks/useHandleError";
import { convertUnit } from "@shared/utils/convert-unit";
import CustomModal from "./CustomModal";

import { handleBoxStatus } from "@cdd/_actions/boxes/PATCH/handle-box-status";
import { BoxMergeDTO, OrderMergeDTO } from "@shared/interfaces/dtos";
import { toast } from "sonner";
import { convertOfferAmount } from "../utils/convert-unit";

const styles = {
  itemHeader:
    "truncate text-battleship-gray font-inter border-b border-theme-background p-3 text-xs font-semibold text-left",
  itemBody: "border-b truncate text-grayish-blue p-3 text-left",
};

interface TableProps {
  headers: Array<{ label: string; style?: string }>;
  info: {
    id: string;
    data: { detail: string | JSX.Element; style?: string }[];
  }[];
  farmOrders: BoxMergeDTO;
  onRowClick?: (id: string) => void;
}

const IndividualProductTable = ({ headers, info, farmOrders }: TableProps) => {
  const router = useRouter();

  const [isModalOpen, setModalOpen] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<OrderMergeDTO | null>(
    null
  );
  const { handleError } = useHandleError();

  const handleRowClick = (id: string) => {
    const order = farmOrders.orders.find(
      (order: OrderMergeDTO) => order.id === id
    );
    setSelectedOrder(order || null);
    setModalOpen(true);
  };

  const handleApprove = () => {
    handleBoxStatus({
      box_id: box_id as string,
      order_id: selectedOrder?.id as string,
      status: "RECEIVED",
    })
      .then((response) => {
        if (response.message) {
          handleError(response.message);
        } else {
          sessionStorage.setItem(
            "data-sucess",
            JSON.stringify({
              title: "A oferta foi aprovada!",
              description: "A oferta do produtor foi aprovada.",
              button: {
                secondary: {
                  router: "/",
                  name: "Voltar para a tela inicial",
                },
                primary: {
                  router: `/ofertas/${box_id}`,
                  name: "Verificar outra oferta",
                },
              },
            })
          );
          router.push("/sucesso");
        }
      })
      .catch(() => {
        toast.error("Erro desconhecido.");
      });
  };

  const handleReject = () => {
    handleBoxStatus({
      box_id: box_id as string,
      order_id: selectedOrder?.id as string,
      status: "CANCELLED",
    })
      .then((response) => {
        if (response.message) {
          handleError(response.message);
        } else {
          sessionStorage.setItem(
            "data-sucess",
            JSON.stringify({
              title: "A oferta foi reprovada!",
              description: "A oferta do produtor foi reprovada.",
              button: {
                secondary: {
                  router: "/",
                  name: "Voltar para a tela inicial",
                },
                primary: {
                  router: `/ofertas/${box_id}`,
                  name: "Verificar outra oferta",
                },
              },
            })
          );
          router.push("/sucesso");
        }
      })
      .catch(() => {
        toast.error("Erro desconhecido.");
      });
  };

  const box_id = useParams().box_id;

  if (!info.length) {
    return (
      <EmptyBoxInformation style="m-auto">
        Nenhuma Caixa Encontrada!
      </EmptyBoxInformation>
    );
  }

  useEffect(() => {
    if (selectedOrder) {
      setStatusText(
        selectedOrder.status === "RECEIVED" ? "aprovado" : "rejeitado"
      );
    }
  }, [selectedOrder]);

  return (
    <>
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
              onClick={() => handleRowClick(products.id)}
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

      {selectedOrder && selectedOrder.status === "PENDING" && (
        <CustomModal
          titleContentModal={selectedOrder?.offer.product.name}
          subtitleContentModal={`Quantidade: ${convertOfferAmount(
            selectedOrder?.amount,
            selectedOrder.offer.product.pricing
          )} ${convertUnit(selectedOrder.offer.product.pricing)}`}
          contentModal="Confira a quantidade e a qualidade do produto. Se estiver tudo certo, clique em aprovar."
          titleConfirmModal="Aprovar"
          titleCloseModal="Rejeitar"
          textCloseModal="#EEF1F4"
          bgCloseModal="#FF7070"
          bgConfirmModal="#00735E"
          isOpen={isModalOpen}
          setIsOpen={setModalOpen}
          approveAction={handleApprove}
          rejectAction={handleReject}
        />
      )}
      {selectedOrder && selectedOrder.status !== "PENDING" && (
        <CustomModal
          titleContentModal={selectedOrder?.offer.product.name}
          subtitleContentModal={`Quantidade: ${convertOfferAmount(
            selectedOrder?.amount,
            selectedOrder.offer.product.pricing
          )} ${convertUnit(selectedOrder.offer.product.pricing)}`}
          contentModal={`O produto foi marcado como ${statusText}. Após terminar de conferir a sacola, siga para a montagem.`}
          isOpen={isModalOpen}
          setIsOpen={setModalOpen}
        />
      )}
    </>
  );
};

export default IndividualProductTable;
