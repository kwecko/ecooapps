"use client";

import { toast } from "sonner";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { errorsMapper, genericErrorsMapper } from "../errors";
import { useSessionExpiredContext } from "../context/session/index";

export function useHandleError() {
  const { setSessionExpired } = useSessionExpiredContext();

  const router = useRouter();

  const handleError = useCallback(
    (errorCode: string) => {
      if (errorCode in errorsMapper) {
        const errorMessage = errorsMapper[errorCode];

        if (errorCode === "Sessão expirada.") {
          setSessionExpired(true);
          return;
        }

        if (
          errorCode === "💥 Ocorreu um erro interno." ||
          errorCode === "Erro desconhecido"
        ) {
          toast.error(errorMessage);
          setTimeout(() => {
            router.push("/");
          }, 2000);

          return;
        }

        if (errorCode === "Você não é administrador de um agronegócio.") {
          toast.warning(errorMessage);
          router.push("/cadastrar/4");
          return;
        }

        if (
          errorCode ===
            "Você está tentando acessar um app apenas para administradores!" ||
          errorCode ===
            "Você está tentando acessar um app apenas para administradores ou produtores!"
        ) {
          toast.error(errorMessage);
          setTimeout(() => {
            router.push("/telegram");
          }, 1000);

          return;
        }

        toast.error(errorMessage);
        return;
      }

      const words = errorCode.split(" ");

      if (genericErrorsMapper.includes(words[0])) {
        if (words[0] === "Email") {
          toast.error(`Email ${words[1]} já cadastrado`);
          return;
        }

        if (words[0] === "Telefone") {
          toast.error(`Telefone ${words[1]} ${words[2]} já cadastrado`);
          return;
        }

        if (words[0] === "CPF") {
          toast.error(`CPF ${words[1]} já cadastrado`);
          return;
        }

        if (words[0] === "Número") {
          toast.error(`Número de Talão ${words[1]} já cadastrado`);
          return;
        }

        if (words[0] === "Produto") {
          toast.error(`Produto já cadastrado`);
          return;
        }

        if (words[0] === "Catálogo" || words[0] === "Caixa") {
          return;
        }
      }

      if (genericErrorsMapper.includes(words[1])) {
        toast.error(`${words[0]} ${words[1]} já existe.`);
        return;
      }

      if (genericErrorsMapper.includes(words[2])) {
        toast.error(`Peso inválido ${words[2]} para o produto.`);
        return;
      }

      if (genericErrorsMapper.includes(words[3])) {
        toast.error(`Não é possivel ${words[3]} produtos hoje.`);
        return;
      }

      if (errorCode.includes("Large")) {
        toast.error("Imagem muito grande.");
        return;
      }

      if (errorCode.includes("<!DOCTYPE html>")) {
        console.error("Erro inesperado:", errorCode);
        toast.error("Erro inesperado");
        return;
      }

      toast.error(errorCode);
    },
    [setSessionExpired]
  );

  return { handleError };
}
