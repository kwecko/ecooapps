import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { HiOutlineFilter, HiOutlineSearch, HiOutlineX } from "react-icons/hi";
import { twMerge } from "tailwind-merge";

interface TableSearchInput {
  icon?: "filter" | "search";
  placeholder?: string;
  className?: string;
}

export default function TableSearchInput({
  icon = "filter",
  placeholder,
  className,
}: TableSearchInput) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const handleInputChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("q", value);
    params.delete("p");
    router.push(`${pathname}?${params.toString()}`);
  };

  const [searchValue, setSearchValue] = useState("");

  return (
    <div className={twMerge("relative w-110", className)}>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          handleInputChange(e.target.value);
        }}
        placeholder={placeholder}
        className="border border-french-gray rounded-md h-12 p-4 pr-10 text-base inter-font w-full focus:border-slate-gray"
      />
      {!searchValue && icon === "filter" && (
        <HiOutlineFilter
          className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 cursor-pointer mr-1"
          size={24}
        />
      )}
      {!searchValue && icon === "search" && (
        <HiOutlineSearch
          className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 cursor-pointer mr-1"
          size={24}
        />
      )}
      {searchValue && (
        <HiOutlineX
          className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 cursor-pointer mr-1"
          size={24}
          onClick={() => {
            setSearchValue("");
            handleInputChange("");
          }}
        />
      )}
    </div>
  );
}
