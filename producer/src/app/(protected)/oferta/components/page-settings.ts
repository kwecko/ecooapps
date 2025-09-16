import { PageSettings } from "@shared/types/page-settings";

const pageSettings: { [key: string]: PageSettings } = {
  productSelection: {
    title: "Escolha um produto",
    subtitle:
      "Este produto será disponibilizado para a venda através da plataforma",
  },
  unitAmount: {
    title: "Qual a quantidade?",
    subtitle:
      "Qual a quantidade do produto que gostaria de colocar à venda no nosso centro de distribuição?",
  },
  weightAmount: {
    title: "Qual o peso?",
    subtitle:
      "Qual o peso do produto que gostaria de colocar à venda no nosso centro de distribuição?",
  },
  expirationDate: {
    title: "Qual validade do produto?",
    subtitle:
      "Qual a expectativa de validade em que produto mantém boas condições de comercialização?",
  },
  price: {
    title: "Qual o preço do produto?",
    subtitle:
      "Escolha o preço do seu produto. A taxa do e-COO será adicionada automaticamente.",
  },
  description: {
    title: "Descrição do produto",
    subtitle:
      "Insira informações adicionais ao seu produto ou deixe em branco.",
  },
  comment: {
    title: "Comentário do produto",
    subtitle:
      "Insira informações adicionais que serão vistas apenas pelo time do e-COO.",
  },
  recurrence: {
    title: "Oferta recorrente?",
    subtitle:
    "Ative caso queira repetir a sua oferta automaticcamente nos próximos ciclos."
  },
  review: {
    title: "Revise as informações",
    subtitle:
      "Revise todas as informações antes de colocar o seu produto à venda",
  },
  empty: {
    title: "",
    subtitle: "",
  },
};

export default pageSettings;
