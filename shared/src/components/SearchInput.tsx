import { ChangeEvent } from "react";
import { HiOutlineSearch } from "react-icons/hi";

interface SearchInputProps {
  onChange: (value: string) => void
  placeholder?: string
}

export default function SearchInput({ onChange, placeholder }: SearchInputProps){
  return (
    <div className="relative w-full">
      <input
        type="text"
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="border border-french-gray rounded-md h-12 p-4 pr-10 text-base inter-font w-full focus:border-slate-gray"
      />
      <HiOutlineSearch
        className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
        size={24}
      />
    </div>
  )
}