"use client";

import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

import { listProducts } from "@shared/_actions/products/GET/list-products";
import { useDebounce } from "@shared/hooks/useDebounce";
import { useHandleError } from "@shared/hooks/useHandleError";
import { ProductDTO } from "@shared/interfaces/dtos";

export type ModalKeys =
  | "isOpenCreateProductModal"
  | "isOpenDeleteProductModal"
  | "isOpenUpdateProductModal"
  | "isArchivedProductModal";

export default function useProductsPage() {
  // States
  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [archived, setArchived] = useState<boolean | undefined>(undefined);
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState<Record<ModalKeys, boolean>>({
    isOpenCreateProductModal: false,
    isOpenDeleteProductModal: false,
    isOpenUpdateProductModal: false,
    isArchivedProductModal: false,
  });
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const {
    isOpenCreateProductModal,
    isOpenDeleteProductModal,
    isOpenUpdateProductModal,
    isArchivedProductModal,
  } = isModalOpen;
  const [selectedProduct, setSelectedProduct] = useState<ProductDTO | null>(
    null
  );

  // Consts
  const debounceSearch = useDebounce(name);

  const { handleError } = useHandleError();

  useEffect(() => {
    setPage(1);
  }, [debounceSearch]);

  useEffect(() => {
    setPage(1);
  }, [archived]);
  

  useEffect(() => {
    startTransition(() => {
      getProducts({ page, product: debounceSearch, archived: archived });
    });
  }, [debounceSearch, page, archived]);

  // Functions
  function getProducts({ page, product, archived }: { page: number; product: string; archived: boolean | undefined }) {
    listProducts({ page, product, archived })
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

  function reloadProducts() {
    setName("");
    getProducts({ page: 1, product: "", archived: undefined});
  }

  const toggleModal = (value: ModalKeys, product?: ProductDTO) => {
    setIsModalOpen((prev) => ({
      ...prev,
      [value]: !prev[value],
    }));

    if (product) {
      setSelectedProduct(product);
      return;
    }

    setSelectedProduct(null);
  };

  // Returns
  return {
    name,
    setName,
    archived,
    setArchived,
    page,
    products,
    nextPage,
    prevPage,
    isPending,
    toggleModal,
    isOpenCreateProductModal,
    isOpenDeleteProductModal,
    isOpenUpdateProductModal,
    isArchivedProductModal,
    selectedProduct,
    reloadProducts,
  };
}
