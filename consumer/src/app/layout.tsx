import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";

import { addOrganizationNameToTitle } from "@shared/library/get-metadata";

import { CartProvider } from "@consumer/context/cart";

export const metadata: Metadata = {
  title: addOrganizationNameToTitle("Painel Consumidor"),
  description: "Administração para cooperados",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("RootLayout carregado!");
  return (
    <html lang="pt-BR">
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
      </head>
      <body className={`${process.env.APP_ID} w-screen h-screen font-poppins`}>
        <div className="flex flex-row justify-center w-full h-full">
          <Toaster richColors position="top-right" />
          <div className="relative max-w-md w-full h-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
