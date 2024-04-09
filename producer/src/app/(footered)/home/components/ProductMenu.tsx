import Link from "next/link";
import { HiOutlineInformationCircle } from "react-icons/hi";

export function ProductMenu() {
  return (
    <div className="mt-5 w-full h-fit pl-3 pr-4 rounded-2xl bg-white flex flex-col justify-around gap-4">
      <div className="flex justify-between items-start mt-[23px]">
        <span className="text-default text-[16px] mb-[13px]">
          Ofereça os seus produtos clicando no botão abaixo
        </span>
        <button>
          <HiOutlineInformationCircle className="text-[24px] text-slate-blue" />
        </button>
      </div>
      <div className="">
        <Link href="/produtos/vender/ciclo">
          <button className="w-full bg-default rounded-md h-12 mb-[12px] text-white font-semibold">
            Colocar a venda
          </button>
        </Link>
        <Link href={"/produtos/meus"}>
          <button className="w-full bg-transparent rounded-md h-12 mb-[20px] text-[#3E5155] border-2 border-[#3E5155] font-semibold">
            Ofertas vigentes
          </button>
        </Link>
      </div>
    </div>
  );
}
