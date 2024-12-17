import { InputHTMLAttributes, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { Masks } from "@shared/types/register";
import { maskCellphone, maskCPF, maskTally } from "@shared/utils/index";

import React from "react";
import { twMerge } from "tailwind-merge";
import InfoModal from "./InfoModal";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
  register: UseFormRegisterReturn;
  type?: string;
  mask?: Masks;
  disabled?: boolean;
}

export default function CustomInput({
  label,
  errorMessage,
  register,
  type,
  mask,
  maxLength,
  disabled,
  ...inputProps
}: CustomInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);

  const masksActions: Record<Masks, (value: string) => string> = {
    phone: (value: string) => maskCellphone(value),
    cpf: (value: string) => maskCPF(value),
    tally: (value: string) => maskTally(value),
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    let maskedValue = value;

    if (mask && masksActions[mask]) {
      maskedValue = masksActions[mask](value);
    }

    if (maxLength && maskedValue.length > maxLength) {
      maskedValue = maskedValue.slice(0, maxLength);
    }

    event.target.value = maskedValue;

    register.onChange({
      target: {
        name: event.target.name,
        value: maskedValue,
      },
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleIconClick = () => {
    setIsOpenInfoModal(true);
  };

  return (
    <div className="w-full flex flex-col">
      <label className="text-slate-gray font-inter">
        <span className="text-sm">{label}</span>
        <div className="relative mt-1 w-full">
          <input
            {...register}
            onChange={handleInputChange}
            className={twMerge(
              "w-full rounded-lg border border-slate-gray px-3 h-12 text-slate-gray focus:outline-none",
              disabled && "bg-gray-100 cursor-not-allowed text-gray-500"
            )}
            type={type === "password" && showPassword ? "text" : type}
            {...inputProps}
            disabled={disabled}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-3.5 text-theme-primary"
              tabIndex={-1}
            >
              {showPassword ? (
                <AiFillEyeInvisible size={20} />
              ) : (
                <AiFillEye size={20} />
              )}
            </button>
          )}
        </div>
      </label>
      {errorMessage && (
        <span className="text-sm text-red-500 mt-1">{errorMessage}</span>
      )}
      <InfoModal
        isOpen={isOpenInfoModal}
        titleContentModal="Sobre o Nº do talão"
        contentModal={
          <p>O Nº do talão é um número de identificação do talão de pedidos.</p>
        }
        buttonOpenModal=""
        icon="?"
        titleCloseModal="Ok, entendi"
        setIsOpen={setIsOpenInfoModal}
      />
    </div>
  );
}
