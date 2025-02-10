"use client";
import { useCartProvider } from "@consumer/context/cart";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { HiOutlineShoppingCart } from "react-icons/hi";


export default function Header() {
  const pathname = usePathname();

  const listPath = decodeURI(pathname).split("/");
  const path = listPath[1];

  const searchParams = useSearchParams();
  const data = searchParams.get('data');
  const data_title: any = data ? JSON.parse(decodeURIComponent(data as string)).title : null;


  const mapPath: any = {
    inicio: { title: "Pesquisa de Produtos", back: null },
    produtores: { title: "Produtores", back: "/inicio" },
    produtor: { title: data_title, back: "/produtores" },
    ofertas: { title: data_title, back: "/produtores" },
    carrinho: { title: "Carrinho", back: "/produtores" },
  };

  const title = mapPath[path]?.title;
  const linkBack = mapPath[path]?.back;

  const { cart } = useCartProvider();

  return (
    <div className="w-full h-18 flex items-center bg-theme-background">
      {linkBack ? (
        <div className="flex items-center justify-center overflow-hidden w-10 h-10 ml-3 bg-theme-primary rounded-full">
          <Link href={linkBack}>
            <IoMdArrowRoundBack className="text-white object-cover" style={{ height: '20px', width: '20px' }} />          
          </Link>
        </div>
      ) : (
        <div className="flex items-center justify-center overflow-hidden w-10 h-10 ml-3"></div>
      )}
      <div className="grow text-center text-base font-inter font-bold text-theme-home-bg m-2">
        {title}
      </div>

      <div className="relative flex items-center justify-center w-10 h-10 mr-3  bg-theme-primary rounded-full">
        <Link href={"/carrinho"}>
          <HiOutlineShoppingCart className="text-white object-cover" style={{ height: '20px', width: '20px' }} />
        </Link>

        {cart.length > 0 ? (
          <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 flex items-center justify-center font-bold rounded-ful w-4.5 h-4.5 bg-error font-inter text-xxs text-white rounded-full text-center">
            {cart.length}
          </div>
        ) : null}
      </div>
    </div>
  );
}
