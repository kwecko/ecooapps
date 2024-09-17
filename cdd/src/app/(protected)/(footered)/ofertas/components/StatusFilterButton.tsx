import { HiX } from "react-icons/hi";

import { twMerge } from "tailwind-merge";
import { IStatus } from "./FarmWithOrdersTable";

interface StatusFilterButtonsProps {
  selectedStatus: string;
  handleStatusFilterClick: (status: IStatus) => void;
  statuses: IStatus[];
  disabled?: boolean;
}

const style = {
  button: 'text-sm text-white font-semibold px-2 rounded-[0.25rem] flex items-center h-[22px]'
}

export default function StatusFilterButtons({
  selectedStatus,
  handleStatusFilterClick,
  statuses,
  disabled = false,
}: StatusFilterButtonsProps) {

  return (
    <div className="w-full flex gap-2 mb-4 flex-wrap">
      {statuses.map((status) => (
        <button
          key={status.name}
          disabled={disabled}
          onClick={() => handleStatusFilterClick(status)}
          className={twMerge(
            style.button,
            selectedStatus === status.key ? "bg-walnut-brown" : "bg-battleship-gray"
          )}
        >
          {status.name}
          {selectedStatus === status.key && <HiX className="ml-1" />}
        </button>
      ))}
    </div>
  );
};
