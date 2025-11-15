"use client";

import Loader from "@shared/components/Loader";
import ModalV2 from "@shared/components/ModalV2";
import ButtonV2 from "@shared/components/ButtonV2";
import Input from "@shared/components/CustomInput";
import SelectInput from "@shared/components/SelectInput";

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
    cycleOptions,
    setValue,
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

        <SelectInput
          label="Importar estoque de um ciclo (opcional)"
          options={cycleOptions}
          defaultOption={cycleOptions.find((opt) => opt.value === "") || cycleOptions[0]}
          onChange={(value) => {
            setValue("cycle_id", value);
          }}
          register={register("cycle_id")}
          errorMessage={errors.cycle_id?.message}
        />
        {cycleOptions.length > 1 && (
          <p className="text-xs text-gray-600 -mt-3">
            Selecione um ciclo para importar todos os itens não vendidos do estoque.
          </p>
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

