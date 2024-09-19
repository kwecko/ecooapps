"use client";

import React, { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { LuChevronsUpDown } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import Button from "@shared/components/Button";
import { getCyclesAction } from "@shared/_actions/cycles";
import { useLocalStorage } from "@shared/hooks/useLocalStorage"
import { CycleData } from "@shared/interfaces/cycle-data";

export default function SelectCycle() {
  const [cycles, setCycles] = useState<CycleData[]>();
  const [cycle, setCycle] = useState<CycleData | null>();

  const router = useRouter();
  const { getFromStorage, setInStorage } = useLocalStorage()

  useEffect(() => {
    (async () => {
      const savedCycle = getFromStorage('selected-cycle');
      if (savedCycle) {
        setCycle(savedCycle);
      }

      const getCycles = await getCyclesAction({});

      if (getCycles) {
        setCycles(getCycles);
      }
    })();
  }, []);

  const handleCycleChange = (newCycle: CycleData) => {
    setCycle(newCycle);
    setInStorage('selected-cycle', newCycle);
  };

  const handleClickButton = () => {
    if (!cycle) {
      toast.warning("Selecione um ciclo para ver mais informações sobre ele!");
      return;
    }

    router.push("/informacoes-ciclo");
  };

  return (
    <div>
      <span className="text-sm font-inter text-slate-gray">
        Para começar, selecione o{" "}
        <Button
          className="underline font-bold"
          type="button"
          onClick={handleClickButton}
        >
          Ciclo
        </Button>
      </span>
      <Listbox value={cycle} onChange={handleCycleChange}>
        {({ open }) => (
          <>
            <div className="relative mt-1">
              <Listbox.Button
                className={`relative w-full py-3 cursor-default outline-none ring-0 rounded-2xl bg-white pl-3 pr-10 text-left ${open ? "ring-2 ring-slate-gray" : ""
                  }`}
              >
                <span className="block truncate text-slate-gray">
                  {cycle === undefined
                    ? "Selecione um ciclo"
                    : `Ciclo ${cycle?.alias}`}
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
                <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {cycles?.map((cycle) => (
                    <Listbox.Option
                      key={cycle.id}
                      className={({ selected }) =>
                        `relative cursor-default select-none py-3 pl-10 pr-4 ${selected
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
