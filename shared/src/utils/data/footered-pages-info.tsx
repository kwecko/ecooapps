import React from "react";

interface HelpInfo {
  title?: string;
  content?: string | JSX.Element;
  closeButtonText?: string;
  redirectPath?: string;
}

interface FooteredPageInfo {
  hasPreviousPage: boolean;
  returnPath?: string | null;
  hasHelpButton: boolean;
  helpInfo?: HelpInfo | null;
}

const producerFooteredPagesInfo: Record<string, FooteredPageInfo> = {
  "/": {
    hasPreviousPage: false,
    returnPath: null,
    hasHelpButton: true,
    helpInfo: {
      title: "Precisa de Suporte?",
      content: (
        <p>
          Se você está com dificuldades ao utilizar o nosso sistema, você pode
          obter ajuda via Telegram clicando no botão abaixo ou através de um dos
          nossos canais oficiais:
          <br />
          <br />
          telefone: (53) XXXX-XXXX
          <br />
          email: suporte@ecoo.org.br
        </p>
      ),
      closeButtonText: "Entrar em contato",
      redirectPath: "",
    },
  },
  "/login": {
    hasPreviousPage: true,
    returnPath: "/inicio",
    hasHelpButton: false,
    helpInfo: null,
  },
  "/oferta": {
    hasPreviousPage: true,
    returnPath: "/",
    hasHelpButton: true,
    helpInfo: {
      title: "Como fazer uma oferta?",
      content: (
        <p>
          Para fazer uma oferta, você deve clicar no botão "adicionar produto" e
          seguir os passos indicados.
        </p>
      ),
      closeButtonText: "Ok, entendi",
      redirectPath: "",
    },
  },
  "/oferta/sucesso": {
    hasPreviousPage: false,
    returnPath: null,
    hasHelpButton: true,
    helpInfo: {
      title: "Oferta realizada com sucesso!",
      content: (
        <p>
          Sua oferta foi realizada com sucesso! Você pode visualizá-la na página
          de ofertas.
        </p>
      ),
      closeButtonText: "Ok, entendi",
      redirectPath: "/oferta",
    },
  },
  "/em-construcao": {
    hasPreviousPage: true,
    returnPath: "/",
    hasHelpButton: false,
    helpInfo: null,
  },
  "/informacoes-ciclo": {
    hasPreviousPage: true,
    returnPath: "/",
    hasHelpButton: true,
    helpInfo: {
      title: "Como funciona o ciclo?",
      content: (
        <p>
          Semanalmente, o ciclo é aberto para que você possa fazer suas ofertas.
          Durante a semana, os dias são reservados para etapas específicas do
          ciclo. Para saber mais, clique no botão abaixo.
        </p>
      ),
      closeButtonText: "Saiba mais",
      redirectPath: "",
    },
  },
  "/recuperar-senha": {
    hasPreviousPage: true,
    returnPath: "/",
    hasHelpButton: true,
    helpInfo: {
      title: "Esqueceu a senha?",
      content: (
        <p>
          A tela de "Esqueceu a senha?" é um recurso essencial para recuperar o
          acesso à sua conta quando você não lembra sua senha atual. Ao acessar
          essa tela, você insere o e-mail cadastrado, e um link de recuperação é
          enviado para ele. Esse link direciona você para uma página onde pode
          definir uma nova senha. É uma maneira simples e segura de garantir que
          você recupere o controle da sua conta sem complicações.
        </p>
      ),
      closeButtonText: "Entendi",
      redirectPath: "",
    },
  },
  "/sucesso": {
    hasPreviousPage: true,
    returnPath: "/",
    hasHelpButton: false,
    helpInfo: {
      title: "",
      content: <></>,
      closeButtonText: "",
      redirectPath: "",
    },
  },
  "/telegram": {
    hasPreviousPage: true,
    returnPath: "/login",
    hasHelpButton: true,
    helpInfo: {
      title: "Como usar o Telegram?",
      content: (
        <p>
          Para usar o Telegram, você deve baixar o aplicativo em seu celular e
          clicar no botão para acessar o nosso canal.
        </p>
      ),
      closeButtonText: "Ok, entendi",
      redirectPath: "",
    },
  },
  "/relatorios": {
    hasPreviousPage: true,
    returnPath: "/",
    hasHelpButton: true,
    helpInfo: {
      title: "Como visualizar um relatório?",
      content: (
        <p>
          Para visualizar um relatório, você deve clicar no botão "visualizar" e
          seguir os passos indicados.
        </p>
      ),
      closeButtonText: "Ok, entendi",
      redirectPath: "",
    },
  },
  "/negocio/[generic]": {
    hasPreviousPage: false,
    returnPath: null,
    hasHelpButton: true,
    helpInfo: {
      title: "Precisa de Suporte?",
      content: (
        <p>
          Se você está com dificuldades ao utilizar o nosso sistema, você pode
          obter ajuda via Telegram clicando no botão abaixo ou através de um dos
          nossos canais oficiais:
          <br />
          <br />
          telefone: (53) XXXX-XXXX
          <br />
          email: suporte@ecoo.org.br
        </p>
      ),
      closeButtonText: "Entrar em contato",
      redirectPath: "",
    },
  },
  "/configuracoes": {
    hasPreviousPage: true,
    returnPath: "/",
    hasHelpButton: true,
    helpInfo: {
      title: "Configurações",
      content: (
        <p>
          Aqui você pode acessar as configurações da sua conta e do seu negócio.
        </p>
      ),
      closeButtonText: "Ok, entendi",
    },
  },
  "/perfil/pessoal": {
    hasPreviousPage: true,
    returnPath: "/configuracoes",
    hasHelpButton: true,
    helpInfo: {
      title: "Perfil Pessoal",
      content: (
        <p>
          Aqui você pode acessar e editar as informações do seu perfil pessoal.
        </p>
      ),
      closeButtonText: "Ok, entendi",
    },
  },
  "/perfil/comercial": {
    hasPreviousPage: true,
    returnPath: "/configuracoes",
    hasHelpButton: true,
    helpInfo: {
      title: "Perfil Pessoal",
      content: (
        <p>
          Aqui você pode acessar e editar as informações do seu perfil comercial.
        </p>
      ),
      closeButtonText: "Ok, entendi",
    },
  },
  "/sobre": {
    hasPreviousPage: true,
    returnPath: "/configuracoes",
    hasHelpButton: true,
    helpInfo: {
      title: "Ajuda para a página Sobre",
      content: "Aqui você pode encontrar informações sobre o projeto e-COO.",
      closeButtonText: "Fechar",
    },
  },
  "/termos": {
    hasPreviousPage: true,
    returnPath: "/configuracoes",
    hasHelpButton: true,
    helpInfo: {
      title: "Ajuda para a página Termos",
      content: "Aqui você pode encontrar informações sobre os termos de uso.",
      closeButtonText: "Fechar",
    },
  }
};

const cddFooteredPagesInfo: Record<string, FooteredPageInfo> = {
  "/": {
    hasPreviousPage: false,
    returnPath: null,
    hasHelpButton: true,
    helpInfo: {
      title: "Precisa de Suporte?",
      content: (
        <p>
          Se você está com dificuldades ao utilizar o nosso sistema, você pode
          obter ajuda via Telegram clicando no botão abaixo ou através de um dos
          nossos canais oficiais:
          <br />
          <br />
          telefone: (53) XXXX-XXXX
          <br />
          email: suporte@ecoo.org.br
        </p>
      ),
      closeButtonText: "Entrar em contato",
      redirectPath: "",
    },
  },
  "/enviar-sacola": {
    hasPreviousPage: true,
    returnPath: "/",
    hasHelpButton: true,
    helpInfo: {
      title: "Como enviar uma sacola?",
      content: (
        <p>
          Para enviar uma sacola, você deve clicar no botão "enviar" e seguir os
          passos indicados.
        </p>
      ),
      closeButtonText: "Ok, entendi",
      redirectPath: "",
    },
  },
  "/enviar-sacola/[id]": {
    hasPreviousPage: true,
    returnPath: "/enviar-sacola",
    hasHelpButton: true,
    helpInfo: {
      title: "Como enviar uma sacola?",
      content: (
        <p>
          Para enviar uma sacola, você deve clicar no botão "enviar" e seguir os
          passos indicados.
        </p>
      ),
      closeButtonText: "Ok, entendi",
      redirectPath: "",
    },
  },
  "/login": {
    hasPreviousPage: true,
    returnPath: "/inicio",
    hasHelpButton: false,
    helpInfo: null,
  },
  "/montar-sacola": {
    hasPreviousPage: true,
    returnPath: "/",
    hasHelpButton: true,
    helpInfo: {
      title: "Como montar uma sacola?",
      content: (
        <p>
          Para montar uma sacola, você deve clicar no botão "montar" e seguir os
          passos indicados.
        </p>
      ),
      closeButtonText: "Ok, entendi",
      redirectPath: "",
    },
  },
  "/montar-sacola/[id]": {
    hasPreviousPage: true,
    returnPath: "/montar-sacola",
    hasHelpButton: true,
    helpInfo: {
      title: "Como montar uma sacola?",
      content: (
        <p>
          Para montar uma sacola, você deve clicar no botão "montar" e seguir os
          passos indicados.
        </p>
      ),
      closeButtonText: "Ok, entendi",
      redirectPath: "",
    },
  },
  "/ofertas": {
    hasPreviousPage: true,
    returnPath: "/",
    hasHelpButton: false,
    helpInfo: null,
  },
  "/ofertas/[id]": {
    hasPreviousPage: true,
    returnPath: "/ofertas",
    hasHelpButton: true,
    helpInfo: {
      title: "Como visualizar uma oferta?",
      content: (
        <p>
          Para visualizar uma oferta, você deve clicar no botão "visualizar" e
          seguir os passos indicados.
        </p>
      ),
      closeButtonText: "Ok, entendi",
      redirectPath: "",
    },
  },
  "/relatorios": {
    hasPreviousPage: true,
    returnPath: "/",
    hasHelpButton: true,
    helpInfo: {
      title: "Como visualizar um relatório?",
      content: (
        <p>
          Para visualizar um relatório, você deve clicar no botão "visualizar" e
          seguir os passos indicados.
        </p>
      ),
      closeButtonText: "Ok, entendi",
      redirectPath: "",
    },
  },
  "/em-construcao": {
    hasPreviousPage: true,
    returnPath: "/",
    hasHelpButton: false,
    helpInfo: null,
  },
  "/informacoes-ciclo": {
    hasPreviousPage: true,
    returnPath: "/",
    hasHelpButton: true,
    helpInfo: {
      title: "Como funciona o ciclo?",
      content: (
        <p>
          Semanalmente, o ciclo é aberto para que você possa fazer suas ofertas.
          Durante a semana, os dias são reservados para etapas específicas do
          ciclo. Para saber mais, clique no botão abaixo.
        </p>
      ),
      closeButtonText: "Saiba mais",
      redirectPath: "",
    },
  },
  "/telegram": {
    hasPreviousPage: true,
    returnPath: "/login",
    hasHelpButton: true,
    helpInfo: {
      title: "Como usar o Telegram?",
      content: (
        <p>
          Para usar o Telegram, você deve baixar o aplicativo em seu celular e
          clicar no botão para acessar o nosso canal.
        </p>
      ),
      closeButtonText: "Ok, entendi",
      redirectPath: "",
    },
  },
};

const consumerFooteredPagesInfo: Record<string, FooteredPageInfo> = {
  "/": {
    hasPreviousPage: false,
    returnPath: null,
    hasHelpButton: true,
    helpInfo: {
      title: "Precisa de Suporte?",
      content: (
        <p>
          Se você está com dificuldades ao utilizar o nosso sistema, você pode
          obter ajuda via Telegram clicando no botão abaixo ou através de um dos
          nossos canais oficiais:
          <br />
          <br />
          telefone: (53) XXXX-XXXX
          <br />
          email: suporte
        </p>
      ),
      closeButtonText: "Entrar em contato",
      redirectPath: "",
    },
  },
  "/telegram": {
    hasPreviousPage: true,
    returnPath: "/",
    hasHelpButton: true,
    helpInfo: {
      title: "Como usar o Telegram?",
      content: (
        <p>
          Para usar o Telegram, você deve baixar o aplicativo em seu celular e
          clicar no botão para acessar o nosso canal.
        </p>
      ),
      closeButtonText: "Ok, entendi",
      redirectPath: "",
    },
  },
};

export function getFooteredPageInfo(appID: string) {
  const apps: Record<string, Record<string, FooteredPageInfo>> = {
    PRODUCER: producerFooteredPagesInfo,
    CDD: cddFooteredPagesInfo,
    CONSUMER: consumerFooteredPagesInfo,
  };

  return apps[appID];
}
