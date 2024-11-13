"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import { IoCloseCircle } from "react-icons/io5";
import { BiSolidHourglass } from "react-icons/bi";

import ButtonV2 from "@shared/components/ButtonV2";
import { ModelPage } from "@shared/components/ModelPage";

const STATUS_CONFIG = {
  "perfil-rejeitado": {
    icon: <IoCloseCircle className="w-32 h-32 text-error" />,
    title: "Solicitação rejeitada",
    subtitle: "O seu perfil não atende os requisitos para ser um produtor.",
  },
  "aguardando-aprovacao": {
    icon: (
      <BiSolidHourglass className="w-28 h-28 p-4 bg-theme-default text-white rounded-full" />
    ),
    title: "Aguardando aprovação",
    subtitle: (
      <div className="w-72 flex flex-col gap-6">
        <span>O seu perfil será aprovado por um administrador em até 5 dias úteis.</span>
        <span>Caso seu perfil não seja aprovado dentro desse prazo, clique no botão de Ajuda (?) para obter suporte da nossa equipe.</span>
      </div>
    ),
  },
};

export default function Home() {
  const router = useRouter();
  const { farm_status } = useParams();

  useEffect(() => {
    if (!STATUS_CONFIG[farm_status as keyof typeof STATUS_CONFIG]) {
      router.push("/");
    }
  }, [farm_status, router]);

  const statusContent = STATUS_CONFIG[farm_status as keyof typeof STATUS_CONFIG];
  
  if (!statusContent) return null;

  return (
    <ModelPage
      title={
        <div className="w-full flex flex-col items-center gap-6">
          {statusContent.icon}
          <span className="text-theme-default text-3xl font-medium">{statusContent.title}</span>
        </div>
      }
      titleClassName="pt-28"
      subtitle={statusContent.subtitle}
      overflowAuto={true}
    >
      <div className="w-full h-full flex items-end">
        <Link href="/api/auth/logout" className="w-full">
          <ButtonV2 variant="default">Ok, entendi</ButtonV2>
        </Link>
      </div>
    </ModelPage>
  );
}
