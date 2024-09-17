import { PageSettings } from "@shared/interfaces/page-settings";

const pageSettings: { [key: string]: PageSettings } = {
    productSelection: {
        title: "Escolha um produto",
        subtitle: "Este produto será disponibilizado para a venda através da plataforma",
    },
    unitAmount: {
        title: "Qual a quantidade?",
        subtitle: "Qual a quantidade do produto que gostaria de colocar à venda no nosso centro de distribuição?",
    },
    weightAmount: {
        title: "Qual o peso?",
        subtitle: "Qual o peso do produto que gostaria de colocar à venda no nosso centro de distribuição?",
    },
    price: {
        title: "Qual o preço do produto?",
        subtitle: "Qual o preço que o produto será vendido?",
    },
    description: {
        title: "Faltou alguma coisa?",
        subtitle: "Se existir alguma característica que você deseja informar ao consumidor, descreva aqui ou deixe em branco",
    },
    review: {
        title: "Revise as informações",
        subtitle: "Revise todas as informações antes de colocar o seu produto à venda",
    },
    empty: {
        title: "",
        subtitle: "",
    },
};

export default pageSettings;
