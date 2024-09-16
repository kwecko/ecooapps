import React from "react";
import Link from "next/link";

import { AppID } from "../../library/types/app-id";

import FormLogin from "./components/form";

export default function Login({ appID }: { appID: AppID }) {
  return (
    <div className="w-full h-[var(--min-page-height)] p-3 pb-6 flex items-center flex-col">
      <div className="flex flex-col h-1/4 w-full items-center justify-end">
        <h1 className="text-3xl font-medium text-slate-gray mb-4">Login</h1>
        <span className="text-sm font-medium text-slate-gray mb-6">
          Entre com seu email e senha:{" "}
        </span>
      </div>
      <div className="w-full h-[55%] flex flex-col justify-center">
        <FormLogin appID={appID} />
        
        <div className="mt-6 flex justify-center">
          <span className="text-sm font-medium text-slate-gray">
            Esqueceu a senha? <Link href={"/recuperarsenha"}>Clique aqui</Link>
            <span className="inter-font underline"></span>
          </span>
        </div>
      </div>
    </div>
  );
}
