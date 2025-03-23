import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { HiOutlineIdentification } from "react-icons/hi";


export default function Config () {
    return (
        <div className="p-4 flex flex-col gap-3">
            <Link href={"/perfil/pessoal"} className="border rounded-[8px] flex justify-between items-center p-4">
                <div className="flex items-center gap-6 text-[#545F71]">
                    <HiOutlineIdentification size={24}/>
                    <p>Informações pessoais</p>
                </div>
                <FiArrowRight className="text-[#9BA5B7]"/>
            </Link>
            <Link href={"/perfil/comercial"} className="border rounded-[8px] flex justify-between items-center p-4">
                <div className="flex items-center gap-6 text-[#545F71]">
                    <HiOutlineIdentification size={24}/>
                    <p>Informações do negócio</p>
                </div>
                <FiArrowRight className="text-[#9BA5B7]"/>
            </Link>
        </div>
    );
}