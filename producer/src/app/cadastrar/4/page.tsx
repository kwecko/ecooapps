"use client";
import { maskCAF } from "@shared/utils/index";

import Input from "../components/Input";
import { registerStep4FieldsSchema } from "../schemas";

export default function RegisterStep4() {
  const unparsedFormData = localStorage.getItem("register-form-data");
  const formData = unparsedFormData ? JSON.parse(unparsedFormData) : null;

  return (
    <>
      <Input
        name="agribusiness_name"
        placeholder="Fazenda Teixeira"
        type="text"
        label="Nome agronegócio"
        initialValue={formData?.agribusiness_name || null}
        validationSchema={registerStep4FieldsSchema.agribusiness_name}
        localStorageFormKey="register-form-data"
      />
      <Input
        name="caf"
        placeholder="12.345678910"
        type="text"
        label="CAF"
        mask={maskCAF}
        initialValue={formData?.caf || null}
        validationSchema={registerStep4FieldsSchema.caf}
        localStorageFormKey="register-form-data"
      />
    </>
  );
}
