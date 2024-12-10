import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { HiOutlineFilter } from "react-icons/hi";
import { twMerge } from "tailwind-merge";

interface TableSearchInput {
  placeholder?: string;
  className?: string;
}

export default function TableSearchInput({
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

  return (
    <div className={twMerge("relative w-110", className)}>
      <input
        type="text"
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder={placeholder}
        className="border border-french-gray rounded-md h-12 p-4 pr-10 text-base inter-font w-full focus:border-slate-gray"
      />
      <HiOutlineFilter
        className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 cursor-pointer mr-1"
        size={24}
      />
    </div>
  );
}
