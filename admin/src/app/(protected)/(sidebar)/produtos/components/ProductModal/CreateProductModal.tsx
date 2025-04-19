"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { FiPaperclip, FiX } from "react-icons/fi";

import Loader from "@shared/components/Loader";
import ModalV2 from "@shared/components/ModalV2";
import ButtonV2 from "@shared/components/ButtonV2";
import Input from "@shared/components/CustomInput";
import SelectInput from "@shared/components/SelectInput";

import { ProductDTO } from "@shared/interfaces/dtos";

import { useHandleError } from "@shared/hooks/useHandleError";

import useProductModal from "./index";
import {
  commercializationOptions,
  perishableOptions,
  archivedOptions,
} from "./data";

import { listCategories } from "@admin/_actions/categories/GET/list-categories";

interface CreateProductModalProps {
  isOpen: boolean;
  closeModal: () => void;
  product: ProductDTO | null;
  reloadProducts: () => void;
}

export default function CreateProductModal({
  isOpen,
  closeModal,
  product,
  reloadProducts,
}: CreateProductModalProps) {
  const {
    register,
    setValue,
    handleSubmit,
    errors,
    isPending,
    previewImage,
    handleFileChange,
    onSubmit,
  } = useProductModal({ closeModal, reloadProducts });

  const [categoryOptions, setCategoryOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const { handleError } = useHandleError();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await listCategories({ page: 1 });

        if (response.message) {
          handleError(response.message);
          return;
        }

        const options = response.data.map(
          ({ id, name }: { id: string; name: string }) => ({
            value: id,
            label: name,
          })
        );

        setCategoryOptions(options);
      } catch (error) {
        handleError("Erro ao buscar categorias.");
      }
    }

    fetchCategories();
  }, []);

  return (
    <ModalV2
      isOpen={isOpen}
      closeModal={closeModal}
      className="w-152 bg-white text-coal-black"
      title="Cadastrar produto"
      iconClose={true}
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
          defaultOption={
            categoryOptions.find(
              (option) => option.value === product?.category.id
            ) ?? categoryOptions[0]
          }
          onChange={(value) => {
            setValue("category", value);
          }}
        />
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
        <div className="grid grid-cols-3 gap-4">
          <SelectInput
            label="Produto perecível?"
            options={perishableOptions}
            defaultOption={
              perishableOptions.find(
                (option) => option.value === product?.perishable
              ) ?? perishableOptions[0]
            }
            onChange={(value) => setValue("perishable", value)}
          />

          <SelectInput
            label="Oculto?"
            options={perishableOptions}
            defaultOption={
              archivedOptions.find(
                (option) => option.value === product?.perishable
              ) ?? archivedOptions[0]
            }
            onChange={(value) => setValue("archived", value)}
          />

          <SelectInput
            label="Comercialização"
            options={commercializationOptions}
            defaultOption={
              commercializationOptions.find(
                (option) => option.value === product?.pricing
              ) ?? commercializationOptions[0]
            }
            onChange={(value) => setValue("pricing", value)}
          />
          {errors.pricing && (
            <p className="text-red-500 text-sm">{errors.pricing.message}</p>
          )}
        </div>

        <div>
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
            <p className="text-red-500 text-sm mt-1">
              {String(errors.image.message)}
            </p>
          )}
        </div>

        {previewImage && (
          <div className="relative w-18 h-18">
            <Image
              src={previewImage}
              alt="Pré-visualização"
              width={72}
              height={72}
              className="w-full h-full object-contain rounded-md border"
            />
            <button
              type="button"
              onClick={() => document.getElementById("file-upload")?.click()}
              className="absolute -top-3 -right-3 bg-theme-primary text-white rounded-full w-6 h-6 flex items-center justify-center ml-auto"
            >
              <FiPaperclip size={12} />
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
