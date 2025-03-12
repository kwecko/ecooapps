import Link from "next/link";
import { FiPlusCircle } from "react-icons/fi";

interface AddProductButtonProps {
  disabled: boolean;
}

export default function AddProductButton({ disabled }: AddProductButtonProps) {
  return (
    <div className="w-full h-12 shrink-0 self-center px-4.5 pt-0">
      <Link
        href="/oferta/adicionar"
        className="w-full h-full flex flex-col justify-center items-center"
      >
        <button
          className={`w-full h-full flex flex-row items-center justify-center gap-2.5
          text-base font-semibold ${disabled ? 'bg-gray-400' : 'bg-theme-default'} text-white rounded-md`}
          disabled={disabled}
        >
          <FiPlusCircle size={22} />
          <span>Adicionar produto</span>
        </button>
      </Link>
    </div>
  );
}
