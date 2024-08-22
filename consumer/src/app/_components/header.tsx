"use client";
import { useCartProvider } from "@consumer/context/cart";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const listPath = decodeURI(pathname).split("/");
  const path = listPath[1];
  const titlePath = listPath[3];

  const mapPath: any = {
    inicio: { title: "Pesquisa de Produtos", back: null },
    produtores: { title: "Produtores", back: "/inicio" },
    ofertas: { title: titlePath, back: "/produtores" },
    carrinho: { title: "Carrinho", back: "/produtores" },
  };

  const title = mapPath[path]?.title ?? "Null";
  const linkBack = mapPath[path]?.back;

  const { cart } = useCartProvider();

  return (
    <>
      <div className="w-full min-h-[72px] flex items-center bg-[#F7F7F7]">
        {linkBack ? (
          <div className="flex items-center justify-center overflow-hidden w-10 h-10 ml-3  bg-[#545F71] rounded-[112px]">
            <Link href={linkBack}>
              {/* <div className="w-5 h-5"> */}
              <img
                src="/back.png"
                alt="back"
                className="object-cover"
                width={15}
                height={11.7}
              ></img>
              {/* </div> */}
            </Link>
          </div>
        ) : (
          <div className="flex items-center justify-center overflow-hidden w-10 h-10 ml-3"></div>
        )}
        <div className="grow text-center text-base font-inter font-bold text-[#2F4A4D] m-2">{title}</div>

        {/* <div> */}
        <div className="relative flex items-center justify-center w-10 h-10 mr-3  bg-[#545F71] rounded-[112px]">
          <Link href={"/carrinho"}>
            <img src="/cart.png" alt="cart" width={15} height={15} className="object-cover"></img>
          </Link>

            {cart.length > 0 ? (
              <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 flex items-center justify-center font-bold rounded-ful w-[18px] h-[18px] bg-[#FF7070] font-inter text-[10px] text-white rounded-full text-center">
                {cart.length}
              </div>
            ) : null}
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
