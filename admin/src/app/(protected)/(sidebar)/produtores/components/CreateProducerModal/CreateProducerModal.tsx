"use client";

import Image from "next/image";

import Loader from "@shared/components/Loader";
import ModalV2 from "@shared/components/ModalV2";
import ButtonV2 from "@shared/components/ButtonV2";
import Input from "@shared/components/CustomInput";

import { ProducerDTO } from "@shared/interfaces/dtos/producer-dto";

import useCreateProducerModal from ".";
import { FiPaperclip } from "react-icons/fi";

interface CreateProducerModalProps {  
  isOpen: boolean;
  closeModal: () => void;
  reloadProducers: () => void;
}

export default function CreateProducerModal({
  isOpen,
  closeModal,
  reloadProducers,
}: CreateProducerModalProps) {
  const {
    register,
    handleSubmit,
    errors,
    isPending,
    previewImage,
    handleFileChange,
    onSubmit,
  } = useCreateProducerModal({ closeModal, reloadProducers });

  return (
    <ModalV2
      isOpen={isOpen}
      closeModal={closeModal}
      className="w-152 bg-white text-coal-black"
      title="Cadastrar produtor"
      iconClose={true}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Nome"
            placeholder="Fulano"
            register={{ ...register("first_name") }}
            type="text"
            errorMessage={errors.first_name?.message}
          />
          <Input
            label="Sobrenome"
            placeholder="da Silva"
            register={{ ...register("last_name") }}
            type="text"
            errorMessage={errors.last_name?.message}
          />
        </div>

        <Input
          label="CPF"
          placeholder="123.456.789-00"
          register={{ ...register("cpf") }}
          type="text"
          errorMessage={errors.cpf?.message}
        />
        <Input
          label="Negócio"
          placeholder="Sítio do Fulano"
          register={{ ...register("name") }}
          type="text"
          errorMessage={errors.name?.message}
        />
        <Input
          label="Talão"
          placeholder="123456"
          register={{ ...register("tally") }}
          type="text"
          errorMessage={errors.tally?.message}
        />
        <Input
          label="Email"
          placeholder="fulano@sitiodofulano.com.br"
          register={{ ...register("email") }}
          type="text"
          errorMessage={errors.email?.message}
        />

        <Input
          label="Celular"
          placeholder="(00) 9 9999-9999"
          register={{ ...register("phone") }}
          type="text"
          errorMessage={errors.phone?.message}
        />
        
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
          {errors.photo?.message && (
            <p className="text-red-500 text-sm mt-1">
              {String(errors.photo.message)}
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
              className="object-contain rounded-md border"
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
            onClick={() => {
              reloadProducers();
            }}
          >
            {isPending && <Loader loaderType="login" />}
            {!isPending && "Salvar alterações"}
          </ButtonV2>
        </div>
      </form>
    </ModalV2>
  );
}
