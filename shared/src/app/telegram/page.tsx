"use client"

import { FaTelegram } from "react-icons/fa";

import { osUrls } from "./data";

import detectOs from "@shared/utils/detect-os";
import ButtonV2 from "@shared/components/ButtonV2";
import { ModelPage } from "@shared/components/ModelPage";
import { useLocalStorage } from "@shared/hooks/useLocalStorage"

export default function Telegram() {
  const userOS = detectOs.getOSName();

  const { deleteFromStorage } = useLocalStorage()

  const handleButtonClick = () => {
    deleteFromStorage('register-form-data')
    deleteFromStorage('register-current-step')
  }

  const telegramDownloadUrl = osUrls[userOS] || "https://web.telegram.org/";
  const telegramOpenUrl = `${process.env.NEXT_PUBLIC_CHAT_URL}`;

  return (
    <ModelPage
      title={
        <>
          <FaTelegram className="w-32 h-32 text-ocean-blue" />
        </>
      }
      titleGap="gap-2"
      subtitle="No momento, os pedidos online podem ser realizados apenas pelo nosso canal do Telegram."
    >
      <div className="w-full flex flex-col gap-3">
        <a href={telegramDownloadUrl} target="_blank">
          <ButtonV2
            type="button"
            variant="transparent"
            border={true}
            className="h-12 flex justify-center items-center"
            onClick={handleButtonClick}
          >
            Baixar o Telegram
          </ButtonV2>
        </a>

        <a href={telegramOpenUrl} target="_blank">
          <ButtonV2
            type="button"
            variant="default"
            className="h-12 flex justify-center items-center mt-0"
            onClick={handleButtonClick}
          >
            Abrir o Telegram
          </ButtonV2>
        </a>
      </div>
    </ModelPage>
  );
}
