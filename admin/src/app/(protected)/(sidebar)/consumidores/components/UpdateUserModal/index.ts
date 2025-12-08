"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useTransition, useEffect, useState, useRef } from "react";

import { zodResolver } from "@hookform/resolvers/zod";

import { useHandleError } from "@shared/hooks/useHandleError";
import { updateUser } from "@admin/_actions/users/PATCH/update-user";
import { UserDTO } from "@shared/interfaces/dtos";
import {
  updateUserSchema,
  UpdateUserSchema,
} from "@admin/schemas/users";

interface UseUpdateUserModalProps {
  closeModal: () => void;
  reloadUsers: () => void;
  user: UserDTO | null;
}

export default function useUpdateUserModal({
  closeModal,
  reloadUsers,
  user,
}: UseUpdateUserModalProps) {
  const [isPending, startTransition] = useTransition();

  const { handleError } = useHandleError();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    mode: "onChange",
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      cpf: "",
      phone: "",
      active: true,
    },
  });

  const originalUserData = useRef<UpdateUserSchema | null>(null);

  useEffect(() => {
    if (user) {
      setValue("first_name", user.first_name ?? "");
      setValue("last_name", user.last_name ?? "");
      setValue("email", user.email ?? "");
      setValue("cpf", user.cpf?.replace(/[.\-]/g, "") ?? "");
      setValue("phone", user.phone?.replace(/[()\s\-]/g, "") ?? "");
      setValue("active", user.active ?? true);
    }
  }, [user, setValue]);

  useEffect(() => {
    if (user) {
      originalUserData.current = {
        first_name: user.first_name ?? "",
        last_name: user.last_name ?? "",
        email: user.email ?? "",
        cpf: user.cpf?.replace(/[.\-]/g, "") ?? "",
        phone: user.phone?.replace(/[()\s\-]/g, "") ?? "",
        active: user.active ?? true,
      };
    }
  }, [user]);

  const onSubmit = ({
    first_name,
    last_name,
    email,
    cpf,
    phone,
    active
  }: UpdateUserSchema) => {
    startTransition(async () => {

      const dataForm = new FormData();

      if (user?.id) {
        if (originalUserData.current) {
          if (first_name !== originalUserData.current.first_name) {
            dataForm.append("first_name", first_name);
          }
          if (last_name !== originalUserData.current.last_name) {
            dataForm.append("last_name", last_name);
          }
          if (email !== originalUserData.current.email) {
            dataForm.append("email", email);
          }
          if (cpf !== originalUserData.current.cpf) {
            dataForm.append("cpf", cpf);
          }
          if (phone !== originalUserData.current.phone) {
            dataForm.append("phone", phone);
          }
          if (active !== originalUserData.current.active) {
            dataForm.append("active", String(active));
          }
        }

        if (dataForm.get("first_name") === null &&
            dataForm.get("last_name") === null &&
            dataForm.get("email") === null &&
            dataForm.get("cpf") === null &&
            dataForm.get("phone") === null &&
            dataForm.get("active") === null
          ) {
          closeModal();
          return;
        }

        updateUser({ user_id: user.id, data: dataForm })
          .then((response) => {
            if (response.message) {
              return handleError(response.message);
            }
            toast.success("Usuário atualizado com sucesso!");
            closeModal();
            reset();
            reloadUsers();
          })
          .catch((error) => {
            console.error("Update error:", error);
            toast.error("Erro desconhecido.");
          });
      } else {
        toast.error("ID do usuário não encontrado.");
      }
    });
  };

  return {
    register,
    setValue,
    handleSubmit,
    errors,
    isPending,
    onSubmit,
  };
}
