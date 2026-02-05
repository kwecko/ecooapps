"use client";

import { useEffect, useRef, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { FiChevronDown } from "react-icons/fi";

interface Option {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  label: string;
  placeholder?: string;
  value?: Option | null;
  onSearch: (search: string) => Promise<Option[]>;
  onChange: (option: Option | null) => void;
  errorMessage?: string;
  disabled?: boolean;
}

export default function SearchableSelect({
  label,
  placeholder = "Digite para buscar...",
  value,
  onSearch,
  onChange,
  errorMessage,
  disabled = false,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [options, setOptions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const onSearchRef = useRef(onSearch);

  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!isOpen) {
      setSearchTerm("");
      setOptions([]);
      return;
    }

    if (searchTerm.length < 3) {
      setOptions([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const results = await onSearchRef.current(searchTerm);
        setOptions(results);
      } catch (error) {
        setOptions([]);
      } finally {
        setIsLoading(false);
      }
    }, 1000);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm, isOpen]);

  const handleSelect = (option: Option) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleClear = () => {
    onChange(null);
    setSearchTerm("");
  };

  return (
    <div ref={selectRef} className="relative w-full pt-2">
      <label className="block mb-2 text-sm font-inter text-theme-primary">
        {label}
      </label>
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`flex justify-between items-center px-4 h-12 border rounded-lg cursor-pointer bg-white ${
          disabled
            ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
            : "border-slate-gray text-slate-gray hover:bg-gray-50"
        }`}
      >
        <span className="truncate flex-1 text-left">
          {value ? value.label : placeholder}
        </span>
        <div className="flex items-center gap-2">
          {!value && <HiOutlineSearch className="text-gray-400" size={20} />}
          {value && !disabled && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="text-gray-400 hover:text-gray-600 text-xl leading-none"
            >
              ×
            </button>
          )}
          <FiChevronDown
            className={`transition-transform duration-200 ${
              isOpen ? "rotate-180" : "rotate-0"
            } ${disabled ? "text-gray-400" : "text-slate-gray"}`}
          />
        </div>
      </div>
      {errorMessage && (
        <span className="text-sm text-red-500 mt-1">{errorMessage}</span>
      )}

      {!disabled && isOpen && (
        <div className="absolute mt-1 w-full bg-white border border-slate-gray rounded-lg shadow-lg z-50">
          <div className="relative p-2 border-b">
            <HiOutlineSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Digite pelo menos 3 caracteres..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-theme-highlight focus:border-transparent"
              onClick={(e) => e.stopPropagation()}
              autoFocus
            />
          </div>
          <ul className="max-h-48 overflow-auto">
            {isLoading && (
              <li className="px-4 py-2 text-center text-gray-500">
                Buscando...
              </li>
            )}
            {!isLoading && searchTerm.length < 3 && (
              <li className="px-4 py-2 text-center text-gray-500">
                Digite pelo menos 3 caracteres para buscar
              </li>
            )}
            {!isLoading && searchTerm.length >= 3 && options.length === 0 && (
              <li className="px-4 py-2 text-center text-gray-500">
                Nenhum resultado encontrado
              </li>
            )}
            {!isLoading &&
              options.map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                    value?.value === option.value ? "bg-gray-100" : ""
                  }`}
                >
                  {option.label}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

