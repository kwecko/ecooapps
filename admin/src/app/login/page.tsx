"use client";

import Image from "next/image";

import bag from "@shared/assets/images/bag.webp";

import LogoLight from "@shared/assets/svg/logo-light";

import Copyright from "@admin/app/components/Copyright";
import LoginForm from "@admin/app/login/components/loginForm";

export default function Login() {
  return (
    <div className="w-full h-dvh flex">
      <div className="w-full h-inherit flex flex-col items-center bg-theme-home-bg overflow-y-hidden">
        <div className="flex flex-col justify-end items-start h-inherit gap-6 max-w-lg">
          <div className="h-1/2 flex items-start justify-center flex-col">
            <LogoLight />
            <h1 className="text-4xl text-white font-semibold w-80">
              Painel do Administrador
            </h1>
          </div>
          <div className="h-1/2 shrink-1 self-end">
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
                transform: "translateX(-50px)",
              }}
            />
          </div>
        </div>
      </div>
      <div className="w-full max-h-[100dvh] overflow-y-auto flex flex-col items-center justify-center">
        <div className="flex w-full flex-col items-start max-w-86 justify-start h-1/2 pb-32 gap-10">
          <h1 className="text-4.25xl font-semibold leading-12.5">
            Fazer login
          </h1>

          <LoginForm />
          <Copyright type="secondary" />
        </div>
      </div>
    </div>
  );
}
