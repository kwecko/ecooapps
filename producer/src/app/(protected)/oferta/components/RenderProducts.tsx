"use client";

import { listProducts } from "@producer/_actions/products/GET/list-products";
import EmptyBox from "@shared/components/EmptyBox";
import Loader from "@shared/components/Loader";
import { ModelPage } from "@shared/components/ModelPage";
import { useHandleError } from "@shared/hooks/useHandleError";
import debounce from "lodash/debounce";
import Image, { ImageLoader } from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { toast } from "sonner";

import { ProductDTO } from "@shared/interfaces/dtos";
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

  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState<string>("");
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const observer = useRef<IntersectionObserver | null>(null);
  const { handleError } = useHandleError();

  const debouncedSetQuery = useRef(
    debounce((value: string) => {
      setQuery(value);
      setPage(1);
      setProducts([]);
    }, 300)
  ).current;

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSetQuery(e.target.value);
  };

  const debouncedLoadMore = useRef(
    debounce(() => {
      setPage((prev) => prev + 1);
    }, 300)
  ).current;

  const loadMore = useCallback(() => {
    debouncedLoadMore();
  }, [debouncedLoadMore]);

  useEffect(() => {
    let isCancelled = false;

    const fetchProducts = async () => {
      setIsLoading(true);

      await listProducts({
        product: query,
        page: page,
      })
        .then((response) => {
          if (response.message) {
            handleError(response.message as string);
          } else if (response.data) {
            if (!isCancelled) {
              const fetchedProducts: ProductDTO[] = response.data;

              setProducts((prevProducts) => {
                const allProducts =
                  page === 1
                    ? fetchedProducts
                    : [...prevProducts, ...fetchedProducts];
                const uniqueProducts = Array.from(
                  new Map(allProducts.map((item) => [item.id, item])).values()
                );
                return uniqueProducts;
              });
            }
          }
        })
        .catch(() => {
          if (!isCancelled) {
            toast.error("Erro desconhecido.");
          }
        })
        .finally(() => {
          if (!isCancelled) {
            setIsLoading(false);
          }
        });
    };
    fetchProducts();

    return () => {
      isCancelled = true;
    };
  }, [query, page]);

  const handleSelectProduct = (product: ProductDTO) => {
    setProduct(product);
    handleNextStep();
  };

  const imageLoader: ImageLoader = ({ src }) => {
    return `https://res.cloudinary.com/dwm7zdljf/image/upload/v1706539060/products/256x256_${src}`;
  };

  const lastProductRef = useCallback(
    (node: HTMLButtonElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadMore]
  );

  return (
    <ModelPage title={title} titleGap="gap-2" subtitle={subtitle}>
      <div className="w-full overflow-y-hidden flex flex-col pt-2">
        <div className="relative w-full h-12">
          <form>
            <input
              onChange={handleChangeInput}
              ref={inputRef}
              className="border border-french-gray rounded-md h-12 p-4 pr-10 text-base inter-font w-full"
              type="text"
            />
            <button type="submit">
              <HiOutlineSearch
                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                size={24}
              />
            </button>
          </form>
        </div>
        <div className="w-full flex flex-col justify-between h-[calc(100%-3rem)] pt-4">
          <div className="grid grid-cols-2 gap-3 justify-start items-start w-full snap-y snap-mandatory overflow-y-auto">
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
                      loader={imageLoader}
                      src={product.image}
                      alt={`${product.name.toLowerCase()}.jpg`}
                      quality={256}
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
          {isLoading && (
            <div className="mt-2 flex justify-center w-full col-span-2">
              <Loader className="mt-3" loaderType="component" />
            </div>
          )}
        </div>
      </div>
      {!isLoading && products.length === 0 ? (
        <div className="w-full flex-grow flex items-center justify-center">
          <EmptyBox type="search" />
        </div>
      ) : null}
    </ModelPage>
  );
}
