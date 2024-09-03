// "use client";

// import { useState } from "react";

// interface TableProps {
//   deliveryData: any[];
// }

// export default function Table({ deliveryData }: TableProps) {
//   const [paginaAtual, setPaginaAtual] = useState<number>(0);
//   const itensPorPagina: number = 6;
//   const numPaginas: number = Math.ceil(deliveryData.length / itensPorPagina);

//   const paginarDados = (): any[] => {
//     const startIndex: number = paginaAtual * itensPorPagina;
//     const endIndex: number = startIndex + itensPorPagina;
//     return deliveryData.slice(startIndex, endIndex);
//   };

//   const trocarPagina = (indice: number): void => {
//     setPaginaAtual(indice);
//   };

//   return (
//     <>
//       <div className="overflow-x-auto overflow-y-hidden h-[100%] mt-5">
//         <table className="w-full bg-white rounded-lg leading-7 text-primary text-inter">
//           <thead>
//             <tr className="flex justify-between border-b">
//               <th className="p-3 font-normal truncate w-1/6">Pedido</th>
//               <th className="p-3 font-normal truncate w-1/4">Cliente</th>
//               <th className="p-3 font-normal truncate w-1/4">Pagamento</th>
//               <th className="p-3 font-normal truncate w-1/4">Valor</th>
//               <th className="p-3 font-normal truncate w-1/4">Conteúdo</th>
//               <th className="p-3 font-normal truncate w-1/4">CEP</th>
//               <th className="p-3 font-normal truncate w-1/4">Endereço</th>
//               <th className="p-3 font-normal truncate w-1/4">Bairro</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginarDados().map((item: any, index: number) => (
//               <tr key={index} className="flex border-b">
//                 <td className="p-3 font-normal text-center truncate w-1/6">
//                   {item.id_do_pedido}
//                 </td>
//                 <td className="p-3 font-normal text-center truncate w-1/4">
//                   {item.nome_do_cliente}
//                 </td>
//                 <td className="p-3 font-normal text-center truncate w-1/4">
//                   {item.forma_de_pagamento}
//                 </td>
//                 <td className="p-3 font-normal text-center truncate w-1/4">
//                   {item.valor_a_cobrar}
//                 </td>
//                 <td className="p-3 font-normal text-center truncate w-1/4">
//                   {item.conteudo.join(", ")}
//                 </td>
//                 <td className="p-3 font-normal text-center truncate w-1/4">
//                   {item.cep}
//                 </td>
//                 <td className="p-3 font-normal text-center truncate w-1/4">
//                   {item.endereco}
//                 </td>
//                 <td className="p-3 font-normal text-center truncate w-1/4">
//                   {item.bairro}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="flex justify-center mt-5 mb-5">
//         {Array.from({ length: numPaginas }, (_, index) => (
//           <button
//             key={index}
//             onClick={() => trocarPagina(index)}
//             className={`mx-3 ${
//               paginaAtual === index
//                 ? "text-theme-primary font-bold"
//                 : "text-theme-primary"
//             }`}
//           >
//             {index + 1}
//           </button>
//         ))}
//       </div>
//     </>
//   );
// }
