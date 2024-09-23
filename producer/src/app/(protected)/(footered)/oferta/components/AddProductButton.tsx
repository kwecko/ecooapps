import Link from "next/link";
import { FiPlusCircle } from "react-icons/fi";

export default function AddProductButton() {
  return (
    <Link
      href="/oferta/adicionar"
      className="w-full h-12 shrink-0 self-center flex flex-col justify-center items-center"
    >
      <button className="h-full flex flex-row items-center justify-center gap-2.5 px-14
    text-base font-semibold bg-theme-default text-white rounded-md">
        <FiPlusCircle size={22} />
        <span>Adicionar produto</span>
      </button>
    </Link>
  );
}
