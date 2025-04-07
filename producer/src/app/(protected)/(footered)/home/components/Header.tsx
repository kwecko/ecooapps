"use client";

import SkeletonLoader from "@shared/components/SkeletonLoader";
import useFetchProfile from "@shared/hooks/users/useFetchProfile";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiSettings } from "react-icons/fi";
import { HiOutlinePencilAlt } from "react-icons/hi";

export function Header() {
  const {
    data: { first_name },
    isLoading,
  } = useFetchProfile();

  const router = useRouter();

  const logout = () => {
    router.push("/api/auth/logout");
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
        <Link href={"/configuracoes"} className="text-theme-primary">
          <FiSettings size={24}/>
        </Link>
      </div>
    </header>
  );
}
