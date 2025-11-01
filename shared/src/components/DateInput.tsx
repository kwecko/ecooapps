"use client";

import { IoCalendarOutline } from "react-icons/io5";
import Input from "./Input";

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
  const formattedDate = value
  ? new Date(value).toISOString().split("T")[0]
  : "";
  return (
      <Input
        onChange={(e) => {
          const date = e.target.value ? new Date(e.target.value) : undefined;
          if (!date) return;
          onChange(date);
        }}
        labelClassName="block text-sm font-normal text-gray-600"
        className={`text-theme-primary text-sm pl-10
          placeholder:text-gray-400 
          focus:outline-none focus:ring-1 focus:ring-gray-400
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${disabled && "opacity-60"}`}
        type="date"
        value={formattedDate}
        label={label}
        icon={<IoCalendarOutline size={20} />}
        iconPosition="left"
      />
  );
}