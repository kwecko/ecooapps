'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import StatusFilterButtons from '@shared/components/StatusFilterButton';

import EmptyBox from '@shared/components/EmptyBox';
import Loader from '@shared/components/Loader';
import { useDebounce } from '@shared/hooks/useDebounce';
import { useGetStatus } from '@shared/hooks/useGetStatus';
import { BagStatus } from '@shared/types/bag-status';
import { getNextSaturdayDate } from '@shared/utils/get-next-saturday-date';

import useListBoxes from '@cdd/hooks/boxes/useListBoxes';
import GenericTable from '@shared/components/GenericTable';
import TablePaginationControl from '@shared/components/TablePaginationControl';
import TableSearchInput from '@shared/components/TableSearchInput';
import usePageQueryParams from '@shared/hooks/usePageQueryParams';
import { BoxDTO } from '@shared/interfaces/dtos';
import { useLocalStorage } from '@shared/hooks/useLocalStorage';
import { first } from '@shared/utils/first';

type FilterStatus = {
  name: string;
  key: string[];
};

const statuses: FilterStatus[] = [
  { name: 'todas', key: ['PENDING', 'VERIFIED', 'REJECTED', 'CANCELLED'] },
  { name: 'pendentes', key: ['PENDING'] },
  { name: 'verificadas', key: ['VERIFIED'] },
  { name: 'rejeitadas', key: ['REJECTED'] },
  { name: 'canceladas', key: ['CANCELLED'] },
];

export function FarmWithOrdersTable() {
  const router = useRouter();

  const { getStatus } = useGetStatus();

  const searchParams = useSearchParams();
  const selectedStatus = searchParams.get('status') ?? 'todas';
  const pathname = usePathname();

  const { page, query } = usePageQueryParams();
  const debounceSearch = useDebounce(query, 300);

  const setSelectedStatus = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('status', status);
    router.push(`${pathname}?${params.toString()}`);
  };

  const { getFromStorage } = useLocalStorage();
  const selectedCycle = getFromStorage('selected-cycle');
  const startDate = first(selectedCycle.order);

  const formattedDDMMYYYY = startDate
    .toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    .replace(/\//g, '-');

  const { data: boxes, isLoading } = useListBoxes({
    page,
    farm: debounceSearch,
    since: formattedDDMMYYYY,
  });

  const [filteredBoxes, setFilteredBoxes] = useState<BoxDTO[]>([] as BoxDTO[]);

  useEffect(() => {
    setFilteredBoxes(boxes);
  }, [boxes]);

  const handleStatusFilterClick = (status: FilterStatus) => {
    if (status.name === selectedStatus) {
      setSelectedStatus('todas');
      return;
    }

    const statusKey = status.key as BagStatus['offer'][];
    const statusName = status.name;
    setFilteredBoxes(() =>
      boxes.filter((box) => statusKey.includes(box.status))
    );

    setSelectedStatus(statusName);
  };

  const handleClick = (id: string) => {
    router.push(`/ofertas/${id}`);
  };

  return (
    <div className='flex flex-col overflow-y-auto gap-2.5 w-full items-center justify-between h-full'>
      <div className='w-full flex flex-col gap-2.5 justify-start items-center'>
        <TableSearchInput
          placeholder={'Filtrar por produtor...'}
          icon='search'
          className='lg:self-end w-full'
        />
        <StatusFilterButtons
          statuses={statuses}
          selectedStatus={selectedStatus}
          handleStatusFilterClick={(status: FilterStatus) =>
            handleStatusFilterClick(status)
          }
        />
      </div>

      {isLoading && (
        <div className='flex justify-center mt-3'>
          <Loader className='mt-3' loaderType='component' />
        </div>
      )}
      {!isLoading && (
        <>
          {filteredBoxes?.length === 0 && (
            <>
              {debounceSearch && <EmptyBox type='search' />}
              {!debounceSearch && <EmptyBox type='box' />}
            </>
          )}
          {filteredBoxes?.length > 0 && (
            <GenericTable
              gridColumns={12}
              columns={[
                {
                  header: 'Prazo',
                  key: 'deadline',
                  colSpan: 4,
                  render: () => {
                    return (
                      <span className='h-11.5'>{getNextSaturdayDate()}</span>
                    );
                  },
                },
                { header: 'Produtor', key: 'farm.name', colSpan: 6 },
                {
                  header: 'Status',
                  key: 'status',
                  colSpan: 2,
                  className: 'items-center justify-center w-full',
                  render: (row: BoxDTO) =>
                    getStatus({
                      type: 'oferta',
                      status: row.status as BagStatus['offer'],
                    }),
                },
              ]}
              data={filteredBoxes}
              onRowClick={(row) => handleClick(row.id)}
            />
          )}
          <TablePaginationControl className='shrink-0' />
        </>
      )}
    </div>
  );
}
