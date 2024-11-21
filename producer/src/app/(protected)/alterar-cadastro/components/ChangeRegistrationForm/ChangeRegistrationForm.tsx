import Image from "next/image";
import { forwardRef } from "react";

import CustomInput from "@shared/components/CustomInput";

import { useChangeRegistrationForm } from "./useChangeRegistrationForm";

const ChangeRegistrationForm = forwardRef<HTMLFormElement, {}>((props, ref) => {
  const { register, handleSubmit, handleSubmitForm, errors } =
    useChangeRegistrationForm();

  return (
    <form
      ref={ref}
      onSubmit={handleSubmit(handleSubmitForm)}
      className="mt-7.5 pb-14 gap-3.5 w-full h-full overflow-y-auto flex flex-col items-center justify-between"
    >
      <>
        <div className="w-32.5 h-32.5">
          <Image
            priority
            src="/producer.jpeg"
            alt="User"
            width={130}
            height={130}
            className="rounded-full border border-theme-default object-none object-top aspect-square grayscale cursor-not-allowed"
          />
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-5">
          <CustomInput
            register={{ ...register("first_name") }}
            placeholder="Primeiro nome"
            label="Nome"
            type="text"
            errorMessage={errors.first_name?.message}
          />
          <CustomInput
            register={{ ...register("last_name") }}
            placeholder="Sobrenome"
            label="Sobrenome"
            type="text"
            errorMessage={errors.last_name?.message}
          />
          <CustomInput
            register={{ ...register("email") }}
            placeholder="E-mail"
            label="E-mail"
            type="text"
            disabled={false}
            errorMessage={errors.email?.message}
          />
          <CustomInput
            register={{ ...register("phone") }}
            placeholder="Celular"
            label="Celular"
            type="text"
            mask="phone"
            errorMessage={errors.phone?.message}
          />
        </div>
        <hr className="w-37.5 mt-7 mb-2.5 bg-french-gray h-px" />
        <h3 className="text-xl leading-7.5 font-medium text-theme-home-bg">
          Informações comerciais
        </h3>
        <div className="w-full flex flex-col items-center justify-center gap-5">
          <CustomInput
            register={{ ...register("name") }}
            placeholder="Nome comercial"
            label="Nome comercial"
            type="text"
            errorMessage={errors.name?.message}
          />
          <CustomInput
            register={{ ...register("tally") }}
            placeholder="Número do Talão"
            label="Número do Talão"
            inputMode="numeric"
            type="text"
            mask="tally"
            errorMessage={errors.tally?.message}
          />
          <div className="w-full h-full relative flex flex-col text-slate-gray">
            <label className="text-sm leading-4.75 font-inter font-normal text-theme-primary pb-1.75 flex flex-row items-center justify-start gap-2 tracking-tight-2">
              Descrição
            </label>
            <textarea
              {...register("description")}
              maxLength={200}
              placeholder="Escreva uma breve descrição"
              className="w-full p-3 border border-theme-primary rounded-lg font-inter font-normal box-border h-50 resize-none"
            />
          </div>
          <div className="relative flex flex-col text-slate-gray w-full">
            <label className="text-sm leading-4.75 font-inter font-normal text-theme-primary pb-1.75 flex flex-row items-center justify-start gap-2 tracking-tight-2">
              Selecione até 4 fotos
            </label>
            <div className="w-full flex flex-row justify-start items-center flex-wrap gap-3.25">
              <Image
                priority
                src="/producer.jpeg"
                alt="User"
                width={130}
                height={130}
                className="rounded-lg w-18 border border-theme-default object-contain object-top aspect-square grayscale cursor-not-allowed"
              />
              <Image
                priority
                src="/producer.jpeg"
                alt="User"
                width={130}
                height={130}
                className="rounded-lg w-18 border border-theme-default object-contain object-top aspect-square grayscale cursor-not-allowed"
              />
              <Image
                priority
                src="/producer.jpeg"
                alt="User"
                width={130}
                height={130}
                className="rounded-lg w-18 border border-theme-default object-contain object-top aspect-square grayscale cursor-not-allowed"
              />
              <Image
                priority
                src="/producer.jpeg"
                alt="User"
                width={130}
                height={130}
                className="rounded-lg w-18 border border-theme-default object-contain object-top aspect-square grayscale cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      </>
    </form>
  );
});

ChangeRegistrationForm.displayName = "ChangeRegistrationForm";

export default ChangeRegistrationForm;
