"use client"

import ButtonV2 from "@shared/components/ButtonV2";
import { useLocalStorage } from "@shared/hooks/useLocalStorage";
import Link from "next/link";

export default function ThirdStep() {
  const { deleteFromStorage } = useLocalStorage()

  return (
    <div className="w-full h-full flex flex-col justify-between mb-2">
      <div className="w-full flex flex-col items-center gap-6 mb-3 mt-12 text-slate-gray text-center">
        <h1 className="text-2xl font-semibold">Verifique o seu email</h1>
        <span className="w-64">Enviamos uma confirmação para o seu email de cadastro.</span>
        <span className="w-64">A confirmação é obrigatória para utilizar a sua conta e-COO.</span>
        <span className="w-64">Caso não localize o email, verifique a sua caixa de spam.</span>
      </div>
      <div className="w-full flex gap-3 mb-3">
        <Link className="w-full" href={'/login'}>
          <ButtonV2
            type="button"
            variant="default"
            className="h-12 flex justify-center items-center"
            onClick={() => deleteFromStorage("register-current-step")}
          >
            OK
          </ButtonV2>
        </Link>
      </div>
    </div>
  )
}