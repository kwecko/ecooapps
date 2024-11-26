"use client";

import { getUser } from "@shared/_actions/account/get-user"
import { useHandleError } from "@shared/hooks/useHandleError";
import SkeletonLoader from "@shared/components/SkeletonLoader";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineBell, HiOutlinePencilAlt } from "react-icons/hi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function Header() {
  const [name, setName] = useState('');
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  const { handleError } = useHandleError()

  useEffect(() => {
    (async () => {
      await getUser()
        .then((response) => {
          if (response.message) {
            const messageError = response.message;

            handleError(messageError)
          } else if (response.data) {
            const { first_name } = response.data;
            setName(first_name);
            setIsLoading(false)
          }
        })
        .catch(() => {
          toast.error("Erro desconhecido.")
        })
    })()
  }, [])

  const logout = () => {
    router.push("/api/auth/logout")
  }

  return (
    <header className="w-full flex items-start justify-between px-2.5 text-lg leading-5.5 pb-2.5 top-0 z-10 bg-theme-background">
      <div className="flex-shrink">
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <span className="flex gap-1 items-center text-slate-gray">
            Olá, <Link href={"/alterar-cadastro"}><strong className="font-semibold underline underline-offset-2">{name}</strong></Link>
            <Link href={"/alterar-cadastro"}>
              <HiOutlinePencilAlt size={16} />
            </Link>
          </span>
        )}
      </div>
      <div className="flex gap-4.5">
        <button disabled className="text-theme-primary">
          <HiOutlineBell size={24} />
        </button>
        <button
          onClick={logout}
          title="Sair" 
          type="button" 
          aria-label="Sair" 
          className="pt-0.5 text-slate-gray"
        >
          Sair
        </button>
      </div>
    </header>
  );
}
