// "use client";

// import Footer from "@shared/components/Footer";
// import Table from "./components/Table";
// import ConfirmationModal from "./components/ConfirmationModal";
// import { DeliveryBag } from "@shared/interfaces/types/deliveryBag";
// import axios from "axios";
// import { useState } from "react";

// export default function ExtratoEntregas() {
//   const [deliveryBagData, setDeliveryBagData] = useState<DeliveryBag[]>([
//     {
//       id_do_pedido: 1,
//       nome_do_cliente: "Maria Silva",
//       conteudo: ["1kg de tomate", "500g de cebola", "2kg de batata"],
//       forma_de_pagamento: "CC Visa",
//       valor_a_cobrar: 30.0,
//       cep: "96200-100",
//       endereco: "Rua das Flores, 123",
//       bairro: "Centro",
//     },
//     {
//       id_do_pedido: 2,
//       nome_do_cliente: "João Pereira",
//       conteudo: [
//         "1kg de cenoura",
//         "1kg de beterraba",
//         "500g de alho",
//         "1kg de abobrinha",
//         "1kg de batata doce",
//         "1kg de cebola",
//         "1kg de mandioca",
//       ],
//       forma_de_pagamento: "Dinheiro",
//       valor_a_cobrar: 45.0,
//       cep: "96200-100",
//       endereco: "Av. Central, 456",
//       bairro: "Centro",
//     },
//     {
//       id_do_pedido: 3,
//       nome_do_cliente: "Ana Costa",
//       conteudo: ["500g de espinafre", "500g de rúcula", "1kg de mandioca"],
//       forma_de_pagamento: "Pix",
//       valor_a_cobrar: "Não",
//       cep: "96200-100",
//       endereco: "Travessa Rio Branco, 789",
//       bairro: "Centro",
//     },
//     {
//       id_do_pedido: 4,
//       nome_do_cliente: "Pedro Santos",
//       conteudo: ["1kg de limão", "1kg de maçã", "2kg de laranja", "1kg de uva"],
//       forma_de_pagamento: "CC Visa",
//       valor_a_cobrar: 55.0,
//       cep: "96200-100",
//       endereco: "Rua das Palmeiras, 321 - Ap 605, Bloco F",
//       bairro: "Cidade Nova",
//     },
//     {
//       id_do_pedido: 5,
//       nome_do_cliente: "Carlos Neto",
//       conteudo: ["3kg de batata", "2kg de cenoura"],
//       forma_de_pagamento: "CC Visa",
//       valor_a_cobrar: "Não",
//       cep: "96200-100",
//       endereco: "Rua Nova, 92",
//       bairro: "Cidade Nova",
//     },
//     {
//       id_do_pedido: 6,
//       nome_do_cliente: "Lúcia Gomes",
//       conteudo: [
//         "1kg de tomate",
//         "1kg de pepino",
//         "500g de pimentão",
//         "1kg de alface",
//       ],
//       forma_de_pagamento: "CC Master",
//       valor_a_cobrar: 50.0,
//       cep: "96200-100",
//       endereco: "Rua do Sol, 88",
//       bairro: "Cassino",
//     },
//     {
//       id_do_pedido: 7,
//       nome_do_cliente: "Rafael Dias",
//       conteudo: ["2kg de abóbora", "1kg de berinjela", "500g de cebolinha"],
//       forma_de_pagamento: "CC Visa",
//       valor_a_cobrar: 40.0,
//       cep: "96200-100",
//       endereco: "Av. Boa Vista, 55 - Ap 201",
//       bairro: "Cassino",
//     },
//     {
//       id_do_pedido: 8,
//       nome_do_cliente: "Marta Oliveira da Rocha dos Santos Veiga",
//       conteudo: ["1kg de banana", "1kg de pera", "1kg de maçã", "1kg de uva"],
//       forma_de_pagamento: "Pix",
//       valor_a_cobrar: "Não",
//       cep: "96200-100",
//       endereco: "Rua do Mar, 33",
//       bairro: "Cassino",
//     },
//     {
//       id_do_pedido: 9,
//       nome_do_cliente: "Luiz Souza",
//       conteudo: [
//         "1kg de tomate",
//         "1kg de cebola",
//         "1kg de batata",
//         "1kg de cenoura",
//       ],
//       forma_de_pagamento: "Dinheiro",
//       valor_a_cobrar: 35.0,
//       cep: "96200-100",
//       endereco: "Rua do Campo, 22",
//       bairro: "Cassino",
//     },
//     {
//       id_do_pedido: 10,
//       nome_do_cliente: "Fernanda Alves",
//       conteudo: [
//         "1kg de tomate",
//         "1kg de cebola",
//         "1kg de batata",
//         "1kg de cenoura",
//       ],
//       forma_de_pagamento: "Dinheiro",
//       valor_a_cobrar: 35.0,
//       cep: "96200-100",
//       endereco: "Rua do Campo, 22",
//       bairro: "Bolaxa",
//     },
//     {
//       id_do_pedido: 11,
//       nome_do_cliente: "Fernanda Alves",
//       conteudo: [
//         "1kg de tomate",
//         "1kg de cebola",
//         "1kg de batata",
//         "1kg de cenoura",
//       ],
//       forma_de_pagamento: "Dinheiro",
//       valor_a_cobrar: 35.0,
//       cep: "96200-100",
//       endereco: "Rua do Campo, 22",
//       bairro: "Bolaxa",
//     },
//     {
//       id_do_pedido: 12,
//       nome_do_cliente: "Fernanda Alves",
//       conteudo: [
//         "1kg de tomate",
//         "1kg de cebola",
//         "1kg de batata",
//         "1kg de cenoura",
//       ],
//       forma_de_pagamento: "Dinheiro",
//       valor_a_cobrar: 35.0,
//       cep: "96200-100",
//       endereco: "Rua do Campo, 22",
//       bairro: "Bolaxa",
//     },
//     {
//       id_do_pedido: 13,
//       nome_do_cliente: "Fernanda Alves",
//       conteudo: [
//         "1kg de tomate",
//         "1kg de cebola",
//         "1kg de batata",
//         "1kg de cenoura",
//       ],
//       forma_de_pagamento: "Dinheiro",
//       valor_a_cobrar: 35.0,
//       cep: "96200-100",
//       endereco: "Rua do Campo, 22",
//       bairro: "Bolaxa",
//     },
//     {
//       id_do_pedido: 14,
//       nome_do_cliente: "Fernanda Alves",
//       conteudo: [
//         "1kg de tomate",
//         "1kg de cebola",
//         "1kg de batata",
//         "1kg de cenoura",
//       ],
//       forma_de_pagamento: "Dinheiro",
//       valor_a_cobrar: 35.0,
//       cep: "96200-100",
//       endereco: "Rua do Campo, 22",
//       bairro: "Bolaxa",
//     },
//   ]);

//   const [loading, setLoading] = useState<boolean>(false);

//   const handleGeneratePDF = async () => {
//     try {
//       setLoading(true);

//       const response = await axios.post("/api/generate-pdf", deliveryBagData, {
//         responseType: "json",
//       });

//       const pdfBlob = response.data;
//       const pdfBuffer = Buffer.from(pdfBlob);
//       const pdfFile = new Blob([pdfBuffer], { type: "application/pdf" });
//       const pdfBlobUrl = URL.createObjectURL(pdfFile);
//       window.open(pdfBlobUrl);

//       setLoading(false);
//     } catch (error) {
//       console.error("Failed to generate PDF:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col bg-theme-background px-5 pt-16 justify-start">
//       <span className="text-center text-3xl font-medium text-slate-gray">
//         Extrato <br /> de entregas
//       </span>
//       <span className="mt-2 text-center text-sm font-medium text-slate-gray">
//         Imprima o extrato <br /> de entregas para o motoboy
//       </span>
//       <Table deliveryData={deliveryBagData} />
//       <button
//         disabled={loading}
//         onClick={handleGeneratePDF}
//         className={`${loading ? "cursor-not-allowed" : "cursor-pointer"}
//         ${loading ? "bg-gray-300" : "bg-[#00735E]"}
//         ${loading ? "text-gray-500" : "text-white"}
//         px-2 py-3 w-full rounded-md font-inter font-semibold`}
//       >
//         {loading ? "Gerando PDF..." : "Imprimir extrato"}
//       </button>
//     </div>
//   );
// }
