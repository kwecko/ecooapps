import "./globals.css";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${process.env.APP_ID} w-screen h-screen font-poppins bg-theme-background`}
      >
        <div className="flex flex-row justify-center w-full h-inherit">
          <Toaster richColors position="top-right" />
          <div className="relative w-full h-inherit flex flex-row">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
