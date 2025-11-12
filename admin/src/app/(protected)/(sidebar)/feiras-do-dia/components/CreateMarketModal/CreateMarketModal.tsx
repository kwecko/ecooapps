"use client";

import Loader from "@shared/components/Loader";
import ModalV2 from "@shared/components/ModalV2";
import ButtonV2 from "@shared/components/ButtonV2";
import Input from "@shared/components/CustomInput";

import useCreateMarketModal from "./index";

interface CreateMarketModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export default function CreateMarketModal({
  isOpen,
  closeModal,
}: CreateMarketModalProps) {
  const {
    register,
    handleSubmit,
    errors,
    isPending,
    onSubmit,
  } = useCreateMarketModal({ closeModal });

  return (
    <ModalV2
      isOpen={isOpen}
      closeModal={closeModal}
      className="w-152 bg-white text-coal-black"
      title="Nova feira"
      iconClose={true}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Input
          label="Nome da feira"
          placeholder="Ex: Feira de Orgânicos - 20/08/2025"
          register={{ ...register("name") }}
          type="text"
          errorMessage={errors.name?.message}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descrição (opcional)
          </label>
          <textarea
            {...register("description")}
            placeholder="Adicione uma descrição para esta feira..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-theme-highlight focus:border-transparent resize-none"
            rows={3}
            maxLength={200}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

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
            className="bg-theme-highlight border-none"
            disabled={isPending}
          >
            {isPending && <Loader loaderType="login" />}
            {!isPending && "Criar feira"}
          </ButtonV2>
        </div>
      </form>
    </ModalV2>
  );
}

