import GenericTable from "@shared/components/GenericTable";
import useListBags from "@admin/hooks/useListBags";
import usePageQueryParams from "@shared/hooks/usePageQueryParams";
import { BagDTO } from "@shared/interfaces/dtos";
import { useEffect, useState } from "react";

export default function ListBagsTable() {
  const [selectedRow, setSelectedRow] = useState<BagDTO>({} as BagDTO);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleRowClick = (rowData: BagDTO, rowIndex: number) => {
    setSelectedRow(rowData);
    setIsOpen(true);
  };
  const { page } = usePageQueryParams();
  const {
    data: bags,
    updateData,
    isLoading,
  } = useListBags({
    page,
  });

  const farmTableColumns = [
    { 
      header: "Cliente", 
      colSpan: 6, 
      key: "client",
      className: "h-12",
      render: (row: BagDTO) => {
        return (
          <div>
            {`${row.customer.first_name} ${row.customer.last_name}`}
          </div>
        );
      }
    },
    { 
      header: "Valor",  
      colSpan: 3, 
      key: "value",
      render: (row: BagDTO) => {
        return (
          <div>
            {`R$ ${row.total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          </div>
        );
      } 
    },
    { 
      header: "Data da venda", 
      colSpan: 4, 
      key: "date",
      render: (row: BagDTO) => {
        return (
            <div>
              {new Date(row.created_at).toLocaleDateString('pt-BR').split('/').join('/')}
            </div>
        )
      }
    },
    { header: "Pagamento", key: "payment.method", colSpan: 3 }
  ];
  return (
    <div className="w-full h-full flex flex-col justify-between items-center gap-6">
      {!isLoading && bags?.length > 0 && (
        <GenericTable
          onRowClick={handleRowClick}
          gridColumns={16}
          columns={farmTableColumns}
          data={bags}
        />
      )}
    </div>
  );
}
