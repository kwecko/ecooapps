import { SuccessPageModel } from "@shared/components/SuccessPageModel";

export default function Page() {
  return (
    <SuccessPageModel
      title="O seu produto está em oferta!"
      description="Fique atento as notificações do nosso aplicativo para não perder os prazos de envio até o nosso centro de distribuição."
      primaryButtonText="Fazer outra oferta"
      primaryButtonHref="/oferta"
      secondaryButtonText="Voltar para a tela inicial"
      secondaryButtonHref="/"
    />
  );
}
