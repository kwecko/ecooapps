import "./globals.css";
import { Toaster } from "sonner";

import { addOrganizationNameToTitle } from "@shared/library/get-metadata";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: addOrganizationNameToTitle("Painel CDD"),
  description: "Administração para cooperados",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${process.env.APP_ID} w-screen font-poppins`}
      >
        <div className="flex flex-row justify-center w-full">
          <Toaster richColors position="top-right" />
          <div className="relative max-w-md w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
