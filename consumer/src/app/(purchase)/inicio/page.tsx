"use client";

import Image from "next/image";
import Link from "next/link";
import RedirectCart from "../../_components/redirectCart";


export default function Inicio() {
  return (
    <>
    <div className="flex flex-col w-full h-screen">
      <div className="h-screen scroll-smooth">

        <div className="min-w-[350px] h-[100px] bg-[rgb(246,246,246)] flex rounded-2xl m-[10px] opacity-50">
          <div className="flex w-20 h-20 ml-[10px] mt-[10px] mb-[10px] mr-[20px] bg-[#00735E] rounded-[11px]">
            <Image
            className="rounded-[10px]"
            src={"/256x256_categorias.jpg"}
            width={80}
            height={80}
            alt={`categorias.jpg`}
            />
          </div>
          <div className="grow flex flex-col items-center justify-center min-h-20 mt-2 mb-2">
            <span className="w-full text-left font-poppins text-base">
              Categorias
            </span>
          </div>
          <div className="flex min-w-24 min-h-20 items-center justify-center m-2">
            <Image
              src="/arrow.png"
              alt="arrow"
              width={10}
              height={7}
            ></Image>
          </div>
        </div>

        <Link href={"/produtores"}>
        <div className="min-w-[350px] h-[100px] bg-[rgb(246,246,246)] flex rounded-2xl m-[10px]">
          <div className="flex w-20 h-20 ml-[10px] mt-[10px] mb-[10px] mr-[20px] bg-[#00735E] rounded-[11px]">
          <Image
            className="rounded-[10px]"
            src={"/256x256_produtores.jpg"}
            width={80}
            height={80}
            alt={`produtores.jpg`}
            />
          </div>
          <div className="grow flex flex-col items-center justify-center min-h-20 mt-2 mb-2">
            <span className="w-full text-left font-poppins text-base">
              Produtores
            </span>
          </div>
          <div className="flex min-w-24 min-h-20 items-center justify-center m-2">
              <Image
                src="/arrow.png"
                alt="arrow"
                width={10}
                height={7}
              ></Image>
          </div>
        </div>
        </Link>

      </div>
    </div>
    <RedirectCart/>
    </>
  );
}
