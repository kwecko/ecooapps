import React from "react";

import { twMerge } from "tailwind-merge";

import { HiOutlineSearch, HiOutlineFilter } from "react-icons/hi";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: (value: string) => void;
  type?: "primary" | "secondary";
}

export default function SearchInput({
  onChange,
  placeholder,
  type = "primary",
  className,
  ...props
}: SearchInputProps) {
  const iconStyle =
    "absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 cursor-pointer";

  const inputClasses = twMerge(
    "rounded-md h-12 p-4 pr-10 text-base inter-font focus:border-slate-gray border",
    type === "primary" && "border-french-gray",
    type === "secondary" && "border-theme-primary",
    className
  );

  return (
    <div className="relative">
      <input
        type="text"
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputClasses}
        {...props}
      />
      {type === "primary" && <HiOutlineSearch className={iconStyle} size={24} />}
      {type === "secondary" && <HiOutlineFilter className={iconStyle} size={24} />}
    </div>
  );
}
