"use client"

import Image from "next/image";

import bag from "@shared/assets/images/bag.webp"

import LogoLight from "@shared/assets/svg/logo-light"

import Copyright from "@admin/app/components/Copyright";
import LoginForm from "@admin/app/login/components/loginForm";

export default function Login() {
  return (
    <div className="w-full h-full flex">
      <div className="w-full h-full flex flex-col items-center bg-theme-home-bg">
        <div className="flex flex-col justify-end items-start h-full gap-6 max-w-lg">
          <LogoLight />
          <h1 className="text-4xl text-white font-semibold w-80">Painel do Administrador</h1>
          <Image
            src={bag}
            alt="bag"
            width={426}
            height={533}
            quality={100}
            priority
            className="object-contain"
            style={{
              filter: "drop-shadow(-50px 20px 30px rgba(0, 0, 0, 0.25))",
              transform: "translateX(-50px)"
            }}
          />
        </div>
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="flex w-full flex-col items-start max-w-86 pt-40">
          <h1 className="text-4.25xl font-semibold leading-12.5 mb-6">Fazer login</h1>

          <div className="w-full flex flex-col items-center gap-40">
            <LoginForm />
            <Copyright type="secondary" />
          </div>
        </div>
      </div>
    </div>
  )
}