import GenericTable from "@shared/components/GenericTable";

import useListFarms from "@admin/hooks/useListFarms";
import producer from "@shared/assets/images/producer.png";
import EmptyBox from "@shared/components/EmptyBox";
import Loader from "@shared/components/Loader";
import TablePaginationControl from "@shared/components/TablePaginationControl";
import TableSearchInput from "@shared/components/TableSearchInput";
import usePageQueryParams from "@shared/hooks/usePageQueryParams";
import { FarmDTO } from "@shared/interfaces/dtos";
import Image from "next/image";
import { useState } from "react";
import FarmStatusChip from "./FarmStatusChip";
import UpdateFarmStatusModal from "./UpdateFarmStatusModal";

export default function ListFarmsTable() {
  const [selectedRow, setSelectedRow] = useState<FarmDTO>({} as FarmDTO);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleRowClick = (rowData: FarmDTO, rowIndex: number) => {
    setSelectedRow(rowData);
    setIsOpen(true);
  };
  const { page, query } = usePageQueryParams();
  const {
    data: farms,
    updateData,
    isLoading,
  } = useListFarms({
    page,
    query,
  });

  const farmTableColumns = [
    {
      header: "Foto",
      key: "admin.photo",
      colSpan: 2,
      render: (row: FarmDTO) => {
        return (
          <Image
            src={producer}
            width={68}
            height={68}
            alt="Foto do produtor"
            className="rounded-lg"
          />
        );
      },
    },
    { header: "Nome", key: "admin.first_name", colSpan: 4 },
    { header: "Fazenda", key: "name", colSpan: 4 },
    { header: "Talão", key: "tally", colSpan: 2 },
    { header: "Celular", key: "admin.phone", colSpan: 3 },
    {
      header: "Status",
      key: "status",
      colSpan: 2,
      render: (row: FarmDTO) => {
        return <FarmStatusChip row={row} />;
      },
    },
  ];
  return (
    <div className="w-full h-full flex flex-col justify-between items-center gap-6">
      <TableSearchInput
        placeholder={"Filtrar por fazenda"}
        className="lg:self-end"
      />
      {isLoading && <Loader className="mt-3" loaderType="component" />}
      {!isLoading && query && farms?.length === 0 && <EmptyBox type="search" />}
      {!isLoading && !query && farms?.length === 0 && (
        <EmptyBox type="producer" />
      )}
      {!isLoading && farms?.length > 0 && (
        <GenericTable
          onRowClick={handleRowClick}
          gridColumns={16}
          columns={farmTableColumns}
          data={farms}
        />
      )}
      <TablePaginationControl />
      <UpdateFarmStatusModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        farm={selectedRow}
        farms={farms}
        updateData={updateData}
      />
    </div>
  );
}
