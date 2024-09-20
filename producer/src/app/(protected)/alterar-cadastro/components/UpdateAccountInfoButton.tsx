"use client";

import { useEffect, useState } from "react";
import OldButton from "@shared/components/OldButton";
import { toast } from "sonner";
import { updateUser } from "@producer/app/_actions/update-user/UpdateUserInfo";
import { UpdateAccountInfoButtonProps } from "./UpdateAccountInfoButtonProps";

const UpdateAccountInfoButton = ({
  firstName,
  lastName,
  phone,
  password,
  email,
  cpf,
}: UpdateAccountInfoButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {

    await updateUser({ first_name: firstName, last_name: lastName, phone: phone, password: password, email: email, cpf: cpf })
    .then((response) => {
      if (response?.message){
        toast.error(response.message);
        return;
      } else {
        toast.success("Cadastro atualizado com sucesso!");
      }
    }).catch((error) => {
      toast.error(error)
    }).finally(() => {
      setLoading(false)
    })

  };

  return (
    <OldButton
      title="Salvar"
      className={`w-[full] px-2 py-3 font-semibold rounded-lg text-white border-0 bg-[#00735E]`}
      onClick={handleClick}
    >
      {loading ? "Carregando..." : "Salvar"}
    </OldButton>
  );
};

export default UpdateAccountInfoButton;
