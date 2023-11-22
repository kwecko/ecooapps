import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Painel e-COO",
  description: "Administração para cooperados",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={"flex w-full h-full min-h-screen " + poppins.className}>
        <main className="flex flex-col gap-10 w-full px-8 md:px-10 lg:px-16 pb-10 pt-10 md:pt-16 lg:pt-20 bg-background">
          {children}
        </main>
      </body>
    </html>
  );
}
