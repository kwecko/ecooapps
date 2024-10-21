import { useState, InputHTMLAttributes } from "react";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { UseFormRegisterReturn } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { Masks } from "@shared/types/register";
import { maskCellphone, maskCAF, maskCPF } from "@shared/utils/index";
import ButtonV2 from "./ButtonV2";
import InfoModal from "./InfoModal";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
  register: UseFormRegisterReturn;
  mask?: Masks;
}

export default function CustomInput({
  label,
  errorMessage,
  register,
  type,
  mask,
  ...inputProps
}: CustomInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isOpenInfoModal, setIsOpenInfoModal] = useState(false);

  const masksActions: Record<Masks, (value: string) => string> = {
    phone: (value: string) => maskCellphone(value),
    cpf: (value: string) => maskCPF(value),
    caf: (value: string) => maskCAF(value),
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    let maskedValue = value;

    if (mask && masksActions[mask]) {
      maskedValue = masksActions[mask](value);
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
    setIsOpenInfoModal(true)
  }

  return (
    <div className="w-full flex flex-col">
      <label className="text-slate-gray font-inter">
        <span className="text-sm">{label}</span>
        <div className="relative mt-1 w-full">
          <input
            {...register}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-slate-gray px-4 h-12 text-slate-gray focus:outline-none"
            type={type === "password" && showPassword ? "text" : type}
            {...inputProps}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-3.5 text-theme-primary"
              tabIndex={-1}
            >
              {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
            </button>
          ) || mask === 'caf' && (
            <button
              type="button"
              onClick={handleIconClick}
              className="absolute right-3 top-3.5 text-theme-primary"
              tabIndex={-1}
            >
              <FaRegCircleQuestion size={20} />
            </button>
          )}
        </div>
      </label>
      {errorMessage && <span className="text-sm text-red-500 mt-1">{errorMessage}</span>}
      <InfoModal
        isOpen={isOpenInfoModal}
        titleContentModal="Sobre o CAF"
        contentModal={
          <p>
            O CAF (Cadastro Nacional da Agricultura Familiar) é uma identificação das Unidades Familiares de Produção Agrária (UFPA), dos Empreendimentos Familiares Rurais e das formas associativas de organização da agricultura familiar. Para obter a sua inscrição, clique aqui.
          </p>
        }
        buttonOpenModal=""
        icon="?"
        titleCloseModal="Ok, entendi"
        setIsOpen={setIsOpenInfoModal}
      />
    </div>
  );
}
