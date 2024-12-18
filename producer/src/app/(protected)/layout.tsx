"use client";

import SessionExpiredModal from "@shared/components/SessionExpiredModal";
import { CycleProvider } from "@shared/context/cycle";
import { SessionExpiredWrapper } from "@shared/context/session";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SessionExpiredWrapper>
        <SessionExpiredModal
          titleContentModal="Sessão Expirada"
          contentModal="Sua sessão expirou. Por favor, faça login novamente."
          buttonLabel="Ir para o Login"
          bgButton="#00735E"
        />
        <CycleProvider>{children}</CycleProvider>
      </SessionExpiredWrapper>
    </>
  );
}
