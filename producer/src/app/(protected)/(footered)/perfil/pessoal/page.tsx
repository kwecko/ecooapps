"use client";

import Button from "@shared/components/Button";
import Modal from "@shared/components/Modal";
import { ModelPage } from "@shared/components/ModelPage";
import Loader from "@shared/components/Loader";

import PersonalInfoForm from "./components/PersonalInfoForm";
import { useChangePersonalRegistrationForm } from "../components";

export default function ProfilePage() {
  const {
    isLoading,
    isModalOpen,
    setIsModalOpen,
    register,
    confirmSubmission,
    errors,
    control,
    handleSubmit,
    handleSubmitForm,
  } = useChangePersonalRegistrationForm();

  return (
    <ModelPage
      title="Seu perfil"
      titleClassName="pt-17"
      titleGap="gap-2.5"
      subtitle="Após atualizar os seus dados, clique em salvar."
      subtitleClassName="px-9 leading-5.5"
    >
      <form onSubmit={handleSubmit(handleSubmitForm)} className="h-full w-full flex flex-col overflow-y-hidden">
        <div className="gap-3.5 w-full overflow-y-auto flex flex-col items-center justify-between pb-16 pt-7.5">
          <PersonalInfoForm register={register} errors={errors} control={control} />
        </div>

        <div className="w-full flex gap-2 bg-transparent pb-5">
          <Button
            className="w-full h-11 rounded-lg bg-theme-default font-semibold text-white"
            title="Salvar"
            type="submit"
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