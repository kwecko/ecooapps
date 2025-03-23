"use client";

import { ModelPage } from "@shared/components/ModelPage";

import { ChangePersonalRegistrationForm } from "./components";

export default function ProfilePage() {
  return (
    <ModelPage
      title="Seu perfil"
      titleClassName="pt-17"
      titleGap="gap-2.5"
      subtitle="Após atualizar os seus dados, clique em salvar."
      subtitleClassName="px-9 leading-5.5"
    >
      <ChangePersonalRegistrationForm />
    </ModelPage>
  );
}
