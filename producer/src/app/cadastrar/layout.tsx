"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import Stepper from "@shared/components/Stepper"
import { ModelPage } from "@shared/components/ModelPage";
import { useLocalStorage } from "@shared/hooks/useLocalStorage";
import Loader from "@shared/components/Loader";
import Link from "next/link";

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { getFromStorage } = useLocalStorage();

  const savedStep = parseInt(getFromStorage("register-current-step") || "1");
  const stepFromPath = parseInt(pathname.split("/").pop() as string);

  useEffect(() => {
    if(stepFromPath === 5){
      setIsLoaded(true);
      return;
    }

    if (savedStep !== stepFromPath) {
      router.push(`/cadastrar/${savedStep}`);
    }

    setIsLoaded(true);
  }, [pathname]);

  if (!isLoaded) {
    return <Loader appId="PRODUCER" loaderType="page" />;
  }

  if(stepFromPath === 5) {
    return (
      <motion.div
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ModelPage
          title="Criar um negócio"
          titleClassName="w-96"
          titleGap="gap-2"
          subtitle={
            <>
              <span>Preencha seus dados abaixo para finalizar a criação do seu agronegócio ou <Link href={'/login'} className="cursor-pointer underline underline-offset-2">entre com uma conta existente</Link></span>
            </>
          }
          overflowAuto={true}
        >
          {children}
        </ModelPage>
      </motion.div>
    );
  }

  if (savedStep === 4) {
    return (
      <motion.div
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ModelPage>
          {children}
        </ModelPage>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ModelPage
        title="Crie uma conta"
        titleGap="gap-2"
        subtitle={
          <>
            <span>Preencha seus dados abaixo ou <Link href={'/login'} className="underline underline-offset-2 cursor-pointer">entre com uma conta existente</Link></span>
          </>
        }
        subtitleClassName="w-80"
        overflowAuto={true}
      >
        <Stepper size={3} currentStep={savedStep} />
        {children}
      </ModelPage>
    </motion.div>
  );
}
