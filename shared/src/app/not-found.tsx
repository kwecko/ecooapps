import notFound from "../assets/not-found.png"
import Button from "../components/Button"
import Image from 'next/image'
import Link from "next/link"
import { LuChevronLeft } from "react-icons/lu"

export default function NotFound(){
  return (
    <div className="w-full h-full flex justify-center bg-white flex-col overflow-y-auto">
      <div className="w-full flex flex-col items-center justify-end mt-2 h-[92%]">
        <h1 className="text-slate-gray font-medium text-3xl mb-8">Erro 404</h1>
        <div className="flex flex-col gap-10 mb-10">
          <span className="text-slate-gray text-center leading-[20px] font-medium text-sm">Infelizmente a página não foi < br/> localizada em nossos servidores.</span>
          <span className="text-slate-gray text-center leading-[20px] font-medium text-sm">Verifique o link ou entre em < br/> contato com o nosso suporte.</span>
        </div>
        <Image 
          src={notFound}
          width={360}
          height={364}
          alt=""
          className="w-full object-contain"
        />
      </div>
      <div className="w-full h-[8%] flex items-center bg-theme-background">
        <Link href="/" className="flex items-center">
          <LuChevronLeft className={`w-[30px] h-[30px] text-slate-gray`} />
          <Button
            className={`flex items-center gap-2 text-sm font-medium text-slate-gray w-auto`}
          >
            Voltar
          </Button>
        </Link>
      </div>
    </div>
  )
}