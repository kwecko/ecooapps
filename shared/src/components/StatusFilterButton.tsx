import React from "react";
import { HiX } from "react-icons/hi";

import { twMerge } from "tailwind-merge";

type FilterStatus = {
  name: string;
  key: string[];
};

interface StatusFilterButtonsProps {
  selectedStatus: string[];
  handleStatusFilterClick: (status: FilterStatus) => void;
  statuses: FilterStatus[];
  disabled?: boolean;
}

const style = {
  button:
    "text-sm text-white font-semibold px-2 rounded-2xl flex items-center h-6",
};

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
            selectedStatus === status.key
              ? "bg-walnut-brown"
              : "bg-battleship-gray"
          )}
        >
          {status.name}
          {selectedStatus === status.key && <HiX className="ml-1" />}
        </button>
      ))}
    </div>
  );
}
