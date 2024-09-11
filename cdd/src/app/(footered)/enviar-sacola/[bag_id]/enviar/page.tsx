import Link from "next/link";
import { IoCheckmarkCircle } from "react-icons/io5";

import Button from "@shared/components/Button";

export default async function Home() {
  return (
    <div className="text-slate-gray flex flex-col bg-theme-background p-5 justify-start h-full">
      <div className="flex flex-col items-center justify-between h-full">
        <div className="h-[90%] flex items-end justify-center">
          <IoCheckmarkCircle className="text-[125px] text-[#00735E]" />
        </div>
        <div className="flex flex-col items-center justify-start h-full pt-4">
          <span className="text-center text-3xl font-medium">
            A sacola foi <br /> enviada!
          </span>
          <span className="mt-4 text-center text-sm font-medium">
            A sacola #12345 está a caminho<br />do cliente {" "}
            Eduardo Teixeira.
          </span>
        </div>
        <div className="justify-self-end">
          <Link href={"/"} className="w-full">
            <Button
              className="w-full bg-[#F7F7F7] rounded-md h-12 mb-[12px] text-walnut-brown border-2 border-walnut-brown font-semibold"
              href={"/"}
            >
              Voltar para a tela inicial
            </Button>
          </Link>
          <Link href={"/enviar-sacola"} className="w-full">
            <Button
              className="w-full bg-walnut-brown rounded-md h-12 text-white font-semibold"
              href={"/montar-sacola"}
            >
              Enviar outra sacola
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
