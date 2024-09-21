"use client";

import React from "react";
import { getWeekDays } from "@shared/utils/index";
import { useEffect, useState } from "react";
import { MiniTable } from "@shared/components/MiniTable";

export default function CycleInfoMiniTable() {

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

    const rows = [
        {
            header: "Duração do ciclo:",
            content: "7 dias",
        },
        {
            header: "Ofertas:",
            content: getWeekDays({
                array: offer,
                short: true,
            }).map((day) => `${day}, `),
        },
        {
            header: "Pedidos:",
            content: getWeekDays({
                array: order,
                short: true,
            }).map((day) => `${day}, `),
        },
        {
            header: "Entregas:",
            content: getWeekDays({
                array: deliver,
                short: true,
            }).map((day) => `${day}, `),
        },
        {
            header: "Manutenção:",
            content: "****",
        },
        {
            header: "Próximo feriado:",
            content: "****",
        },
    ];

    return (
        <MiniTable.Root>
            <MiniTable.Body>
                {rows.map((row, index) => (
                    <MiniTable.Row key={index}>
                        <MiniTable.HeaderCell className="col-span-3">{row.header}</MiniTable.HeaderCell>
                        <MiniTable.Cell className="col-span-4 pl-3 text-theme-highlight text-base leading-5.5 font-bold tracking-tight-2-percent">{row.content}</MiniTable.Cell>
                    </MiniTable.Row>
                ))}
            </MiniTable.Body>
        </MiniTable.Root>
    );
}