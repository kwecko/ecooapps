import notFound from "../assets/images/not-found.webp"
import Button from "../components/Button"
import Image from 'next/image'
import Link from "next/link"
import { LuChevronLeft } from "react-icons/lu"

export default function NotFound() {
  return (
    <div className="w-full h-full flex flex-col justify-center bg-white overflow-y-auto">
      <div className="w-full flex flex-col items-center justify-center mt-4 md:mt-8 h-[92%] px-4 md:px-10 lg:px-20">
        <h1 className="text-slate-gray font-medium text-3xl md:text-4xl lg:text-5xl mb-8">
          Erro 404
        </h1>
        <div className="flex flex-col gap-6 md:gap-8 mb-10">
          <span className="text-slate-gray text-center leading-[20px] font-medium text-sm md:text-base">
            Infelizmente a página não foi <br /> localizada em nossos servidores.
          </span>
          <span className="text-slate-gray text-center leading-[20px] font-medium text-sm md:text-base">
            Verifique o link ou entre em <br /> contato com o nosso suporte.
          </span>
        </div>
        <Image 
          src={notFound}
          width={360}
          height={364}
          alt=""
          className="w-full max-w-[500px] object-contain mx-auto"
        />
      </div>
      <div className="w-full h-[8%] flex items-center bg-theme-background px-4 md:px-10">
        <Link href="/" className="flex items-center">
          <LuChevronLeft className={'w-[30px] h-[30px] text-slate-gray'} />
          <Button
            className={'flex items-center gap-2 text-sm font-medium text-slate-gray w-auto'}
          >
            Voltar
          </Button>
        </Link>
      </div>
    </div>
  )
}
