"use client";

import Button from "@shared/components/Button";
import SkeletonLoader from "@shared/components/SkeletonLoader";
import useFetchProfile from "@shared/hooks/users/useFetchProfile";
import { useRouter } from "next/navigation";
import { FiSettings } from "react-icons/fi";

export function Header() {
  const {
    data: { first_name },
    isLoading,
  } = useFetchProfile();

  const router = useRouter();

  const handleClickButton = () => {
    router.push("/configuracoes");
  };

  return (
    <header className="w-full flex items-start justify-between px-2.5 text-lg leading-5.5 pb-2.5 top-0 z-10 bg-theme-background">
      <div className="flex-shrink">
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <span className="flex gap-1 items-center text-slate-gray">
            Olá,{" "}
              <strong className="font-semibold underline underline-offset-2">
                {first_name}!
              </strong>
          </span>
        )}
      </div>
      <div className="flex gap-4.5">
        <Button className="text-theme-primary" onClick={handleClickButton}>
          <FiSettings size={24}/>
        </Button>
      </div>
    </header>
  );
}
