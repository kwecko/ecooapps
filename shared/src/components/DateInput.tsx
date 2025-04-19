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
            ${disabled && "opacity-60"}`}
        />
      </div>
    </div>
  );
}