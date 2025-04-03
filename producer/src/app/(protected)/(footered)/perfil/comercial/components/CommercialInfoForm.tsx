import React from 'react';
import CustomInput from "@shared/components/CustomInput";
import Image from "next/image";
import { Control, UseFormRegister, UseFormGetValues, FieldErrors, Controller } from "react-hook-form";
import { HiOutlinePencil } from "react-icons/hi";
import { ChangeComercialRegistrationSchema } from '@shared/schemas/change-comercial-registration';

interface CommercialInfoFormProps {
  photo: string;
  setPhoto: React.Dispatch<React.SetStateAction<string>>;
  register: UseFormRegister<ChangeComercialRegistrationSchema>;
  errors: FieldErrors<ChangeComercialRegistrationSchema>;
  charCount: number;
  setCharCount: React.Dispatch<React.SetStateAction<number>>;
  getValues: UseFormGetValues<ChangeComercialRegistrationSchema>;
  control: Control<ChangeComercialRegistrationSchema>;
}

function CommercialInfoForm({ photo, setPhoto, register, errors, charCount, setCharCount, getValues, control }: CommercialInfoFormProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-5">
      <div className="w-32.5 h-32.5 relative">
        <Image
          priority
          src={photo || "/producer.jpeg"}
          alt="Foto do produtor"
          width={130}
          height={130}
          onError={(e) => {
            e.currentTarget.src = "/producer.jpeg";
          }}
          className="rounded-full border border-theme-default object-cover aspect-square"
        />
        <div className="absolute w-7.5 h-7.5 bottom-0 right-0 bg-theme-primary bg-opacity-50 rounded-full cursor-pointer">
          <label
            htmlFor="photo-input"
            className="cursor-pointer w-full h-full relative flex items-center justify-center"
          >
            <HiOutlinePencil className="text-white h-full w-full absolute top-0 left-0 p-1.25 cursor-pointer" />
            <Controller
              name="photo"
              control={control}
              render={({ field: { ref, name, onBlur, onChange } }) => (
                <input
                  id="photo-input"
                  className="w-full h-full opacity-0 absolute"
                  type="file"
                  accept="image/png, image/jpeg"
                  ref={ref}
                  name={name}
                  onBlur={onBlur}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      setPhoto(url);
                      onChange(file);
                    }
                  }}
                />
              )}
            />
          </label>
        </div>
      </div>
      {errors.photo && (
        <span className="text-red-500 text-sm font-semibold">
          {typeof errors.photo?.message === "string" && errors.photo.message}
        </span>
      )}
      <CustomInput
        register={{ ...register("name") }}
        placeholder="Nome comercial"
        label="Nome comercial"
        type="text"
        errorMessage={errors.name?.message}
      />
      <CustomInput
        register={{ ...register("tally") }}
        placeholder="Inscrição estadual"
        label="Inscrição estadual"
        inputMode="numeric"
        type="text"
        mask="tally"
        errorMessage={errors.tally?.message}
        disabled
      />
      <div className="w-full h-full relative flex flex-col text-slate-gray">
        <label className="text-sm leading-4.75 font-inter font-normal text-theme-primary pb-1.75 flex flex-row items-center justify-start gap-2 tracking-tight-2">
          Descrição
        </label>
        <textarea
          {...register("description")}
          maxLength={500}
          placeholder="Escreva uma breve descrição"
          className="w-full p-3 border border-theme-primary rounded-lg font-inter font-normal box-border h-50 resize-none"
          onChange={(e) => {
            setCharCount(e.target.value.length);
          }}
        />
        <p className="text-right text-slate-gray text-xs mt-1">{`${
          charCount || getValues("description")?.length || 0
        }/500`}</p>
      </div>
      <div className="relative flex flex-col text-slate-gray w-full">
        <label className="text-sm leading-4.75 font-inter font-normal text-theme-primary pb-1.75 flex flex-row items-center justify-start gap-2 tracking-tight-2">
          Selecione até 4 fotos
        </label>
        <div className="w-full flex flex-row justify-center items-center flex-wrap gap-3.25">
          {Array.from({ length: 4 }).map((_, index) => (
            <Image
              id={`photo-${index}`}
              key={index}
              priority
              src="/producer.jpeg"
              alt="User"
              width={130}
              height={130}
              className="rounded-lg w-18 border border-theme-default object-contain object-top aspect-square grayscale cursor-not-allowed"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CommercialInfoForm;