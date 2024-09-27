'use client'

import Link from "next/link";
import { AiFillCheckCircle } from "react-icons/ai";

import Button from "@shared/components/Button";
import { useEffect, useState } from "react";
import Loading from "@cdd/app/loading";

export interface IDataSessionStorage {
  title: string
  description: string
  button: {
    primary: string
    secundary: string
  }
}

export default function Success() {
  const [data, setData] = useState<IDataSessionStorage>({} as IDataSessionStorage);

  useEffect(() => {
    const storedData = sessionStorage.getItem('data-sucess');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  if (Object.keys(data).length === 0) {
    return (
      <Loading />
    )
  }

  return (
    <div className="w-full h-full flex flex-col p-5 bg-theme-background">
      <div className="w-full h-screen flex justify-center flex-col">
        <div className="w-full h-4/5 flex items-center flex-col justify-center">
          <AiFillCheckCircle className="w-[100px] h-[100px] text-rain-forest" />
          <span className="w-1/2 mt-6 text-center text-3xl text-slate-gray font-medium">
            {data.title}
          </span>
          <span className="w-1/2 mt-4 text-center text-slate-gray font-medium text-sm">
            {data.description}
          </span>
        </div>
        <div className="w-full h-1/5 pb-2 bg-red flex flex-col justify-end gap-4">
          <Link href={data?.button?.secundary}>
            <Button
              className="w-full rounded-lg font-semibold text-walnut-brown border-walnut-brown border-2 py-3"
            >
              Voltar para a tela inicial
            </Button>
          </Link>
          <Link href={data?.button?.primary}>
            <Button
              className="w-full px-2 py-3 font-semibold rounded-lg text-white border-0 p-3 bg-walnut-brown"
            >
              Verificar outra oferta
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
