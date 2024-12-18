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
    <html lang="pt-BR" className="overflow-hidden">
      <body
        className={`${process.env.APP_ID} w-screen h-full-dvh font-poppins flex flex-row justify-center overflow-y-auto`}
      >
        <Toaster richColors position="top-center" duration={2500} invert />
        <div className="relative max-w-md h-inherit w-full">
          <ClientValidation>{children}</ClientValidation>
        </div>
      </body>
    </html>
  );
}
