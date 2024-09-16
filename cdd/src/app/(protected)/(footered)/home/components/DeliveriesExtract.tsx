import Link from "next/link";
import { HiOutlineInformationCircle } from "react-icons/hi";

export default function DeliveriesExtract() {
  return (
    <div className="w-full h-full items-center mt-5 p-5 rounded-2xl bg-white flex gap-4">
      <div className="w-[90%] h-full flex items-center">
        <Link href="/extrato-entregas" className="w-full">
          <button className="w-full bg-[#4A403A] rounded-md p-4 text-white font-semibold">
            Gerar relatório
          </button>
        </Link>
      </div>
      <div className="w-[10%] h-full flex justify-center items-center">
        <button disabled className="rounded-full p-2">
          <HiOutlineInformationCircle size={24} className="text-[#7B7B7B]" />
        </button>
      </div>
    </div>
  );
}
