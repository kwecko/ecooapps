"use client";

import React from "react";
import { getWeekDays } from "../../../utils/index";
import { useEffect, useState } from "react";

interface TableProps {
  bgColor: string
}

export default function Table({ bgColor }: TableProps) {
  const [offer, setoffer] = useState<number[]>();
  const [order, setorder] = useState<number[]>();
  const [deliver, setdeliver] = useState<number[]>();

  useEffect(() => {
    const savedCycleString = localStorage.getItem("selected-cycle");
    const savedCycleData = savedCycleString
      ? JSON.parse(savedCycleString)
      : null;

    const { offer, order, deliver } = savedCycleData;

    setoffer(offer);
    setorder(order);
    setdeliver(deliver);
  }, []);

  return (
    <div className="bg-white rounded-lg h-full">
      <table className="min-w-full table-fixed">
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="py-2 px-4 text-theme-primary text-base w-1/2">
              Duração do ciclo:
            </td>
            <td style={{ color: bgColor }} className="py-2 px-4 font-bold w-1/2">
              7 dias
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 text-theme-primary text-base w-1/2">
              Ofertas:
            </td>
            <td style={{ color: bgColor }} className="py-2 px-4 font-bold w-1/2">
              {getWeekDays({
                array: offer,
                short: true,
              }).map((day) => `${day}, `)}
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 text-theme-primary text-base w-1/2">
              Pedidos:
            </td>
            <td style={{ color: bgColor }} className="py-2 px-4 font-bold w-1/2">
              {getWeekDays({
                array: order,
                short: true,
              }).map((day) => `${day}, `)}
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 text-theme-primary text-base w-1/2">
              Entregas:
            </td>
            <td style={{ color: bgColor }} className="py-2 px-4 font-bold w-1/2">
              {getWeekDays({
                array: deliver,
                short: true,
              }).map((day) => `${day}, `)}
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 text-theme-primary text-base w-1/2">
              Manutenção:
            </td>
            <td style={{ color: bgColor }} className="py-2 px-4 font-bold w-1/2">****</td>
          </tr>
          <tr>
            <td className="py-2 px-4 text-theme-primary text-base w-1/2">
              Próximo feriado:
            </td>
            <td style={{ color: bgColor }} className="py-2 px-4 font-bold w-1/2">****</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
