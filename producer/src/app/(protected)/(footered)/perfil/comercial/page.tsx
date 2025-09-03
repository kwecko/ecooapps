"use client";

import { ModelPage } from "@shared/components/ModelPage";
import Button from "@shared/components/Button";
import Loader from "@shared/components/Loader";
import Modal from "@shared/components/Modal";

import CommercialInfoForm from "./components/CommercialInfoForm";
import { useChangeComercialRegistrationForm } from "../components/ChangeComercialRegistrationForm/useChangeComercialRegistrationForm";

export default function ComercialPage() {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    errors,
    confirmSubmission,
    
    photo,
    imagesFile,
    isModalOpen,
    charCount,
    isLoading,
    
    setPhoto,
    sendImage,
    removeImage,
    setCharCount,
    setIsModalOpen,
  } = useChangeComercialRegistrationForm();

  return (
    <ModelPage
      title="Informações Comerciais"
      titleClassName="pt-17"
      titleGap="gap-2.5"
      subtitle="Atualize as informações comerciais da sua fazenda."
      subtitleClassName="px-9 leading-5.5"
    >
      <form onSubmit={handleSubmit} className="h-full w-full flex flex-col overflow-y-hidden">
        <div className="gap-3.5 w-full overflow-y-auto flex flex-col items-center justify-between pb-16 pt-7.5">
          <CommercialInfoForm
            photo={photo}
            images={imagesFile}
            setPhoto={setPhoto}
            sendImage={sendImage}
            removeImage={removeImage}
            register={register}
            errors={errors}
            charCount={charCount}
            setCharCount={setCharCount}
            getValues={getValues}
            control={control}
          />
        </div>

        <div className="w-full flex gap-2 bg-transparent pb-5">
          <Button
            className="w-full h-11 rounded-lg bg-theme-default font-semibold text-white"
            title="Salvar"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Loader loaderType="component" /> : "Salvar"}
          </Button>
          <Modal
            titleContentModal="Você tem certeza?"
            contentModal="Ao clicar em confirmar seus dados de cadastro serão atualizados."
            titleCloseModal="Cancelar"
            titleConfirmModal="Confirmar"
            bgOpenModal="#2F4A4D"
            bgConfirmModal="#2F4A4D"
            bgCloseModal="bg-gray-100"
            modalAction={confirmSubmission}
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
          />
        </div>
      </form>
    </ModelPage>
  );
}
