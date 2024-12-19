"use client";

import { FiCalendar } from "react-icons/fi";

interface DateInputProps {
  label?: string;
  value?: Date;
  disabled?: boolean;
  onChange: (date: Date) => void;
}

export default function DateInput({
  label,
  value,
  disabled = false,
  onChange,
}: DateInputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-normal text-gray-600 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="date"
          value={value ? value.toISOString().split("T")[0] : ""}
          onChange={(e) => {
            const date = e.target.value ? new Date(e.target.value) : undefined;
            if (!date) return;
            onChange(date);
          }}
          disabled={disabled}
          className={`w-full h-12 px-3 border border-slate-gray rounded-md font-inter text-theme-primary
            placeholder:text-gray-400 
            focus:outline-none focus:ring-1 focus:ring-gray-400
            disabled:bg-gray-100 disabled:cursor-not-allowed
            [&::-webkit-calendar-picker-indicator]:opacity-0
            ${disabled && "opacity-60"}`}
        />
        <FiCalendar className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}
