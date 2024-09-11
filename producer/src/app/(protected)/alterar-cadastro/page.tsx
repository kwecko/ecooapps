'use client'

import Button from "@shared/components/Button";
import Input from "@shared/components/Input";
import Link from "next/link";
import { AiFillEye } from "react-icons/ai";

export default function AlterarCadastro(){
  return(
    <div className="w-full h-screen p-5 flex items-center flex-col bg-theme-background">
      <div className="flex flex-col h-1/5 w-full items-center justify-end">
        <h1 className="text-3xl font-medium text-slate-gray">Seu perfil</h1>
        <span className="text-sm font-medium text-slate-gray text-center mt-2">
          Após atualizar os seus dados, < br/> clique em salvar.
        </span>
      </div>
      <div className="w-full h-4/5 flex flex-col mt-10">
        <form className="w-full h-full flex flex-col justify-between">
          <div className="w-full flex flex-col gap-5">
            <Input
              label="Nome completo"
              type="text"
              className="text-slate-gray w-full text-sm"
            />
              <Input
              label="Email"
              type="email"
              className="text-slate-gray w-full text-sm"
            />
            <Input
              label="Celular"
              type="text"
              className="text-slate-gray w-full text-sm"
            />
            <Input
              label="Senha"
              type="password"
              icon={<AiFillEye />}
              className="text-slate-gray w-full text-sm"
            />
          </div>
          
          <div className="w-full flex gap-2 items-end">
            <Link className="w-full" href={"/"}>
              <Button className="w-full rounded-lg font-semibold text-slate-gray border-slate-gray border-2 py-[10px]">
                Voltar
              </Button>
            </Link>

            <Button className="w-full px-2 py-3 font-semibold rounded-lg text-white border-0 p-2 bg-theme-default">
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}