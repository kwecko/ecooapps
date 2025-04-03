import React from 'react';
import CustomInput from "@shared/components/CustomInput";
import { Control, UseFormRegister, FieldErrors } from "react-hook-form";
import Image from "next/image";
import { HiOutlinePencil } from "react-icons/hi";
import { ChangePersonalRegistrationSchema } from '@shared/schemas/change-personal-registration';

interface PersonalInfoFormProps {
  register: UseFormRegister<ChangePersonalRegistrationSchema>;
  errors: FieldErrors<ChangePersonalRegistrationSchema>;
  control: Control<ChangePersonalRegistrationSchema>;
}

function PersonalInfoForm({ register, errors, control }: PersonalInfoFormProps) {
  return (
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
        errorMessage={errors.email?.message}
        disabled
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
  );
}

export default PersonalInfoForm;