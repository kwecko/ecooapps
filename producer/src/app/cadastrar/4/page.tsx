"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";

import { registerFarm } from "@producer/_actions/farms/POST/register-farm";

import ButtonV2 from "@shared/components/ButtonV2";
import CustomInput from "@shared/components/CustomInput";
import Loader from "@shared/components/Loader";
import { useHandleError } from "@shared/hooks/useHandleError";
import { useLocalStorage } from "@shared/hooks/useLocalStorage";
import { fifthStepRegisterSchema } from "@shared/schemas/register";
import { FifthStepRegisterSchema } from "@shared/types/register";

export default function FifthStep() {
  const [isPending, starTransition] = useTransition();

  const router = useRouter();

  const { handleError } = useHandleError();
  const { deleteFromStorage } = useLocalStorage();

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FifthStepRegisterSchema>({
    resolver: zodResolver(fifthStepRegisterSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      tally: "",
    },
  });

  const submit = async ({ name, tally }: FifthStepRegisterSchema) => {
    starTransition(async () => {
      const isValid = await trigger();

      if (!isValid) {
        return;
      }

      registerFarm({ name, tally })
        .then((response) => {
          if (response.message) {
            handleError(response.message);
          }

          handleDeleteFromStorage();
          toast.success("Produtor cadastrado com sucesso!");
          router.push("/negocio/aguardando-aprovacao");
        })
        .catch(() => {
          toast.error("Erro desconhecido.");
        });
    });
  };

  const handleDeleteFromStorage = () => {
    deleteFromStorage("register-form-data");
    deleteFromStorage("register-current-step");
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="w-full h-full flex flex-col justify-between mb-2 mt-6"
    >
      <div className="w-full flex flex-col gap-6 mb-3">
        <CustomInput
          register={register("name")}
          label="Nome do seu negócio"
          placeholder="Nome do seu negócio"
          type="text"
          errorMessage={errors.name?.message}
        />
        <CustomInput
          register={register("tally")}
          label="Número do Talão"
          placeholder="Insira o número do Talão"
          type="number"
          errorMessage={errors.tally?.message}
          maxLength={12}
        />
      </div>
      <div className="w-full flex flex-col gap-3 mb-3">
        <ButtonV2
          type="submit"
          variant="default"
          className="h-12 flex justify-center items-center"
        >
          {isPending ? <Loader loaderType="login" /> : "Finalizar cadastro"}
        </ButtonV2>
        <Link href={"/inicio"}>
          <ButtonV2
            type="submit"
            variant="transparent"
            border={true}
            className="h-12 flex justify-center items-center mt-0"
            onClick={() => {
              deleteFromStorage("register-form-data");
              deleteFromStorage("register-current-step");
            }}
          >
            Tela inicial
          </ButtonV2>
        </Link>
      </div>
    </form>
  );
}
