"use client"

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { AppID } from "../../library/types/app-id";

import FormLogin from "./components/form";

import { SetTokenCookie } from "@shared/utils/set-token-cookie"

export default function Login({ appID }: { appID: AppID }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get('token')

  useEffect(() => {
    if(token) {
      SetTokenCookie(token)
      router.push("/cadastrar/5")
    }
  }, [searchParams])

  return (
    <div className="h-[inherit] w-full flex pl-3 pr-3 pt-3 flex-col justify-start items-center gap-9">
      <div className="w-full flex flex-col items-center justify-end pt-28 gap-2.5">
        <h1 className="text-3xl font-medium text-slate-gray pt-3">Login</h1>
        <span className="text-sm font-medium text-slate-gray">
          Entre com seu email e senha:{" "}
        </span>
      </div>
      <div className="w-full flex flex-col gap-6 px-1 pt-1.5">
        <FormLogin appID={appID} />

        <div className="flex justify-center">
          <span className="text-sm leading-[22px] font-medium tracking-tight text-theme-default">
            Esqueceu a senha? <Link href={"/recuperar-senha"} className="underline">Clique aqui</Link>
            <span className="inter-font underline"></span>
          </span>
        </div>
      </div>
    </div>
  );
}
