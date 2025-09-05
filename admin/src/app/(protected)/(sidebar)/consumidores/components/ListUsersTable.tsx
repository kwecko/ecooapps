import Image from 'next/image';
import { useState } from 'react';

import EmptyBox from '@shared/components/EmptyBox';
import GenericTable from '@shared/components/GenericTable';
import PagingButton from '@shared/components/PagingButton';
import TableSkeleton from '@admin/app/components/TableSkeleton';
import SearchInput from '@shared/components/SearchInput';

import useListUsers from '@admin/hooks/useListUsers';
import useListBags from '@admin/hooks/useListBags';

// import UpdateBagStatusModal from './UpdateBagStatusModal';

// import { BagDTO } from '@shared/interfaces/dtos';
import { UserDTO } from '@shared/interfaces/dtos';
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';

export default function ListUsersTable() {
  const [selectedRow, setSelectedRow] = useState<UserDTO>({} as UserDTO);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleRowClick = (rowData: UserDTO, rowIndex: number) => {
    setSelectedRow(rowData);
    setIsOpen(true);
  };
  const [page, setPage] = useState(1);
  const [user, setUser] = useState<string | any>();

  console.log(user);

  const {
    data: users = [],
    isLoading,
  } = useListUsers({ 
    page,
    first_name: user,
  });

  const nextPage = () => {
    if (users.length < 20) {
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
      render: (row: UserDTO) => `${row.first_name} ${row.last_name ?? ''}`.trim(),    
    },
    { header: 'Email', key: 'email', colSpan: 3 },
    { header: 'CPF', key: 'cpf', colSpan: 3 },
    { header: 'Celular', key: 'phone', colSpan: 4 },
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
          placeholder='Filtrar por nome'
          onChange={setUser}
          value={user}
          type='secondary'
          className='self-end'
        />
      </div>

      {isLoading && <TableSkeleton />}
      {!isLoading && user && users.length === 0 && <EmptyBox type='search' />}
      {!isLoading && !user && users?.length === 0 && (
        <EmptyBox type='producer' />
      )}
      {!isLoading && users?.length > 0 && (
        <GenericTable
          gridColumns={16}
          columns={bagTableColumns}
          data={users}
        />
      )}
      {!isLoading && (users.length > 0 || page !== 1) && (
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
