import "./globals.css";
import { Poppins, Inter } from "next/font/google";
import { Toaster } from "sonner";

import { setAppID } from "@shared/next/library/set-app-id";
import { getAppID } from "@shared/next/library/get-app-id";

import styles from "@shared/app/styles.module.css";
import { Metadata } from "next";

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

export const metadata: Metadata = {
  title: "Painel e-COO | CDD",
  description: "Administração para cooperados",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  setAppID("CDD");

  return (
    <html lang="en">
      <body
        className={`${getAppID()} w-screen h-screen 
        ${styles.fontInter} ${poppins.className}`}
      >
        <div className="flex flex-row justify-center w-full h-[inherit]">
          <Toaster richColors position="top-right" />
          <div className="relative max-w-md w-full h-[inherit]">{children}</div>
        </div>
      </body>
    </html>
  );
}
