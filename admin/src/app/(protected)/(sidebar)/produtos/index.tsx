"use client"

import { useEffect, useState } from "react";

import { useDebounce } from "@shared/hooks/useDebounce"

export default function useProductsPage(){
  const [name, setName] = useState('');

  const debounceSearch = useDebounce(name);

  useEffect(() => {

  })

  return {
    setName
  }
}