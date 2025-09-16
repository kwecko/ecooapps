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
      title: "Receber ofertas",
      content:
        "Veja a lista de entregas de mercadorias de cada produtor. Verifique a qualidade, quantidade e validade dos produtos, um a um, para aprovar ou rejeitar uma oferta.",
    },
  },
  {
    title: "Montar sacola",
    link: "/montar-sacola",
    disabled: false,
    isSelectedCycle: true,
    hasNotification: false,
    information: {
      title: "Montar sacola",
      content:
        "Confira a lista de sacolas pendentes. Separe os produtos de cada sacola, conferindo itens e quantidades com muita atenção. Quando a sacola estiver pronta para despacho, marque-a como “pronta”.",
    },
  },
  {
    title: "Destinar sacola",
    link: "/enviar-sacola",
    disabled: false,
    isSelectedCycle: true,
    hasNotification: false,
    information: {
      title: "Destinar sacola",
      content:
        "Exibe a lista de sacolas prontas para serem destinadas. Quando uma sacola sair para a entrega, ou ser retirada presencialmente, clique, respectivamente, em “Enviar” ou “Retirar”. Esta operação irá notificar a mudança de status do pedido do cliente.",
    },
  },
  {
    title: "Gerar relatórios",
    link: "/relatorios",
    disabled: false,
    isSelectedCycle: true,
    hasNotification: false,
    information: {
      title: "Gerar relatórios",
      content:
        "Primeiro escolha o período que deseja emitir o relatório, logo após escolha uma das opções disponíveis de relatório para fazer o download (arquivo .pdf)",
    },
  },
];
