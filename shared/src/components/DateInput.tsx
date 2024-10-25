"use client";

import { FiCalendar } from 'react-icons/fi';

interface DateInputProps {
  disabled?: boolean
  label?: string;
  value?: string;
}

export default function DateInput({ label, value, disabled = false }: DateInputProps) {

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // onChange(maskDate(e.target.value));
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm text-theme-primary mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleDateChange}
          maxLength={10}
          placeholder="DD/MM/YYYY"
          disabled={disabled}
          className={`w-full h-12 pl-3 pr-4 border border-gray-300 rounded-md placeholder-[#9BA5B7] text-theme-primary focus:outline-none focus:ring-0 focus:border-slate-gray ${disabled && 'opacity-50 cursor-not-allowed'}`}
        />
        <FiCalendar className="absolute right-3 top-3.5 text-[#9BA5B7]" />
      </div>
    </div>
  );
}
