import Link from "next/link";
import { FiPlusCircle } from "react-icons/fi";

export default function AddProductButton() {
  return (
    <Link
      href="/oferta/adicionar"
      className="bg-theme-default text-white font-medium rounded-md
    h-12 mx-4 mt-6 flex items-center justify-center
    
"
    >
      <button className="flex items-center justify-center gap-2.5
    text-base font-semibold">
        <FiPlusCircle className="inline-block" size={22} />
        <span>Adicionar produto</span>
      </button>
    </Link>
  );
}
