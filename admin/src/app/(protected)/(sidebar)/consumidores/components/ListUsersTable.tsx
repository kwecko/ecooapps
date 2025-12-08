import Image from 'next/image';
import { useEffect, useState } from 'react';

import EmptyBox from '@shared/components/EmptyBox';
import GenericTable from '@shared/components/GenericTable';
import PagingButton from '@shared/components/PagingButton';
import TableSkeleton from '@admin/app/components/TableSkeleton';
import SearchInput from '@shared/components/SearchInput';

import useListUsers from '@admin/hooks/useListUsers';

import { UserDTO } from '@shared/interfaces/dtos';
import { HiOutlineEye, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';
import UpdateUserModal from './UpdateUserModal/UpdateUserModal';
import Button from '@shared/components/Button';

export default function ListUsersTable() {
  const [selectedRow, setSelectedRow] = useState<UserDTO>({} as UserDTO);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleRowClick = (rowData: UserDTO, rowIndex: number) => {
    setSelectedRow(rowData);
    setIsOpen(true);
  };
  const [page, setPage] = useState(1);
  const [name, setName] = useState<string | any>();

  const {
    data: users = [],
    updateData,
    isLoading,
    reloadData,
  } = useListUsers({
    page,
    first_name: name,
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
       colSpan: 4,
      render: (row: UserDTO) => `${row.first_name} ${row.last_name ?? ''}`.trim(),    
    },  
    { header: 'Email', key: 'email', colSpan: 4 },
    { header: 'CPF', key: 'cpf', colSpan: 4 },
    { header: 'Celular', key: 'phone', colSpan: 4 },
    { header: 'Edit.', key: 'edit', colSpan: 2,
      render: (row: UserDTO) => (
        <div className='w-full flex justify-center'>
          <Button
            className='hover:text-rain-forest'
            onClick={() => {
              setSelectedRow(row);
              setIsOpen(true);
            }}
          >
            <HiOutlinePencil size={22} />
          </Button>
        </div>
      ),
    },
    // { header: 'Del.', key: 'delete', colSpan: 2,
    //   render: (row: UserDTO) => (
    //     <div className='w-full flex justify-center'>
    //       <Button
    //         className='hover:text-error'
    //         onClick={() => {
    //           setSelectedRow(row);
    //           setIsOpen(true);
    //         }}
    //       >
    //         <HiOutlineTrash size={22} />
    //       </Button>
    //     </div>
    //   ),
    // },
  ];

  return (
    <div className='w-full h-full flex flex-col justify-between items-center gap-6'>
      <div className='w-full flex items-center justify-end gap-4'>
        <SearchInput
          placeholder='Filtrar por nome'
          onChange={setName}
          value={name}
          type='secondary'
          className='self-end'
        />
      </div>

      {isLoading && <TableSkeleton />}
      {!isLoading && name && users.length === 0 && <EmptyBox type='search' />}
      {!isLoading && !name && users?.length === 0 && (
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
      <UpdateUserModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        reloadUsers={() => reloadData()}
        user={selectedRow}
      />
    </div>
  );
}
