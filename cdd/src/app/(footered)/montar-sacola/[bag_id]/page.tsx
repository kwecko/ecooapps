"use client"

import { useState } from "react";
import BagMiniTable from "./components/BagMiniTable";
import Button from "@shared/components/Button";
import Link from "next/link";

const fakeData = [
  {
    pedido: "205004",
    status: "Pendente",
    cliente: "Eduardo Teixeira",
    prazo: "11/09/2024",
    conteudo: [
      "2kg - Cebola Roxa (Sítio Silva)",
      "1un - Alface Crespa (Sítio Silva)",
      "500g - Pimentão Vermelho (Amoreza)",
      "800g - Cenoura (Amoreza)",
    ]
  },
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (localStorage.getItem("bag_id") == "205004") {
    fakeData[0].status = "Pronta";
  }

  const confirmAction = () => {
    setIsModalOpen(false);
    localStorage.setItem("bag_id", "205004");
  };

  const data = fakeData[0];

  return (
    <div className="w-full h-full p-5 pb-6 flex items-center flex-col bg-gray-100">
      <div className="flex flex-col h-[18%] w-full items-center justify-end mt-4">
        <h1 className="text-3xl font-semibold text-slate-800 mb-4 text-center">Conteúdo da Sacola</h1>
        <span className="text-sm font-medium text-slate-600 mb-6 text-center">
          Monte a sacola abaixo e, após concluir, <br /> marque como pronta
        </span>
      </div>
      <div className="w-full h-[82%] flex flex-col bg-white p-6 rounded-lg shadow-lg">
        <div className="flex-grow">
          <ul className="list-none p-0 space-y-4">
            {data.pedido && (
              <li className="flex items-center border-b border-gray-200 pb-2 w-full">
                <strong className="w-32 text-gray-700">Pedido:</strong>
                <span className="text-gray-500">{data.pedido}</span>
              </li>
            )}
            {data.status && (
              <li className="flex items-center border-b border-gray-200 pb-2 w-full">
                <strong className="w-32 text-gray-700">Status:</strong>
                <span className="text-gray-500">{data.status}</span>
              </li>
            )}
            {data.cliente && (
              <li className="flex items-center border-b border-gray-200 pb-2 w-full">
                <strong className="w-32 text-gray-700">Cliente:</strong>
                <span className="text-gray-500">{data.cliente}</span>
              </li>
            )}
            {data.prazo && (
              <li className="flex items-center border-b border-gray-200 pb-2 w-full">
                <strong className="w-32 text-gray-700">Prazo:</strong>
                <span className="text-gray-500">{data.prazo}</span>
              </li>
            )}
            {data.conteudo && (
              <li className="flex flex-col w-full">
                <strong className="text-gray-700">Conteúdo:</strong>
                <ul className="list-none p-0 space-y-2 mt-2">
                  {data.conteudo.map((item, index) => (
                    <li key={index} className="text-gray-500">{item}</li>
                  ))}
                </ul>
              </li>
            )}
          </ul>
        </div>
        <div className="mt-auto">
          {data.status !== "Pronta" && (
            <Button
              className="w-full bg-[#00735E] text-white hover:bg-[#016654] transition duration-300 w-full text-white inline-flex justify-center rounded-md border border-transparent px-3 py-4 font-medium"
              onClick={handleButtonClick}
            >
              Marcar como pronta
            </Button>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-96">
            <h2 className="text-xl text-center font-semibold text-gray-800 mb-4">Você tem certeza?</h2>
            <p className="text-gray-700 mb-6 text-center">Você tem certeza de que deseja marcar a sacola como pronta?</p>
            <div className="flex space-x-4">
              <Button
                className="flex-1 bg-[#D1D1D6] text-gray-700 hover:bg-[#bbbbbf] transition duration-300 rounded-md px-3 py-2 font-medium"
                onClick={closeModal}
              >
                Cancelar
              </Button>
              <Link href={"/montar-sacola/205004/aprovar"}>
                <Button
                  className="flex-1 bg-[#00735E] text-white hover:bg-[#016654] transition duration-300 rounded-md px-3 py-2 font-medium"
                  onClick={confirmAction}
                >
                  Confirmar
                </Button>
              </Link>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

