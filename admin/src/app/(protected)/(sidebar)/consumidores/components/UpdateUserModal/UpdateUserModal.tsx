"use client";

import Loader from "@shared/components/Loader";
import ModalV2 from "@shared/components/ModalV2";
import ButtonV2 from "@shared/components/ButtonV2";
import Input from "@shared/components/CustomInput";
import SelectInput from "@shared/components/SelectInput";

import { UserDTO } from "@shared/interfaces/dtos";
import useUpdateUserModal from ".";

interface UpdateUserModalProps {
  isOpen: boolean;
  closeModal: () => void;
  user: UserDTO | null;
  reloadUsers: () => void;
}

export default function UpdateUserModal({
  isOpen,
  closeModal,
  user,
  reloadUsers,
}: UpdateUserModalProps) {
  const {
    register,
    setValue,
    handleSubmit,
    errors,
    isPending,
    onSubmit,
  } = useUpdateUserModal({ closeModal, reloadUsers, user });

  const isActive = [
    { value: true, label: 'Sim' },
    { value: false, label: 'Não' },
  ];

  return (
    <ModalV2
      isOpen={isOpen}
      closeModal={closeModal}
      className="w-152 bg-white text-coal-black"
      title="Editar Consumidor"
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
        <SelectInput
          label="Usuário ativo?"
          options={isActive}
          defaultOption={
            isActive.find(
              (option) => option.value === user?.active
            ) ?? isActive[0]
          }
          onChange={(value) => setValue("active", value)}
        />
        
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
              reloadUsers();
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
