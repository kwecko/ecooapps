import Link from "next/link";
import { HiOutlineInformationCircle } from "react-icons/hi";

export function SendBagMenu() {
  return (
    <div className="mt-5 w-full pl-3 pr-4 rounded-2xl bg-white flex flex-col justify-around gap-4">
      <div className="flex justify-between items-start mt-[23px]">
        <span className="text-theme-default">
          Clique no botão abaixo para despachar uma sacola
        </span>
        <button disabled>
          <HiOutlineInformationCircle
            size={24}
            className="ml-4 text-slate-blue"
          />
        </button>
      </div>
      <div className="">
        <Link href="/enviar-sacola">
          <button className="w-full bg-walnut-brown rounded-md h-12 mb-[12px] text-white font-semibold">
            Enviar sacola
          </button>
        </Link>
      </div>
    </div>
  );
}
