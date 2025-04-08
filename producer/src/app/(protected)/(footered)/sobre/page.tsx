"use client";

import { ModelPage } from "@shared/components/ModelPage";

export default function AboutPage() {
  return (
    <ModelPage
      title="Sobre o e-COO"
      subtitle="versão 1.0.0.0"
      titleClassName="pt-17"
      titleGap="gap-2.5"
      subtitleClassName="px-9 leading-5.5"
    >
      <div className="h-full pr-14 pl-14 pt-8 flex-col justify-center">
        <div className="flex flex-col text-center text-sm font-medium">
          Este aplicativo faz parte do projeto de pesquisa “e-COO - Cooperativismo de Plataforma: Inovação e Tecnologia Social para o Fortalecimento da Agricultura Familiar da Região Geográfica Imediata de Pelotas”, financiado pelo Ministério da Ciência, Tecnologia e Inovação (MCTI) / Conselho Nacional de Desenvolvimento Científico e Tecnológico (CNPq), registrado sob o número de processo 400936/2023-2.
        </div>
        <div className="flex flex-col pt-10 text-center text-sm font-medium">
          O projeto foi aprovado na Plataforma Brasil e obteve parecer favorável do Comitê de Ética em Pesquisa com Seres Humanos da Universidade Federal do Rio Grande (FURG), sob o número de registro CAAE: 71319523.0.0000.5324.
        </div>
        <div className="flex flex-col pt-10 text-center text-sm font-medium">
          Saiba mais em: <a href="https://ecoo.org.br" className="underline" target="_blank" rel="noreferrer">https://ecoo.org.br/</a>
        </div>
      </div>
    </ModelPage>
  );
}