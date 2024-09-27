import Footer from "@shared/components/Footer";

const HAS_PREVIOUS_PAGE = {
  "/": false,
  "/extrato-entregas": true,
  "/enviar-sacola": true,
  "/enviar-sacola/[id]": true,
  "/enviar-sacola/[id]/alterar": false,
  "/enviar-sacola/[id]/sacolaenviada": false,
  "/login": true,
  "/montar-sacola": true,
  "/montar-sacola/[id]": true,
  "/montar-sacola/[id]/alterar": false,
  "/montar-sacola/[id]/aprovar": false,
  "/ofertas": true,
  "/ofertas/[id]": true,
  "/ofertas/[id]/aprovar": false,
  "/ofertas/[id]/justificativa": true,
  "/ofertas/[id]/rejeitar": false,
  "/em-construcao": true,
};

const HAS_HELP_BUTTON = {
  "/": true,
  "/relatorios": true,
  "/enviar-sacola": true,
  "/enviar-sacola/[id]": true,
  "/enviar-sacola/[id]/alterar": true,
  "/enviar-sacola/[id]/sacolaenviada": true,
  "/login": false,
  "/montar-sacola": true,
  "/montar-sacola/[id]": true,
  "/montar-sacola/[id]/alterar": true,
  "/montar-sacola/[id]/aprovar": true,
  "/ofertas": false,
  "/ofertas/[id]": true,
  "/ofertas/[id]/aprovar": true,
  "/ofertas/[id]/justificativa": true,
  "/ofertas/[id]/rejeitar": true,
  "/em-construcao": false,
};

const RETURN_URLS = {
  "/relatorios": "/",
  "/enviar-sacola": "/",
  "/enviar-sacola/[id]": "/enviar-sacola",
  "/login": "/",
  "/montar-sacola": "/",
  "/montar-sacola/[id]": "/montar-sacola",
  "/ofertas": "/",
  "/ofertas/[id]": "/ofertas",
  "/em-construcao": "/",
};

export default function LayoutWithFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between w-full bg-theme-background h-[100vh]">
      <div className="h-[var(--min-page-height)] overflow-y-auto">
        {children}
      </div>
      <div className="h-[var(--footer-height)]">
        <Footer
          hasPreviousPagePaths={HAS_PREVIOUS_PAGE}
          hasHelpButtonPaths={HAS_HELP_BUTTON}
          bgColor={"#4F4743"}
          returnUrls={RETURN_URLS}
        />
      </div>
    </div>
  );
}
