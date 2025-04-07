"use client";

import { HiOutlineDocumentText } from "react-icons/hi";

import Button from "@shared/components/Button";
import { ModelPage } from "@shared/components/ModelPage";

export default function TermsPage() {
  return (
    <ModelPage
      title="Termos de Uso e Política de Privacidade"
      titleClassName="pt-17"
      titleGap="gap-2.5"
    >
      <div className="h-full pt-8 flex-col justify-center">
        <div className="flex pr-14 pl-14 flex-col text-center text-sm font-medium">
          Ao utilizar o aplicativo e-COO, você concorda integralmente com os nossos termos de uso e a política de privacidade abaixo:
        </div>
        <div className="flex flex-col pl-8 pr-8 pt-8 gap-6 text-center font-semibold">
          <a
            className="w-full h-12 bg-theme-default rounded-md text-white flex items-center justify-center"
            href="https://ecoo.org.br/termos-de-uso"
            target="_blank"
            rel="noreferrer"
          >
            <HiOutlineDocumentText size={24} className="inline-block mr-2"/> Termos de Uso
          </a>    

          <a
            className="w-full h-12 bg-theme-default rounded-md text-white flex items-center justify-center"
            href="https://ecoo.org.br/termos-de-uso/#politica"
            target="_blank"
            rel="noreferrer"
          >
            <HiOutlineDocumentText size={24} className="inline-block mr-2"/> Política de Privacidade
          </a>    
        </div>
      </div>
    </ModelPage>
  );
}