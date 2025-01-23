"use client";

import InfoModal from "@shared/components/InfoModal";
import { getFooteredPageInfo } from "@shared/utils/data/footered-pages-info";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { LuChevronLeft } from "react-icons/lu";

import { requestHelp } from "@shared/_actions/help/POST/request-help";
import Button from "./Button";
import { toast } from "sonner";

const PagesWithGenericParams = ["aguardando-aprovacao", "perfil-rejeitado"];

export default function Footer({ appID }: { appID: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const convertPathname = (path: string) => {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

    const params = path.split("/");

    const convertedParams = params.map((param) => {
      if (uuidRegex.test(param)) return "[id]";
      if (PagesWithGenericParams.includes(param)) return "[generic]";
      return param;
    });

    return convertedParams.join("/");
  };

  const convertedPathname = convertPathname(pathname);

  const footerPageInfo = getFooteredPageInfo(appID)[convertedPathname];

  if (!footerPageInfo) {
    throw new Error("Error when fetching footer information");
  }

  const { hasPreviousPage, returnPath, hasHelpButton, helpInfo } =
    footerPageInfo;

  if (!hasPreviousPage && !hasHelpButton) {
    throw new Error("Footer component must have at least one button");
  }

  if (hasPreviousPage && !returnPath) {
    throw new Error(
      "Footer component must have a return path if hasPreviousPage is true"
    );
  }

  if (hasHelpButton && !helpInfo) {
    throw new Error(
      "Footer component must have help info if hasHelpButton is true"
    );
  }

  const handleReturn = () => {
    if (returnPath) {
      router.push(returnPath);
    } else {
      router.back();
    }
  };

  const ReturnButton = () => (
    <Link
      href={returnPath ? returnPath : "#"}
      className="flex items-center -translate-y-1 gap-1.25"
    >
      <LuChevronLeft className="w-7.5 h-7.5 text-theme-default" />
      <Button
        className={
          "flex items-center gap-2 text-sm font-medium text-theme-default w-auto"
        }
        onClick={handleReturn}
      >
        Voltar
      </Button>
    </Link>
  );

  const HelpButton = () => {

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [text, setText] = React.useState("");

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };

    const handleSendHelpMessage = () => {
      requestHelp({ message: text })
      toast.success("Mensagem enviada com sucesso!");
      setIsModalOpen(false);
    }

    if (appID === "PRODUCER") {
      return (
        <InfoModal
          titleContentModal={"Obter ajuda"}
          contentModal={
            <>
              {"Escreva na área abaixo uma mensagem para a nossa equipe:"}
              <textarea
                className="p-4 w-full h-48 mt-4 border border-theme-primary text-slate-gray rounded-lg font-inter font-light box-border resize-none"
                placeholder="Digite aqui a sua dúvida ou problema com o nosso sistema"
                onChange={(e) => setText(e.target.value)}
                value={text}
              />
            </> 
          }
          icon="?"
          window_size="max-w-sm"
          text_align="text-center"
          text_size="text-lg font-inter font-light text-slate-gray"
          titleCloseModal={"Enviar mensagem"}
          buttonRequest={
            <button
              type="button"
              className="w-full text-white justify-center rounded-md border border-transparent bg-rain-forest px-3 py-4 font-semibold h-12 flex items-center font-inter text-base leading-5.5 tracking-tight-2"
              onClick={handleSendHelpMessage}
            >
              {"Enviar mensagem"}
            </button>
          }
          buttonOpenModal={
            <button
              className="z-10 flex items-center gap-2 bg-theme-default w-12.5 h-12.5 rounded-full justify-center text-white text-3xl leading-5.5 font-normal self-center -translate-y-3.5"
              onClick={handleOpenModal}
            >
              ?
            </button>
          }
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
        />
      );
    }
    return (
      <InfoModal
        titleContentModal={helpInfo?.title || ""}
        contentModal={helpInfo?.content || ""}
        icon="?"
        titleCloseModal={helpInfo?.closeButtonText || ""}
        buttonOpenModal={
          <button
            className="z-10 flex items-center gap-2 bg-theme-default w-12.5 h-12.5 rounded-full justify-center text-white text-3xl leading-5.5 font-normal self-center -translate-y-3.5"
            onClick={handleOpenModal}
          >
            ?
          </button>
        }
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
    );
  };

  function justify() {
    if (hasPreviousPage && hasHelpButton) {
      return "justify-between";
    } else if (hasPreviousPage) {
      return "justify-start";
    } else if (hasHelpButton) {
      return "justify-end";
    }
  }

  return (
    <>
      {hasPreviousPage || hasHelpButton ? (
        <div
          className={`flex w-full items-center ${justify()} w-full p-5 pr-4.5 pl-3.5
          h-footer bg-theme-background z-10
          `}
        >
          {hasPreviousPage && <ReturnButton />}
          {hasHelpButton && <HelpButton />}
        </div>
      ) : null}
    </>
  );
}
