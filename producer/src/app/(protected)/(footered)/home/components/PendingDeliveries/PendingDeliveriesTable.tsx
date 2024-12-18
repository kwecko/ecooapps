import { FaBoxOpen } from "react-icons/fa6";

import Loader from "@shared/components/Loader";
import TablePaginationControl from "@shared/components/TablePaginationControl";
import useFetchCurrentBox from "@shared/hooks/boxes/useFetchCurrentBox";
import usePageQueryParams from "@shared/hooks/usePageQueryParams";
import { OrderDTO, ProductDTO } from "@shared/interfaces/dtos";
import { convertOfferAmount, convertUnit } from "@shared/utils/convert-unit";
import { formatComma } from "@shared/utils/format-comma";
import { getNextSaturdayDate } from "@shared/utils/get-next-saturday-date";
import { twMerge } from "tailwind-merge";

const style = {
  row: "py-2.5",
};

interface GroupedPendingDeliveriesDataItem {
  amount: number;
  product: ProductDTO;
  date: string;
}

interface GroupedPendingDeliveriesData {
  [productId: string]: GroupedPendingDeliveriesDataItem;
}

export function PendingDeliveriesTable() {
  const { page } = usePageQueryParams();

  const { data: boxes, isLoading } = useFetchCurrentBox({ page: page });

  const pendingDeliveries: OrderDTO[] =
    boxes.orders?.filter((order: OrderDTO) => order.status === "PENDING") ??
    ([] as OrderDTO[]);

  const generalDate = getNextSaturdayDate().split("/").slice(0, 2).join("/");

  const groupedData = pendingDeliveries.reduce(
    (acc: GroupedPendingDeliveriesData, curr: OrderDTO) => {
      const productId = curr.offer.product.id;
      if (!acc[productId]) {
        acc[productId] = {
          amount: 0,
          product: curr.offer.product,
          date: generalDate,
        };
      }
      acc[productId].amount += curr.amount;
      return acc;
    },
    {} as GroupedPendingDeliveriesData
  );

  return (
    <>
      <div className="w-full h-full flex flex-col items-center justify-between gap-2 overflow-y-auto">
        {isLoading && <Loader loaderType="component" className="mt-10" />}
        {!isLoading && pendingDeliveries && (
          <div className="w-full h-full flex flex-col items-center shrink-1 overflow-y-auto">
            <table className="w-full h-full text-theme-primary">
              <tbody className="w-full text-center overflow-y-auto ">
                {Object.values(groupedData).map(
                  (item: GroupedPendingDeliveriesDataItem) => {
                    return (
                      <tr
                        key={item.product.id}
                        className="flex flex-row justify-between border-b-2 gap-2.5 border-custom-gray last:border-b-0"
                      >
                        <td
                          className={twMerge(
                            style.row,
                            "w-15 text-left shrink-0"
                          )}
                        >
                          {formatComma(
                            convertOfferAmount(
                              item.amount,
                              item.product.pricing
                            )
                          )}{" "}
                          {convertUnit(item.product.pricing)}
                        </td>
                        <td
                          className={twMerge(
                            style.row,
                            "w-full grow-0 text-left"
                          )}
                        >
                          {item.product.name}
                        </td>
                        <td className={style.row}>{item.date}</td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        )}
        {(!isLoading && !pendingDeliveries) ||
          (pendingDeliveries.length === 0 && (
            <div className="flex flex-col justify-center gap-1 items-center text-slate-gray text-sm leading-5.5">
              <FaBoxOpen className="text-slate-gray" size={64} />
              <span className="text-center px-16">
                Não há entregas pendentes!
              </span>
            </div>
          ))}
        <TablePaginationControl />
      </div>
    </>
  );
}
