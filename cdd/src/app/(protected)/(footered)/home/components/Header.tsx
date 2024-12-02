"use client";

import { fetchProfile } from "@shared/_actions/users/GET/fetch-profile";
import SkeletonLoader from "@shared/components/SkeletonLoader";
import { useHandleError } from "@shared/hooks/useHandleError";
import { useEffect, useState } from "react";
import { HiOutlineBell } from "react-icons/hi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function Header() {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  const router = useRouter();

  const { handleError } = useHandleError();

  useEffect(() => {
    (() => {
      fetchProfile()
        .then((response) => {
          if (response.message) {
            handleError(response.message);
          } else if (response.data) {
            const { first_name } = response.data;
            setName(first_name);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    })();
  }, []);

  const logout = () => {
    router.push("/api/auth/logout");
  }

  return (
    <header className="w-full flex items-start justify-between px-2.5 text-lg leading-5.5 sticky pb-2.5 top-0 z-30 bg-theme-background">
      <div className="flex-shrink">
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <span className="text-slate-gray">
            Olá, <strong className="font-semibold">{name}</strong>
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
