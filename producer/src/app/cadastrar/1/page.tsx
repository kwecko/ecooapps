'use client'

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { options } from "../data";

import { firstStepRegisterSchema } from "@shared/schemas/register"
import CustomInput from "@shared/components/CustomInput"
import SelectInput from "@shared/components/SelectInput"
import Loader from "@shared/components/Loader";
import ButtonV2 from "@shared/components/ButtonV2";
import { useLocalStorage } from "@shared/hooks/useLocalStorage";
import { FirstStepRegisterSchema, Roles } from "@shared/types/register";

export default function FirstStep() {
  const [role, setRole] = useState<Roles>(options[0].value);
  const [isPending, starTransition] = useTransition()
  const { getFromStorage, setInStorage, deleteFromStorage } = useLocalStorage();

  const router = useRouter();

  const savedData = getFromStorage("register-form-data");

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FirstStepRegisterSchema>({
    resolver: zodResolver(firstStepRegisterSchema),
    mode: "onChange",
    defaultValues: {
      firstName: savedData?.firstName,
      lastName: savedData?.lastName,
      email: savedData?.email
    }
  });

  const submit = async ({ firstName, lastName, email }: FirstStepRegisterSchema) => {
    starTransition(async () => {
      const isValid = await trigger();

      if (!isValid) {
        return;
      }

      setInStorage("register-form-data", {
        ...savedData,
        firstName,
        lastName,
        email,
        role
      });
      setInStorage("register-current-step", 2);
      router.push("/cadastrar/2");
    })
  };

  const handleChange = (value: Roles) => {
    setRole(value);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="w-full h-full flex flex-col justify-between mb-2">
      <div className="w-full flex flex-col gap-6 mb-3">
        <SelectInput
          label="Selecione o tipo da conta"
          options={options}
          onChange={handleChange}
          defaultOption={options[0]}
        />
        <CustomInput
          register={register('firstName')}
          label="Primeiro nome"
          placeholder="Insira o seu primeiro nome"
          type="text"
          errorMessage={errors.firstName?.message}
        />
        <CustomInput
          register={register('lastName')}
          label="Segundo nome"
          placeholder="Insira o seu segundo nome"
          type="text"
          errorMessage={errors.lastName?.message}
        />
        <CustomInput
          register={register('email')}
          label="Email"
          placeholder="Insira o seu email"
          type="text"
          errorMessage={errors.email?.message}
        />
      </div>
      <div className="w-full flex gap-3 mb-3">
        <Link className="w-full" href={'/inicio'}>
          <ButtonV2
            type="button"
            variant="transparent"
            border={true}
            className="h-12 flex justify-center items-center"
            onClick={() => {
              deleteFromStorage('register-current-step');
              deleteFromStorage('register-form-data');
            }}
          >
            Voltar
          </ButtonV2>
        </Link>
        <ButtonV2
          type="submit"
          variant="default"
          className="h-12 flex justify-center items-center"
        >
          {isPending ? (<Loader appId="PRODUCER" loaderType="login" />) : "Avançar"}
        </ButtonV2>
      </div>
    </form>
  );
}
