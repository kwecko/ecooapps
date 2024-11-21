"use client"

import Image from "next/image";

import Bag from "@shared/assets/bag.png"
import LogoLight from "@shared/assets/svg/logo-light.svg";

import Copyright from "@admin/components/Copyright";
import LoginForm from "@admin/app/login/components/loginForm";

export default function Login() {
  return (
    <div className="w-full h-full flex">
      <div className="w-full h-full flex flex-col items-center bg-theme-default">
        <div className="flex flex-col justify-end items-start h-full gap-6 max-w-lg">
          <Image
            src={LogoLight}
            width={300}
            height={100}
            alt="e-COO"
          />
          <h1 className="text-4xl text-white font-semibold w-80">Painel do Administrador</h1>
          <Image
            src={Bag}
            alt="bag"
            width={1200}
            height={1467}
            quality={100}
            className="object-contain"
            style={{ transform: "translateX(-150px)" }}
          />
        </div>
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="flex w-full flex-col items-start max-w-86 pt-40">
          <h1 className="text-2.5 font-semibold leading-12.5 mb-6">Fazer login</h1>

          <div className="w-full flex flex-col items-center gap-40">
            <LoginForm />
            <Copyright type="secondary" />
          </div>
        </div>
      </div>
    </div>
  )
}