export const USE_CASE_EXCEPTIONS = {
  "create-user-1": "Usuário com essas informações já registrado.",
  "login-1": "Conta não verificada, verifique seu e-mail por favor.",
  "login-2": "Credenciais inválidas.",
  "login-agribusiness-1": "Credenciais inválidas, registre-se como produtor.",
  "login-cdd-1":
    "As credenciais de acesso não são válidas.",
  "register-agribusiness-1": "Produtor com essas informações já registrado.",
  "register-agribusiness-2": "Não foi possível autenticar essa conta.",
  "general-1": "Formato inválido de requisição.",
  "general-2": "Não autorizado.",
  "general-3": "Usuário com essas informações já registrado.",
  "general-4":
    "Ocorreu um erro interno. Tente novamente e se o erro persistir entre em contato com o nosso suporte.",
  "general-5": "Sessão expirada. Realize login novamente",
};

export const UI_WARNINGS = {
  shared: {
    general: {
      generic: {
        type: "Erro Crítico",
        "when-or-where": "Erro não esperado em provedor",
        message:
          "Ocorreu um erro interno. Tente novamente e se o erro persistir entre em contato com o nosso suporte.",
      },
      "no-internet-critical": {
        type: "Erro Crítico",
        "when-or-where": "Falha de conexão",
        message:
          "Não conseguimos acessar a internet, verifique a sua conexão ou tente novamente mais tarde.",
      },
      "connection-timeout-critical": {
        type: "Erro Crítico",
        "when-or-where": "Falha ao enviar dados",
        message:
          "As suas informações não foram enviadas, tente novamente e se o erro persistir entre em contato com o nosso suporte.",
      },
      "general-help-info": {
        type: "Informação",
        "when-or-where": 'Botão flutuante "Ajuda"',
        message:
          "Precisa de suporte? Se você está com dificuldades ao utilizar o nosso sistema, você pode obter ajuda via Telegram clicando no botão abaixo ou através de um dos nossos canais oficiais: telefone: (53) XXXX-XXXX email: suporte@ecoo.org.br",
      },
      "start-up-critical": {
        type: "Erro Crítico",
        "when-or-where": "Falha ao inicializar",
        message:
          "Ocorreu um erro ao iniciar a aplicação. Tente novamente e se o erro persistir entre em contato com o nosso suporte.",
      },
    },
    "/login": [
      {
        type: "Erro",
        "when-or-where": "Email inválido",
        message: "Informe um email válido. Exemplo: seunome@provedor.com",
      },
      {
        type: "Erro",
        "when-or-where": "Senha errada",
        message:
          'Senha incorreta. Tente novamente ou clique em "Esqueceu a senha?" para escolher outra.',
      },
    ],
    "/esqueci-a-senha": [
      {
        type: "Erro",
        "when-or-where": "Email inválido",
        message: "Informe um email válido. Exemplo: seunome@provedor.com",
      },
    ],
  },
  producer: {
    general: {
      forbidden: {
        type: "Erro",
        "when-or-where": "Falha ao inicializar",
        message: "Não autorizado, cadastre-se como produtor.",
      },
    },
    "/cadastrar": {
      "click-here": {
        type: "Informação",
        "when-or-where": 'Botão "Clique aqui"',
        message:
          "Cadastre-se como um produtor caso queira vender os seus produtos através da e-COO. Para isto será necessário possuir um registro CAF ativo e um número de celular. Caso queira comprar produtos para a sua casa e ajudar a agricultura familiar, cadastre-se como cliente.",
      },
    },
    "/cadastrar/1": {
      "incomplete-name-error": {
        type: "Erro",
        "when-or-where": "Nome incompleto",
        message:
          "Insira o seu nome completo conforme o seu RG, incluindo o seu sobrenome.",
      },
      "invalid-email-error": {
        type: "Erro",
        "when-or-where": "Email inválido",
        message: "Informe um email válido. Exemplo: seunome@provedor.com",
      },
      "weak-password-error": {
        type: "Erro",
        "when-or-where": "Senha fraca",
        message: "Informe uma senha de pelo menos 6 caracteres.",
      },
    },
    "/cadastrar/2": {
      "invalid-caf-error": {
        type: "Erro",
        "when-or-where": "CAF inválido",
        message:
          "Registro de inscrição no CAF não encontrado, obtenha o seu registro clicando aqui (https://www.gov.br/agricultura/pt-br/assuntos/mda/caf/como-obter-o-caf)",
      },
      "invalid-email-error": {
        type: "Erro",
        "when-or-where": "CAF inativo",
        message:
          "A sua inscrição no CAF está inativa ou suspensa. Procure imediatamente uma entidade cadastradora da Rede CAF.",
      },
      "help-caf-info": {
        type: "Informação",
        "when-or-where": 'Botão "Ajuda CAF"',
        message:
          "O CAF (Cadastro Nacional da Agricultura Familiar) é uma identificação das Unidades Familiares de Produção Agrária (UFPA), dos Empreendimentos Familiares Rurais e das formas associativas de organização da agricultura familiar. Para obter a sua inscrição, clique aqui. (https://www.gov.br/agricultura/pt-br/assuntos/mda/caf/como-obter-o-caf)",
      },
      "invalid-cpf-error": {
        type: "Erro",
        "when-or-where": "CPF inválido",
        message: "Informe um CPF válido. Exemplo: 123.456.789-10",
      },
      "invalid-cellphone-error": {
        type: "Erro",
        "when-or-where": "Celular inválido",
        message:
          "Informe um número de celular válido, incluindo código de área. Exemplo: (53)98765-4321",
      },
    },
    "/cadastrar/3": {
      "invalid-pin-error": {
        type: "Erro",
        "when-or-where": "PIN inválido",
        message: "Número PIN inválido. Tente novamente.",
      },
    },
    "/": {
      "current-balance-info": {
        type: "Informação",
        "when-or-where": "Botão de informações do saldo",
        message:
          "O seu saldo mostra o valor total que você já recebeu vendendo os produtos pela e-COO. O sistema pode levar alguns dias para atualizar o seu saldo.",
      },
      "deliveries-list-info": {
        type: "Informação",
        "when-or-where": "Botão de informações entregas",
        message:
          "Esta lista inclui todos os produtos que já foram comprados pela e-COO. Fique atento aos prazos e leve a mercadoria até o nosso Centro de Distribuição (CDD).",
      },
    },
    "/produtos/vender/quantidade": [
      {
        type: "Erro",
        "when-or-where": "Quantidade inválida",
        message: "Insira um valor numérico válido.",
      },
    ],
    "/produtos/vender/validade": [
      {
        type: "Erro",
        "when-or-where": "Data inválida",
        message: "Insira uma data no seguinte formato: DD/MM/AAAA.",
      },
    ],
    "/produtos/vender/preco": [
      {
        type: "Erro",
        "when-or-where": "Preço inválido",
        message:
          "Insira um preço válido, incluindo as casas decimais (centavos).",
      },
    ],
  },
  cdd: {
    general: {
      forbidden: {
        type: "Erro",
        "when-or-where": "Falha ao inicializar",
        message: "Não autorizado, redirecionando para aplicação de consumidor.",
      },
    },
    "/": {
      "verify-deliveries-info": {
        type: "Informação",
        "when-or-where": 'Botão de informações "Verificar Entregas"',
        message:
          "O Centro de Distribuição (CDD) é responsável por receber as mercadorias dos produtores. Para isto é necessário verificar se elas atendem os critérios de quantidade, qualidade e validade estipulados. Em caso afirmativo, a entrega será aprovada, caso contrário, rejeitada com a devida justificativa.",
      },
      "make-bag-info": {
        type: "Informação",
        "when-or-where": 'Botão de informações "Montar Sacola"',
        message:
          'Antes de despachar a sacola para os clientes, é preciso montá-la. Clique em "Montar sacola", separe os produtos do pedido e clique em "Confirmar" quando a sacola estiver pronta para ser enviada.',
      },
      "send-bag-info": {
        type: "Informação",
        "when-or-where": 'Botão de informações "Enviar Sacola"',
        message:
          "A sacola do cliente já está com o entregador? Clique em enviar sacola para notificar o cliente que a sua sacola saiu para a entrega.",
      },
    },
  },
};
