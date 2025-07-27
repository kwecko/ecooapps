import { InfoIconModalProps } from "@shared/components/InfoIconModal";

export interface ContentLink {
  title: string;
  link: string;
  disabled: boolean;
  isSelectedCycle?: boolean;
  hasNotification?: boolean;
  information?: InfoIconModalProps;
}

export const contentLinksHomePage: ContentLink[] = [
  {
    title: "Receber ofertas",
    link: "/ofertas",
    disabled: false,
    isSelectedCycle: true,
    hasNotification: false,
    information: {
      title: "Receber Ofertas",
      content:
        "Verifique os itens recebidos dos produtores, aprovando ou rejeitando ofertas.",
    },
  },
  {
    title: "Montar sacola",
    link: "/montar-sacola",
    disabled: false,
    isSelectedCycle: true,
    hasNotification: false,
    information: {
      title: "Montar Sacola",
      content:
        "Veja quais sacolas foram montadas e registre as sacolas que já foram montadas.",
    },
  },
  {
    title: "Enviar sacola",
    link: "/enviar-sacola",
    disabled: false,
    isSelectedCycle: true,
    hasNotification: false,
    information: {
      title: "Enviar Sacola",
      content:
        "Veja as sacolas disponíveis para serem enviadas e registre as sacolas já enviadas.",
    },
  },
  {
    title: "Gerar relatórios",
    link: "/relatorios",
    disabled: false,
    isSelectedCycle: true,
    hasNotification: false,
    information: {
      title: "Gerar Relatórios",
      content: "Baixe relatórios relativos às atividades do CDD.",
    },
  },
];
