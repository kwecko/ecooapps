"use client"

import "./globals.css";
import { Poppins, Inter } from "next/font/google";
import { Toaster } from "sonner";

import { setAppID } from "@shared/next/library/set-app-id";
import { getAppID } from "@shared/next/library/get-app-id";

import styles from "@shared/app/styles.module.css";
import { SessionExpiredWrapper } from "@cdd/context";
import SessionExpiredModal from "@cdd/components/SessionExpiredModal";
import Head from "next/head";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  setAppID("CDD");

  return (
    <html lang="en">
      <Head>
        <title>Painel e-COO</title>
        <meta name="description" content="Administração para cooperados" />
      </Head>
      <body className={`${getAppID()} w-screen h-screen 
      ${styles.fontInter}
      ${poppins.className}`}>
        <SessionExpiredWrapper>
          <SessionExpiredModal
            titleContentModal="Sessão Expirada"
            contentModal="Sua sessão expirou. Por favor, faça login novamente."
            buttonLabel="Ir para o Login"
            bgButton="#00735E"
          />
          <div className="flex flex-row justify-center w-full h-full relative">
            <Toaster richColors position="top-right" />
            <div className={`relative max-w-md w-full h-full`}>{children}</div>
          </div>
        </SessionExpiredWrapper>
      </body>
    </html>
  );
}
