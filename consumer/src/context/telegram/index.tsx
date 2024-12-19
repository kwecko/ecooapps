"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Script from "next/script";

const TelegramContext = createContext<any>(null);

export const useTelegram = () => useContext(TelegramContext);

export const TelegramProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tg, setTg] = useState<any>(null);
    const [isScriptLoaded, setIsScriptLoaded] = useState(false); // Controla o carregamento do script

    useEffect(() => {
        if (isScriptLoaded && typeof window !== "undefined" && (window as any).Telegram) {
            setTg((window as any).Telegram.WebApp || null);
        }
    }, [isScriptLoaded]);

    return (
        <>
            <Script
                src="https://telegram.org/js/telegram-web-app.js"
                strategy="lazyOnload"
                onLoad={() => {
                    setIsScriptLoaded(true);
                }}
            />
            {isScriptLoaded && tg ? (
                <TelegramContext.Provider value={tg}>{children}</TelegramContext.Provider>
            ) : (
                <div>Carregando...</div>
            )}
        </>
    );
};
