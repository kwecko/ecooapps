import OldButton from "@shared/components/OldButton";
import Image from "next/image";
import Link from "next/link";
import React from 'react';
import { isAndroid, isIOS } from 'react-device-detect';

export default async function telegram() {
    

    const createLinkTelegram = () => {

        if(isAndroid)
            return "https://play.google.com/store/apps/details?id=org.telegram.messenger&pcampaignid=web_share"
        else if(isIOS)
            return "https://apps.apple.com/br/app/telegram-messenger/id686449807"
        else
            return "https://telegram.org/"
    }

    return (
        <div className="h-full w-full flex pl-3 pr-3 pt-3 flex-col">
                <div className="w-full mt-20 mb-10 flex justify-center">
                    <Image
                        src="/logo-telegram.png"
                        width={180}
                        height={60}
                        alt="logo telegram"
                        className=""/>
                </div>
                
                <div className="w-full flex justify-center">
                    <span className="w-64 text-center place-self-center text-theme-home-bg">No momento, os pedidos online podem ser realizados apenas pelo nosso canal do Telegram</span>
                </div>
                
                <div className="w-auto">
                    <Link href={createLinkTelegram()}>
                        <OldButton
                        title="Baixar o Telegram"
                        className="bg-white rounded-md font-inter font-semibold text-theme-primary h-auto border-theme-primary border-2 mb-3 mt-3"
                        
                        ></OldButton>
                    </Link>
                </div>

                <div className="w-auto">
                    <Link href={`${process.env["BOT_URL"]}?start=token`}>
                        <OldButton
                        title="Abrir o Telegram"
                        className="bg-theme-highlight rounded-md font-inter font-semibold text-white h-auto"
                        ></OldButton>
                    </Link>
                </div>

        </div>
    );
  }
  