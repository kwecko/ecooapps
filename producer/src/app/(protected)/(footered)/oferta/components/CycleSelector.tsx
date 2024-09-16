"use client";

import { Listbox, Transition } from "@headlessui/react";
import { getCyclesAction } from "@shared/_actions/cycles";
import { useLocalStorage } from "@shared/hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { LuChevronsUpDown } from "react-icons/lu";

export interface CycleData {
    id: string;
    alias: string;
    offer: number[];
    order: number[];
    deliver: number[];
    created_at: Date;
    updated_at: Date | null
}

export default function CycleSelector({
    cycle,
    setCycle
}: {
    cycle: CycleData | null;
    setCycle: React.Dispatch<React.SetStateAction<CycleData | null>>;
}) {
    const [cycles, setCycles] = useState<CycleData[] | null>();

    const router = useRouter();

    const handleCycleChange = (newCycle: CycleData) => {
        setCycle(newCycle);
    };

    useEffect(() => {
        (async () => {
            let getCycles = await getCyclesAction({});

            if (getCycles) {
                const LocalStorage = useLocalStorage();
                const currentCycle = LocalStorage.getFromStorage("selected-cycle");
                if (currentCycle.id && getCycles.some((c) => c.id === currentCycle.id)) {
                    getCycles = getCycles.filter((c) => c.id !== currentCycle.id);
                }

                setCycles(getCycles);
            }
        })();
    }, []);

    return (
        <div className="w-full px-3">
            <Listbox value={cycle} onChange={handleCycleChange}>
                {({ open }) => (
                    <>
                        <div className="relative mt-1">
                            <Listbox.Button
                                className={`relative w-full py-3 cursor-default rounded-2xl bg-white pl-3 pr-10 text-left ${open ? "ring-2 ring-slate-gray" : ""
                                    }`}
                            >
                                <span className="block truncate text-slate-gray">
                                    {cycle === null
                                        ? "Selecione um ciclo"
                                        : `Ciclo ${cycle.alias}`}
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <LuChevronsUpDown
                                        className="h-5 w-5 text-slate-gray"
                                        aria-hidden="true"
                                    />
                                </span>
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                    {cycles?.map((cycle) => (
                                        <Listbox.Option
                                            key={cycle.id}
                                            className={({ selected }) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${selected
                                                    ? "text-slate-gray bg-theme-background"
                                                    : "bg-white"
                                                }`
                                            }
                                            value={cycle}
                                        >
                                            {({ selected }) => (
                                                <>
                                                    <span className={`block truncate text-slate-gray}`}>
                                                        {`Ciclo ${cycle.alias}`}
                                                    </span>
                                                    {selected && (
                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 bg-theme-background">
                                                            <FaCheck
                                                                className="h-4 w-4 text-slate-gray"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    )}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </>
                )}
            </Listbox>
        </div>
    );
}
