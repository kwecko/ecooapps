import Image from "next/image";
import { useState } from "react";

import EmptyBox from "@shared/components/EmptyBox";
import GenericTable from "@shared/components/GenericTable";
import Loader from "@shared/components/Loader";
import PagingButton from "@shared/components/PagingButton";
import TablePaginationControl from "@shared/components/TablePaginationControl";
import TableSearchInput from "@shared/components/TableSearchInput";
import TableSkeleton from "@admin/app/components/TableSkeleton";
import SearchInput from "@shared/components/SearchInput";

import useListFarms from "@admin/hooks/useListFarms";
import usePageQueryParams from "@shared/hooks/usePageQueryParams";

import FarmStatusChip from "./FarmStatusChip";
import UpdateFarmStatusModal from "./UpdateFarmStatusModal";

import { FarmDTO } from "@shared/interfaces/dtos";

import producer from "@shared/assets/images/producer.png";

export default function ListFarmsTable() {
  const [selectedRow, setSelectedRow] = useState<FarmDTO>({} as FarmDTO);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleRowClick = (rowData: FarmDTO, rowIndex: number) => {
    setSelectedRow(rowData);
    setIsOpen(true);
  };
  const [page, setPage] = useState(1);
  const [farm, setFarm] = useState<string | any>();

  const {
    data: farms,
    updateData,
    isLoading,
  } = useListFarms({
    page,
    ...(farm && { farm }),
  });

  const nextPage = () => {
    if (farms.length < 20) {
      return;
    }
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

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
            className="rounded-lg max-h-[68px]"
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
      <div className="w-full flex items-center justify-end gap-4">
        <SearchInput
          placeholder="Filtrar por fazenda"
          onChange={setFarm}
          value={farm}
          type="secondary"
          className="self-end"
        />
      </div>

      {isLoading && <TableSkeleton />}
      {!isLoading && farm && farms?.length === 0 && <EmptyBox type="search" />}
      {!isLoading && !farm && farms?.length === 0 && (
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
      {!isLoading && (farms.length > 0 || page !== 1) && (
        <PagingButton value={page} nextPage={nextPage} backPage={prevPage} />
      )}
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
