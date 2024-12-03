import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

import ClientValidation from "@shared/components/ClientValidation";
import { addOrganizationNameToTitle } from "@shared/library/get-metadata";

export const metadata: Metadata = {
  title: addOrganizationNameToTitle("Painel Produtor"),
  description: "Administração para cooperados",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${process.env.APP_ID} w-screen h-full-dvh font-poppins`}
      >
        <div className="flex flex-row justify-center h-full w-full">
          <Toaster richColors position="top-right" />
          <div className="relative max-w-md h-full w-full">
            <ClientValidation>{children}</ClientValidation>
          </div>
        </div>
      </body>
    </html>
  );
}
