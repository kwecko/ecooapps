import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";

import { addOrganizationNameToTitle } from "@shared/library/get-metadata";
import ClientValidation from "@shared/components/ClientValidation";

export const metadata: Metadata = {
  title: addOrganizationNameToTitle("Painel Admin"),
  description: "Administração para cooperados",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${process.env.APP_ID} w-screen h-screen font-poppins`}>
        <div className="flex flex-row justify-center w-full h-[inherit]">
          <Toaster richColors position="top-right" />
          <div className="relative max-w-md w-full h-[inherit]">
            <ClientValidation>{children}</ClientValidation>
          </div>
        </div>
      </body>
    </html>
  );
}