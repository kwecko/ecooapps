"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useLocalStorage } from "@shared/hooks/useLocalStorage";
import { fetchFarmOrders } from "@cdd/app/_actions/farm/fetch-farm-orders";
import { handleOrderDelivery } from "@cdd/app/_actions/order/handle-order-delivery";
import Modal from "@shared/components/Modal";
import dayjs from "dayjs";
import { notFound, useParams, useRouter } from "next/navigation";
import { FarmOrders } from "@shared/interfaces/farm-orders";
import TableSkeleton from "@shared/components/TableSkeleton";
import { useHandleError } from "@shared/hooks/useHandleError";
import HeaderDetail from "./HeaderDetail";
import { twMerge } from "tailwind-merge";

const styles = {
  itemHeader:
    "truncate w-[30%] text-[#979797] font-inter border-b border-theme-background p-2 text-xs font-semibold text-center",
  itemBody: "border-b-[1px] truncate text-[#545F71] px-2 py-3",
};

export default function FarmOrdersTable() {
  const router = useRouter();
  const { farm_id } = useParams();

  const [farmOrders, setFarmOrders] = useState<FarmOrders | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { handleError } = useHandleError();
  const { getFromStorage } = useLocalStorage();

  if (!farm_id) {
    notFound();
  }

  useEffect(() => {
    (async () => {
      const cycle = getFromStorage("selected-cycle");

      if (!cycle) {
        toast.error("Selecione um ciclo para receber ofertas!");
      }

      const { id } = cycle;

      await fetchFarmOrders({
        cycle_id: id,
        farm_id: farm_id as string,
      })
        .then((response: any) => {
          if (response.message) {
            const messageError = response.message as string;

            handleError(messageError);
          } else if (response.data) {
            setFarmOrders(response.data);
            return;
          }
        })
        .catch((error) => {
          toast.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    })();
  }, [farm_id]);


  const getNextSaturdayDate = () => {
    const today = dayjs();
    const dayOfWeek = today.day();
    const daysUntilSaturday = 6 - dayOfWeek;
    const nextSaturday = today.add(daysUntilSaturday, "day");

    return nextSaturday.format("DD/MM/YYYY");
  };

  const onSubmit = () => {
    sessionStorage.setItem('data-sucess', JSON.stringify({
      title: 'A oferta foi aprovada!',
      description: 'A oferta do produtor José da Silva foi aprovada.',
      button: {
        secundary: '/',
        primary: '/ofertas'
      }
    }));
    router.push('/sucess');
    setIsLoading(true);
  }

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <HeaderDetail
        id={farmOrders?.id.split("-", 1).toString()}
        name={farmOrders?.farm.name}
        time={getNextSaturdayDate()}
        status="#######"
      />

      <table className="bg-white text-theme-primary text-left leading-7 w-full table-fixed rounded-lg mb-auto mt-3 overflow-y-hidden">
        <thead className="w-full">
          <tr className="text-[rgb(84,95,113)]">
            <th className={twMerge("w-[30%]", styles.itemHeader)}>
              Quantidade
            </th>
            <th className={twMerge("w-1/2", styles.itemHeader)}>Produto</th>
            <th className={twMerge("w-1/5", styles.itemHeader)}>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            onClick={() => console.log(farmOrders?.id)}
            className="text-center cursor-pointer"
          >
            {farmOrders?.offers.map((item) => (
              <>
                <td key={item.id} className={styles.itemBody}>
                  {item.amount}
                </td>
                <td className={styles.itemBody}>{item.product.name}</td>
                <td className={styles.itemBody}>#</td>
              </>
            ))}
          </tr>
        </tbody>
      </table>

      <div className="w-full h-[10%] flex gap-2 justify-center items-end">
        <Modal
          titleContentModal="Você tem certeza?"
          contentModal="Após rejeitar a entrega essa operação não poderá ser desfeita. Em caso de erro, entre em contato com o suporte."
          titleCloseModal="Cancelar"
          titleConfirmModal="Rejeitar"
          titleOpenModal="Rejeitar"
          bgOpenModal="#FF7070"
          bgConfirmModal="#FF7070"
          bgCloseModal="#EEF1F4"
          modalAction={() => console.log("CANCELLED")}
        />

        <Modal
          titleContentModal="Você tem certeza?"
          contentModal="Após aprovar a oferta essa operação não poderá ser desfeita. Em caso de erro, entre em contato com o suporte."
          titleCloseModal="Cancelar"
          titleConfirmModal="Aprovar"
          titleOpenModal="Aprovar"
          bgOpenModal="#00735E"
          bgConfirmModal="#00735E"
          bgCloseModal="#EEF1F4"
          modalAction={onSubmit}
        />
      </div>
    </div>
  );
}
