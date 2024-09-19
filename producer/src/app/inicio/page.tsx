import Image from "next/image";
import Link from "next/link";

import Button from "@shared/components/Button";

export default function Inicio() {
  return (
    <div className="h-[inherit] bg-theme-home-bg w-full flex pl-3 pr-3 pt-3 flex-col justify-center items-center gap-12 overflow-hidden">
      <div className="w-full flex flex-col items-center justify-end gap-4 pt-20 pb-1">
        <Image
          src="/logo/light.svg"
          width={180}
          height={60}
          alt="e-COO"
          className="pt-1.5"
        />
        <span className="text-center text-white font-medium text-sm leading-[1.375rem]">
          Inovação e tecnologia social para o<br />fortalecimento da
          agricultura familiar
        </span>
      </div>

      <div className="w-full flex flex-col gap-4 px-1 pt-0.5">
        <Link href={"/login"}>
          <Button className="w-full h-12 flex flex-col items-center justify-center font-semibold rounded-md text-base leading-[22px] text-slate-gray border-0 bg-white">Entrar</Button>
        </Link>
        <Link href={"/cadastrar"}>
          <Button className="w-full h-12 flex flex-col items-center justify-center font-semibold rounded-md text-base leading-[22px] text-white border-white border-2 box-border">Cadastrar</Button>
        </Link>
      </div>

      <div className="flex-grow flex justify-center items-end h-full">
        <Image
          src="/bag_wo_shadow.png"
          alt="bag"
          width={279}
          height={349}
          quality={100}
          className="object-contain"
          style={{
            filter: "drop-shadow(-50px 20px 30px rgba(0, 0, 0, 0.25))",
          }}
        />
      </div>
    </div>
  );
}
