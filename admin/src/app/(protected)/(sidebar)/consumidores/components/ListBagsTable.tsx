import Image from 'next/image';
import { useState } from 'react';

import EmptyBox from '@shared/components/EmptyBox';
import GenericTable from '@shared/components/GenericTable';
import PagingButton from '@shared/components/PagingButton';
import TableSkeleton from '@admin/app/components/TableSkeleton';
import SearchInput from '@shared/components/SearchInput';

import useListBags from '@admin/hooks/useListBags';

// import UpdateBagStatusModal from './UpdateBagStatusModal';

import { BagDTO } from '@shared/interfaces/dtos';
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';

export default function ListBagsTable() {
  const [selectedRow, setSelectedRow] = useState<BagDTO>({} as BagDTO);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleRowClick = (rowData: BagDTO, rowIndex: number) => {
    setSelectedRow(rowData);
    setIsOpen(true);
  };
  const [page, setPage] = useState(1);
  const [bag, setBags] = useState<string | any>();

  const {
    data: bags,
    updateData,
    isLoading,
  } = useListBags({ 
    page,
    ...(bag && { bag }),
  });

  const nextPage = () => {
    if (bags.length < 20) {
      return;
    }
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const bagTableColumns = [
    { 
      header: 'Nome', 
      key: 'name',
       colSpan: 3,
      render: (row: BagDTO) => `${row.customer.first_name} ${row.customer.last_name ?? ''}`.trim(),     
    },
    { header: 'Email', key: 'customer.email', colSpan: 3 },
    { header: 'CPF', key: 'customer.cpf', colSpan: 3 },
    { header: 'Celular', key: 'customer.phone', colSpan: 4 },
    {
      header: 'Ver',
      key: 'see',
      colSpan: 1,
      className: 'min-w-[120px] flex justify-end',
      render: () => {
        return <HiOutlineEye size={25} className='text-primary-500 mx-auto' />;
      },
    },
    {
      header: 'Edit.',
      key: 'edit',
      colSpan: 1,
      className: 'min-w-[120px] flex justify-end',
      render: () => {
        return <HiOutlinePencil size={25} className='text-primary-500 mx-auto' />;
      },
    },
    {
      header: 'Del.',
      key: 'delete',
      colSpan: 1,
      className: 'min-w-[120px] flex justify-end',
      render: () => {
        return <HiOutlineTrash size={25} className='text-primary-500 mx-auto' />;
      },
    },
  ];

  return (
    <div className='w-full h-full flex flex-col justify-between items-center gap-6'>
      <div className='w-full flex items-center justify-end gap-4'>
        <SearchInput
          placeholder='Filtrar por fazenda'
          onChange={setBags}
          value={bag}
          type='secondary'
          className='self-end'
        />
      </div>

      {isLoading && <TableSkeleton />}
      {!isLoading && bag && bags.length === 0 && <EmptyBox type='search' />}
      {!isLoading && !bag && bags?.length === 0 && (
        <EmptyBox type='producer' />
      )}
      {!isLoading && bags?.length > 0 && (
        <GenericTable
          gridColumns={16}
          columns={bagTableColumns}
          data={bags}
        />
      )}
      {!isLoading && (bags.length > 0 || page !== 1) && (
        <PagingButton value={page} nextPage={nextPage} backPage={prevPage} />
      )}
      {/* <UpdateBagStatusModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        bag={selectedRow}
        bags={bags}
        updateData={updateData}
      /> */}
    </div>
  );
}
