import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";

import { setAppID } from "@shared/next/library/set-app-id";
import { getAppID } from "@shared/next/library/get-app-id";
import { CartProvider } from "@consumer/context/cart";

export const metadata: Metadata = {
  title: "Painel e-COO",
  description: "Administração para cooperados",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  setAppID("CONSUMER");

  return (
    <html lang="pt-BR">
      <head>
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
      </head>
      <body className={`${getAppID()} w-screen h-screen font-poppins`}>
        <div className="flex flex-row justify-center w-full h-full">
          <Toaster richColors position="top-right" />
          <div className="relative max-w-md w-full h-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
