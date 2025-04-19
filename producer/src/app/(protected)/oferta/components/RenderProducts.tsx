"use client";

import { listProducts } from "@producer/_actions/products/GET/list-products";
import { listCategories } from "@producer/_actions/categories/GET/list-categories";

import EmptyBox from "@shared/components/EmptyBox";
import Loader from "@shared/components/Loader";
import { ModelPage } from "@shared/components/ModelPage";

import { useHandleError } from "@shared/hooks/useHandleError";

import debounce from "lodash/debounce";
import Image from "next/image";
import { toast } from "sonner";
import { HiOutlineSearch } from "react-icons/hi";

import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";

import { ProductDTO, CategoryDTO } from "@shared/interfaces/dtos";
import pageSettings from "./page-settings";

export interface RenderProductsProps {
  setProduct: (product: ProductDTO) => void;
  handleNextStep: () => void;
}

export default function RenderProducts({
  setProduct,
  handleNextStep,
}: RenderProductsProps) {
  const { title, subtitle } = pageSettings.productSelection;
  const { handleError } = useHandleError();

  const [productName, setProductName] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [hasMoreProducts, setHasMoreProducts] = useState<boolean>(true);
  const [categories, setCategories] = useState<CategoryDTO[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryDTO | null>(
    null
  );

  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const isFirstRender = useRef(true);

  const handleLoadMore = useCallback(
    debounce(() => {
      if (hasMoreProducts) {
        setPage((prev) => prev + 1);
      }
    }, 300),
    [hasMoreProducts]
  );

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === productName) return;
    setProductName(e.target.value);
    setPage(1);
    setProducts([]);
  };

  useEffect(() => {
    const fetchCategories = () => {
      setIsLoadingCategories(true);

      listCategories({ page: 1 })
        .then((response) => {
          if (response.message) {
            handleError(response.message);
            return;
          }

          setCategories(response.data);
        })
        .catch((error) => {
          handleError("Erro ao buscar categorias.");
        })
        .finally(() => {
          setIsLoadingCategories(false);
        });
    };

    if (isFirstRender.current) {
      fetchCategories();
    }

    const fetchProducts = async () => {
      setIsLoadingProducts(true);

      await listProducts({
        product: productName,
        page: page,
        category_id: selectedCategory?.id || undefined,
      })
        .then((response) => {
          if (response.message) {
            handleError(response.message as string);
          } else if (response.data) {
            const fetchedProducts: ProductDTO[] = response.data;

            setProducts((prevProducts) => {
              const isFirstPage = page === 1;
              const allProducts = isFirstPage
                ? fetchedProducts
                : [...prevProducts, ...fetchedProducts];
              return Array.from(
                new Map(allProducts.map((item) => [item.id, item])).values()
              );
            });
            setHasMoreProducts(fetchedProducts.length >= 20);
          }
        })
        .catch(() => {
          toast.error("Erro ao buscar produtos.");
        })
        .finally(() => {
          setIsLoadingProducts(false);
        });
    };
    fetchProducts();
    isFirstRender.current = false;
  }, [productName, page, selectedCategory]);

  const handleSelectCategory = (category: CategoryDTO | null) => {
    if (category === selectedCategory) return;

    setSelectedCategory(category);
    setPage(1);
    setProducts([]);
  };

  const handleSelectProduct = (product: ProductDTO) => {
    setProduct(product);
    handleNextStep();
  };

  const lastProductRef = useCallback(
    (node: HTMLButtonElement | null) => {
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !isLoadingProducts) {
            handleLoadMore();
          }
        },
        { threshold: 0.5 }
      );

      if (node) {
        observer.current.observe(node);
      }
    },
    [handleLoadMore, isLoadingProducts]
  );

  return (
    <ModelPage title={title} titleGap="gap-2" subtitle={subtitle}>
      <div className="w-full overflow-y-hidden flex flex-col pt-2">
        <div className="relative w-full h-12">
          <input
            onChange={handleChangeInput}
            ref={inputRef}
            className="border border-french-gray rounded-md h-12 p-4 pr-10 text-base inter-font w-full"
            type="text"
          />
          <HiOutlineSearch
            className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
            size={24}
          />
        </div>
        <div className="flex flex-nowrap gap-2 mt-3 mb-2 overflow-x-auto max-w-full min-w-full whitespace-nowrap scrollbar-hide">
          {isLoadingCategories ? (
            <div className="flex justify-center w-full">
              <Loader className="mt-1" loaderType="component" />
            </div>
          ) : (
            <>
              <button
                onClick={() => handleSelectCategory(null)}
                className={`px-3 py-2 rounded-2xl text-sm min-w-fit whitespace-nowrap h-10 flex items-center justify-center ${
                  !selectedCategory
                    ? "bg-slate-gray text-white"
                    : "bg-french-gray/30 text-slate-gray"
                }`}
              >
                todos os produtos
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() =>
                    handleSelectCategory(
                      selectedCategory?.id === category.id ? null : category
                    )
                  }
                  className={`px-3 py-2 rounded-2xl text-sm min-w-fit whitespace-nowrap h-10 flex items-center justify-center ${
                    selectedCategory?.id === category.id
                      ? "bg-slate-gray text-white"
                      : "bg-french-gray/30 text-slate-gray"
                  }`}
                >
                  {category.name}
                  {selectedCategory?.id === category.id && (
                    <span className="ml-1 text-white font-bold">×</span>
                  )}
                </button>
              ))}
            </>
          )}
        </div>
        {isLoadingProducts && isFirstRender.current ? (
          <div className="flex justify-center items-center w-full pt-6">
            <Loader className="mt-3" loaderType="component" />
          </div>
        ) : products.length <= 0 ? (
          <div className="flex justify-center items-center w-full pt-6">
            <EmptyBox type="search" />
          </div>
        ) : (
          <div className="w-full flex flex-col justify-between h-[calc(84%-3rem)] pt-2">
            <div className="grid grid-cols-2 gap-3 justify-start items-start w-full snap-y snap-mandatory overflow-y-auto scrollbar-hide">
              {Array.isArray(products) &&
                products.length > 0 &&
                products.map((product, index) => (
                  <button
                    className="snap-start flex flex-col justify-between items-center rounded-2xl w-full bg-white aspect-square row-span-1 col-span-1"
                    key={product.id}
                    ref={products.length === index + 1 ? lastProductRef : null}
                    onClick={() => handleSelectProduct(product)}
                  >
                    <div className="relative aspect-square w-full h-3/4">
                      <Image
                        className="rounded-t-2xl aspect-square"
                        src={product.image}
                        alt={`${product.name.toLowerCase()}.jpg`}
                        fill={true}
                        style={{ objectFit: "cover" }}
                      />
                      <div
                        className="absolute bottom-0 left-0 right-0 m-auto
                   w-[50px] h-[20px] bg-slate-gray rounded-t-[10px] flex justify-center items-center"
                      >
                        <span className="text-white text-[11px] leading-[14px] tracking-tight h-5 flex items-center">
                          {product.pricing === "WEIGHT" ? "kg" : "unid."}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-center items-stretch w-full border-t border-[#F6F6F6] h-1/4">
                      <span
                        className="flex justify-center items-center w-full
                  text-[12px] leading-[16px] tracking-tight text-slate-gray"
                      >
                        {product.name}
                      </span>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>
    </ModelPage>
  );
}
