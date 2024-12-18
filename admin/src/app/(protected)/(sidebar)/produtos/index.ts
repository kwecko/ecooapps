"use client";

import { toast } from "sonner";
import { useEffect, useState, useTransition } from "react";

import { ProductDTO } from "@shared/interfaces/dtos";
import { useDebounce } from "@shared/hooks/useDebounce";
import { useHandleError } from "@shared/hooks/useHandleError";
import { listProducts } from "@shared/_actions/products/GET/list-products";

export default function useProductsPage() {
  // States
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [isPending, startTransition] = useTransition();
  const [products, setProducts] = useState<ProductDTO[]>([]);

  // Consts
  const debounceSearch = useDebounce(name);
  const { handleError } = useHandleError();

  useEffect(() => {
    startTransition(() => {
      getProducts({ page, product: debounceSearch });
    });
  }, [debounceSearch, page]);

  // Functions
  function getProducts({page, product}: {page: number, product: string}) {
    listProducts({ page, product })
      .then((response) => {
        if (response.message) return handleError(response.message);
        setProducts(response.data);
      })
      .catch(() => {
        toast.error("Erro desconhecido.");
      });
  }

  function nextPage() {
    if (products.length < 20) {
      return;
    }
    setPage((prev) => prev + 1);
  }

  function prevPage() {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  }

  function imageLoader({ src }: { src: string }) {
    return `https://res.cloudinary.com/dwm7zdljf/image/upload/v1706539060/products/256x256_${src}`;
  }

  // Returns
  return {
    name,
    setName,
    page,
    products,
    nextPage,
    prevPage,
    isPending,
    imageLoader,
  };
}
