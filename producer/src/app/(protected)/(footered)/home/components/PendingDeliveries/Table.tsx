import { FaBoxOpen } from "react-icons/fa6";

import { OrderMergeDTO, ProductDTO } from "@shared/interfaces/dtos";
import { convertOfferAmount, convertUnit } from "@shared/utils/convert-unit";
import { formatComma } from "@shared/utils/format-comma";
import { getNextSaturdayDate } from "@shared/utils/get-next-saturday-date";

const style = {
  row: "py-2.5 border-b-2 border-custom-gray",
};

interface PendingDeliveriesTableProps {
  pendingDeliveries: OrderMergeDTO[] | undefined;
}

interface GroupedPendingDeliveriesDataItem {
  amount: number;
  product: ProductDTO;
  date: string;
}

interface GroupedPendingDeliveriesData {
  [productId: string]: GroupedPendingDeliveriesDataItem;
}

export function PendingDeliveriesTable({
  pendingDeliveries,
}: PendingDeliveriesTableProps) {
  if (!pendingDeliveries || pendingDeliveries.length === 0) {
    return (
      <div className="flex flex-col justify-center gap-1 items-center mt-3 text-slate-gray">
        <FaBoxOpen className="text-slate-gray" size={64} />
        <span className="text-center w-1/2">Não há entregas pendentes!</span>
      </div>
    );
  }

  const generalDate = getNextSaturdayDate().split("/").slice(0, 2).join("/");

  const groupedData = pendingDeliveries.reduce(
    (acc: GroupedPendingDeliveriesData, curr: OrderMergeDTO) => {
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
    <table className="text-theme-primary">
      <tbody className="text-center">
        {Object.values(groupedData).map(
          (item: GroupedPendingDeliveriesDataItem) => {
            return (
              <tr key={item.product.id} className="text-left">
                <td className={style.row}>
                  {formatComma(
                    convertOfferAmount(item.amount, item.product.pricing)
                  )}{" "}
                  {convertUnit(item.product.pricing)}
                </td>
                <td className={style.row}>{item.product.name}</td>
                <td className={style.row}>{item.date}</td>
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  );
}
