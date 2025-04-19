"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

import { useLocalStorage } from "@shared/hooks/useLocalStorage"

export default function ClientValidation({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();

  const { deleteFromStorage } = useLocalStorage()

  useEffect(() => {
    if(!pathName.startsWith('/cadastrar')){
      deleteFromStorage("register-current-step")
      deleteFromStorage("register-form-data")
    }
  }, [pathName]);

  return (
    <>
      {children}
    </>
  )
}
