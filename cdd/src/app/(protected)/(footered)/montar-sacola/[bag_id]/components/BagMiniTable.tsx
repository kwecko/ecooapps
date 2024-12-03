"use client";

import { fetchBag } from "@cdd/_actions/bags/GET/fetch-bag";
import { handleBag } from "@cdd/_actions/bags/PATCH/handle-bag";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import GroupOrder from "@shared/components/GroupOrder";
import HeaderDetail from "@shared/components/HeaderDetail";
import Modal from "@shared/components/Modal";
import TableSkeleton from "@shared/components/TableSkeleton";
import { useHandleError } from "@shared/hooks/useHandleError";
import { BagMergeDTO } from "@shared/interfaces/dtos";
import { BagStatus } from "@shared/types/bag-status";
import convertStatus from "@shared/utils/convert-status";
import { getNextSaturdayDate } from "@shared/utils/get-next-saturday-date";

export default function BagMiniTable() {
  const router = useRouter();
  const { bag_id } = useParams();

  const [bagOrder, setBagOrder] = useState<BagMergeDTO>();
  const [isLoading, setIsLoading] = useState(true);

  const { handleError } = useHandleError();

  if (!bag_id) {
    notFound();
  }

  useEffect(() => {
    (() => {
      setIsLoading(true);
      fetchBag({
        bag_id: bag_id as string,
      })
        .then((response) => {
          if (response.message) {
            const messageError = response.message as string;

            handleError(messageError);
          } else if (response.data) {
            setBagOrder(response.data);
            setIsLoading(false);
            return;
          }
        })
        .catch(() => {
          toast.error("Erro desconhecido.");
        });
    })();
  }, [bag_id]);

  const handleStatusBag = (bag_id: string, status: BagStatus["build"]) => {
    if (status === "PENDING") {
      handleBag({
        bag_id,
        status: "SEPARATED",
      })
        .then((response) => {
          if (response.message) {
            const messageError = response.message as string;

            handleError(messageError);
          } else {
            sessionStorage.setItem(
              "data-sucess",
              JSON.stringify({
                title: "A sacola está pronta!",
                description: "A sacola do cliente está pronta.",
                button: {
                  secondary: {
                    router: "/",
                    name: "Voltar para a tela inicial",
                  },
                  primary: {
                    router: "/montar-sacola",
                    name: "Enviar sacola agora",
                  },
                },
              })
            );

            router.push("/sucesso");
            return;
          }
        })
        .catch(() => {
          toast.error("Erro desconhecido.");
        });
    } else if (status === "SEPARATED") {
      handleBag({
        bag_id,
        status: "PENDING",
      })
        .then((response) => {
          if (response.message) {
            const messageError = response.message as string;

            handleError(messageError);
          } else {
            sessionStorage.setItem(
              "data-sucess",
              JSON.stringify({
                title: "A sacola foi alterada!",
                description:
                  "A sacola do cliente está pendente para ser montada",
                button: {
                  secondary: {
                    router: "/",
                    name: "Voltar para a tela inicial",
                  },
                  primary: {
                    router: "/montar-sacola",
                    name: "Enviar sacola agora",
                  },
                },
              })
            );

            router.push("/sucesso");
            return;
          }
        })
        .catch(() => {
          toast.error("Erro desconhecido.");
        });
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between">
      {isLoading ? (
        <TableSkeleton />
      ) : bagOrder ? (
        <>
          <HeaderDetail
            id={bagOrder.id}
            status={convertStatus(bagOrder.status)?.name}
            name={`${bagOrder.user.first_name} ${bagOrder.user.last_name}`}
            time={getNextSaturdayDate()}
            content={<GroupOrder orders={bagOrder.orders} />}
          />
          <div className="w-full h-[10%] flex justify-center items-end">
            {bagOrder?.status === "PENDING" ? (
              <Modal
                titleContentModal="Você tem certeza?"
                contentModal="Ao marcar a sacola como pronta, o cliente será notificado."
                titleCloseModal="Cancelar"
                titleConfirmModal="Confirmar"
                titleOpenModal="Marcar como pronta"
                bgOpenModal="#00735E"
                bgConfirmModal="#00735E"
                bgCloseModal="#EEF1F4"
                modalAction={() => {
                  handleStatusBag(bag_id as string, "PENDING");
                }}
              />
            ) : (
              <Modal
                titleContentModal="Você tem certeza?"
                contentModal="Ao alterar o status para pendente, a sacola deverá ser montada novamente."
                titleCloseModal="Cancelar"
                titleConfirmModal="Alterar"
                titleOpenModal="Alterar para pendente"
                bgOpenModal="#FF7070"
                bgConfirmModal="#FF7070"
                bgCloseModal="#EEF1F4"
                modalAction={() => {
                  handleStatusBag(bag_id as string, "SEPARATED");
                }}
              />
            )}
          </div>
        </>
      ) : (
        <span className="text-center text-red-500">
          Erro ao carregar os dados da sacola
        </span>
      )}
    </div>
  );
}
