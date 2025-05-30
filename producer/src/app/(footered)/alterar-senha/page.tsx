"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Loader from "@shared/components/Loader";
import ButtonV2 from "@shared/components/ButtonV2";
import { ModelPage } from "@shared/components/ModelPage";
import { updateUser } from "@shared/_actions/users/PATCH/update-user";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Token inválido ou ausente.");
      return;
    }

    if (password.length < 8) {
      toast.error("A senha deve conter pelo menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    try {
      document.cookie = `token-reset-password=${token}; path=/;`;

      const formData = new FormData();
      formData.append("password", password);

      const response = await updateUser(formData);

      if (response?.message) {
        throw new Error(response.message);
      }

      toast.success("Senha alterada com sucesso.");
      router.push("/");
    } catch (err: any) {
      toast.error(err?.message || "Erro ao alterar a senha. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModelPage
      title="Alterar senha"
      subtitle="Digite sua nova senha abaixo e confirme para atualizar seu acesso."
      overflowAuto={true}
      titleClassName="pt-29 px-9.5"
      subtitleClassName="leading-5.5"
      titleGap="gap-2.75"
    >
      <div className="w-full flex flex-col justify-start items-center gap-9">
        <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label
              className="text-theme-home-bg lg:text-theme-primary font-normal font-inter text-sm leading-4.75 tracking-tight-2"
              htmlFor="senha"
            >
              Nova senha
            </label>
            <input
              id="senha"
              className="w-full rounded-lg border px-3 h-12 text-slate-gray focus:outline-none border-theme-home-bg text-theme-home-bg p-3 font-inter font-normal tracking-tight-2 lg:border-theme-primary lg:text-theme-primary lg:text-base"
              placeholder="Digite a nova senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="text-theme-home-bg lg:text-theme-primary font-normal font-inter text-sm leading-4.75 tracking-tight-2"
              htmlFor="confirmarSenha"
            >
              Confirme a nova senha
            </label>
            <input
              id="confirmarSenha"
              className="w-full rounded-lg border px-3 h-12 text-slate-gray focus:outline-none border-theme-home-bg text-theme-home-bg p-3 font-inter font-normal tracking-tight-2 lg:border-theme-primary lg:text-theme-primary lg:text-base"
              placeholder="Confirme a nova senha"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <ButtonV2
            variant="default"
            className="w-full h-12 text-lg"
            type="submit"
          >
            {loading ? <Loader loaderType="component" /> : "Alterar senha"}
          </ButtonV2>
        </form>
      </div>
    </ModelPage>
  );
}
