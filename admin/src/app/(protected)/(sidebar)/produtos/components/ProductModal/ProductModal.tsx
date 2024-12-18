"use client";

import React from "react";
import { FiPaperclip, FiX } from "react-icons/fi";

import Loader from "@shared/components/Loader";
import ModalV2 from "@shared/components/ModalV2";
import ButtonV2 from "@shared/components/ButtonV2";
import Input from "@shared/components/CustomInput";
import SelectInput from "@shared/components/SelectInput";

import useProductModal from "./index";
import { categoryOptions, commercializationOptions, perishableOptions } from "./data";

interface ProductModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export default function ProductModal({ isOpen, closeModal }: ProductModalProps) {
  const {
    register,
    setValue,
    handleSubmit,
    errors,
    isPending,
    previewImage,
    handleFileChange,
    handleRemoveFile,
    onSubmit,
  } = useProductModal({ closeModal });

  return (
    <ModalV2
      isOpen={isOpen}
      closeModal={closeModal}
      className="w-152 bg-white"
      title="Cadastrar produto"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Input
          label="Qual o nome do produto?"
          placeholder="Morango Orgânico"
          register={{ ...register("name") }}
          type="text"
          errorMessage={errors.name?.message}
        />

        <SelectInput
          label="Selecione a categoria do produto"
          options={categoryOptions}
          defaultOption={categoryOptions[0]}
          onChange={() => {}}
          disabled
        />

        <div className="grid grid-cols-2 gap-4">
          <SelectInput
            label="Produto perecível?"
            options={perishableOptions}
            defaultOption={perishableOptions[0]}
            onChange={() => {}}
            disabled
          />

          <SelectInput
            label="Comercialização"
            options={commercializationOptions}
            onChange={(value) => setValue("pricing", value)}
            defaultOption={commercializationOptions[0]}
          />
          {errors.pricing && <p className="text-red-500 text-sm">{errors.pricing.message}</p>}
        </div>

        <div className="pb-5">
          <label
            htmlFor="file-upload"
            className="text-sm text-gray-600 mb-2 inline-flex items-center cursor-pointer"
          >
            <FiPaperclip size={20} className="mr-2 text-theme-primary" />
            <span className="text-theme-primary underline">
              Clique aqui para{" "}
              <span className="font-semibold">enviar a foto do produto</span>
            </span>
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            className="hidden"
            accept="image/png, image/jpeg"
          />
          {errors.image?.message && (
            <p className="text-red-500 text-sm mt-1">{String(errors.image.message)}</p>
          )}
        </div>

        {previewImage && (
          <div className="relative w-18 h-18">
            <img
              src={previewImage}
              alt="Pré-visualização"
              className="w-full h-full object-contain rounded-md border"
            />
            <button
              type="button"
              onClick={handleRemoveFile}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
            >
              <FiX size={12} />
            </button>
          </div>
        )}

        <div className="flex justify-between items-center gap-4">
          <ButtonV2
            variant="default"
            type="button"
            onClick={closeModal}
            className="bg-tertiary text-slate-dark border-none"
          >
            Cancelar
          </ButtonV2>
          <ButtonV2
            variant="default"
            type="submit"
            className="bg-rain-forest border-none"
          >
            {isPending && <Loader loaderType="login" />}
            {!isPending && "Salvar"}
          </ButtonV2>
        </div>
      </form>
    </ModalV2>
  );
}
