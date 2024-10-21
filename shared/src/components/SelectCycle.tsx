"use client";

import React, { useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { LuChevronsUpDown } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { useCycleProvider } from "../context/cycle/index";
import { getCycles } from "../_actions/cycles/get-cycles"
import { useHandleError } from "../hooks/useHandleError"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { ICycle } from "../interfaces/cycle";

export default function SelectCycle() {
  const [cycles, setCycles] = useState<ICycle[] | undefined>();
  const { cycle, setCycle } = useCycleProvider();

  const router = useRouter();
  const { handleError } = useHandleError()
  const { getFromStorage, setInStorage } = useLocalStorage()

  const handleCycleChange = (newCycle: ICycle) => {
    setCycle(newCycle);

    setInStorage("selected-cycle", newCycle)
  };

  const handleClickButton = () => {
    const cycle = getFromStorage("selected-cycle")

    if (!cycle) {
      toast.warning("Selecione um ciclo para ver mais informações sobre ele!");
      return;
    }

    router.push("/informacoes-ciclo");
  };

  useEffect(() => {
    (async () => {
      
      getCycles()
        .then((response) => {
          if(response.message){
            const messageError = response.message as string;
            handleError(messageError);
          } else {
            setCycles(response.data)
          }
        })
        .catch(() => {
          toast.error("Erro ao buscar os ciclos.")
        })

      const savedCycle = getFromStorage("selected-cycle")

      if (savedCycle) {
        setCycle(savedCycle);
      }
    })();
  }, []);

  return (
    <div className="w-full flex flex-col gap-2">
      <span className="text-sm leading-[19px] text-slate-gray pl-3.5 tracking-tight-2-percent">
        Para começar, selecione o{" "}
        <Button
          className="underline underline-offset-[3px]
           font-bold"
          type="button"
          onClick={handleClickButton}
        >
          Ciclo
        </Button>
      </span>
      <Listbox value={cycle} onChange={handleCycleChange} by="id">
        {({ open }) => (
          <div className="w-full relative pt-1">
            <Listbox.Button
              className={`relative w-full py-3 cursor-default rounded-2xl bg-white pl-3 pr-10 text-left ${open ? "flex flex-row justify-between items-center rounded-b-none bg-neutral-50 ring-2 ring-slate-gray ring-opacity-50" : ""
                }`}
            >
              <span className="block truncate text-slate-gray px-3">
                {cycle === undefined
                  ? "Selecione um ciclo"
                  : `Ciclo ${cycle.alias}`}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
                <LuChevronsUpDown
                  className="h-5 w-5 text-slate-gray"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              leave="transition ease-in duration-50"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute w-full overflow-auto
               bg-white py-0 text-base shadow-lg rounded-b-2xl ring-2 ring-slate-300 z-10 max-h-60 sm:text-sm">
                {cycles?.map((cycle) => (
                  <Listbox.Option
                    key={cycle.id}
                    className={({ selected }) =>
                      `relative cursor-default select-none py-2.5 pl-10 pr-4 ${selected
                        ? "text-slate-gray bg-theme-background"
                        : "bg-white"
                      }`
                    }
                    value={cycle}
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate text-slate-gray pl-3.5`}>
                          {`Ciclo ${cycle.alias}`}
                        </span>
                        {selected && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-5 bg-theme-background">
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
        )}
      </Listbox>
    </div>
  );
}