import { FarmDTO } from '@shared/interfaces/dtos';
import convertStatus from '@shared/utils/convert-status';

const getColorStatus = (status: 'ACTIVE' | 'PENDING' | 'INACTIVE') => {
  if (status === 'ACTIVE') return 'bg-rain-forest';
  else if (status === 'INACTIVE') return 'bg-error';
  return 'bg-steel-shadow';
};
export default function FarmStatusChip({ row }: { row: FarmDTO }) {
  return (
    <span
      className={`flex ${getColorStatus(
        row.status
      )} text-white justify-center items-center px-4 py-1 text-sm font-semibold rounded-full whitespace-nowrap`}
      style={{ maxWidth: '100%' }}
    >
      {convertStatus(row.status).name}
    </span>
  );
}
