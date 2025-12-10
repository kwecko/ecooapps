import Image from 'next/image';
import { useState } from 'react';

import EmptyBox from '@shared/components/EmptyBox';
import GenericTable from '@shared/components/GenericTable';
import Loader from '@shared/components/Loader';
import PagingButton from '@shared/components/PagingButton';
import TablePaginationControl from '@shared/components/TablePaginationControl';
import TableSearchInput from '@shared/components/TableSearchInput';
import TableSkeleton from '@admin/app/components/TableSkeleton';
import SearchInput from '@shared/components/SearchInput';

import useListFarms from '@admin/hooks/useListFarms';
import usePageQueryParams from '@shared/hooks/usePageQueryParams';

import FarmStatusChip from './FarmStatusChip';
import UpdateFarmStatusModal from './UpdateFarmStatusModal';

import { FarmDTO } from '@shared/interfaces/dtos';

import producer from '@shared/assets/images/producer.png';
import Button from '@shared/components/Button';
import ButtonV2 from "@shared/components/ButtonV2";
import { HiOutlinePencil, HiPlus } from 'react-icons/hi';
import UpdateProducerModal from './UpdateProducerModal/UpdateProducerModal';
import { ProducerDTO } from '@shared/interfaces/dtos/producer-dto';
import CreateProducerModal from './CreateProducerModal/CreateProducerModal';

export default function ListFarmsTable() {
  const [selectedRow, setSelectedRow] = useState<FarmDTO>({} as FarmDTO);
  const [selectedRowProducer, setSelectedRowProducer] = useState<ProducerDTO>({} as ProducerDTO);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenUpdateProducer, setIsOpenUpdateProducer] = useState<boolean>(false);
  const [isOpenCreateProducer, setIsOpenCreateProducer] = useState<boolean>(false);

  const handleRowClick = (rowData: FarmDTO, rowId: string) => {
    const producerData = {
      id: rowData.id,
      first_name: rowData.admin?.first_name,
      last_name: rowData.admin?.last_name,
      email: rowData.admin?.email,
      cpf: rowData.admin?.cpf,
      phone: rowData.admin?.phone,
      name: rowData.name,
      tally: rowData.tally,
      photo: rowData.admin?.photo,
    };
    console.log(rowData);
    setSelectedRowProducer(producerData);
    setIsOpenUpdateProducer(true);
  };
  const [page, setPage] = useState(1);
  const [farm, setFarm] = useState<string | any>();

  const {
    data: farms,
    updateData,
    reloadData,
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
      header: 'Foto',
      key: 'admin.photo',
      colSpan: 2,
      render: (row: FarmDTO) => {
        return (
          <Image
            src={row.admin?.photo ?? producer}
            width={68}
            height={68}
            alt='Foto do produtor'
            className='rounded-lg max-h-[68px]'
          />
        );
      },
        },
        { 
          header: 'Nome', 
          key: 'admin.name', 
          colSpan: 4,
          render: (row: FarmDTO) => `${row.admin?.first_name ?? ''} ${row.admin?.last_name ?? ''}`.trim(),
        },
        { header: 'Fazenda', key: 'name', colSpan: 4 },
        { header: 'Talão', key: 'tally', colSpan: 2 },
        { header: 'Celular', key: 'admin.phone', colSpan: 3 },
        {
          header: 'Status',
          key: 'status',
          colSpan: 3,
          className: 'w-full flex justify-center',
          render: (row: FarmDTO) => {
            return (
              <Button 
                onClick={() => {
                  setSelectedRow(row);
                  setIsOpen(true);
                }}
              >
                <FarmStatusChip row={row} />
              </Button>

            );
          },
        },
        {
          header: 'Edit.',
          key: 'edit',
          colSpan: 2,
          className: 'w-full flex justify-center',
          render: (row: FarmDTO) => {
            return (
              <Button
                className='hover:text-rain-forest'
                onClick={() => {
                  handleRowClick(row, row.id);
                  setIsOpenUpdateProducer(true);
                }}
              >
                <HiOutlinePencil size={22} />
              </Button>
            );
          },
        },
  ];

  return (
    <div className='w-full h-full flex flex-col justify-between items-center gap-6'>
      <div className='w-full flex items-center justify-end gap-4'>
        <SearchInput
          placeholder='Filtrar por fazenda'
          onChange={setFarm}
          value={farm}
          type='secondary'
          className='self-end'
        />
        <ButtonV2
          variant="default"
          className="flex w-64 justify-center items-center gap-3 bg-rain-forest"
          onClick={() => setIsOpenCreateProducer(true)}
        >
          Cadastrar produtor <HiPlus size={20} />
        </ButtonV2>
      </div>

      {isLoading && <TableSkeleton />}
      {!isLoading && farm && farms?.length === 0 && <EmptyBox type='search' />}
      {!isLoading && !farm && farms?.length === 0 && (
        <EmptyBox type='producer' />
      )}
      {!isLoading && farms?.length > 0 && (
        <GenericTable
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
      <UpdateProducerModal
        isOpen={isOpenUpdateProducer}
        closeModal={() => setIsOpenUpdateProducer(false)}
        producer={selectedRowProducer}
        producer_id={selectedRowProducer.id!}
        reloadProducers={() => reloadData()}
      />
      <CreateProducerModal
        isOpen={isOpenCreateProducer}
        closeModal={() => setIsOpenCreateProducer(false)}
        reloadProducers={() => reloadData()}
      />
    </div>
  );
}
