"use client";

import Image from "next/image";
import Link from "next/link";
import RedirectCart from "../../_components/redirectCart";
import React from "react";
import { SlArrowRight } from "react-icons/sl";


export default function Inicio() {
  return (
    <>
    <div className="flex flex-col w-full h-screen">
      <div className="h-screen scroll-smooth">

				<Link href={"/categorias"}>
        <div className="min-w-87.5 h-25 bg-theme-background flex rounded-2xl m-2.5">
          <div className="flex w-20 h-20 ml-2.5 mt-2.5 mb-2.5 mr-5 bg-theme-highlight rounded-xl">
            <Image
            className="rounded-xl"
            src={"/256x256_categorias.jpg"}
            width={80}
            height={80}
            alt={`categorias.jpg`}
            />
          </div>
          <div className="grow flex flex-col items-center justify-center min-h-20 mt-2 mb-2">
            <span className="w-full text-left text-base">
              Categorias
            </span>
          </div>
          <div className="flex min-w-24 min-h-20 items-center justify-center m-2">
            <SlArrowRight className="text-slate-gray" />         
          </div>
        </div>
				</Link>

        <Link href={"/produtores"}>
        <div className="min-w-87.5 h-25 bg-theme-background flex rounded-2xl m-2.5">
          <div className="flex w-20 h-20 ml-2.5 mt-2.5 mb-2.5 mr-5 bg-theme-highlight rounded-xl">
          <Image
            className="rounded-xl"
            src={"/256x256_produtores.jpg"}
            width={80}
            height={80}
            alt={`produtores.jpg`}
            />
          </div>
          <div className="grow flex flex-col items-center justify-center min-h-20 mt-2 mb-2">
            <span className="w-full text-left text-base">
              Produtores
            </span>
          </div>
          <div className="flex min-w-24 min-h-20 items-center justify-center m-2">
            <SlArrowRight className="text-slate-gray" />
          </div>
        </div>
        </Link>

      </div>
    </div>
    <RedirectCart/>
    </>
  );
}
