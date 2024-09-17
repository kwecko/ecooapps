"use client";

import {
  GetProducts,
} from "@producer/app/_actions/products/GetProducts";
import Image, { ImageLoader } from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState, useCallback } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { debounce } from "lodash";
import Loader from "@shared/components/Loader";
import { toast } from "sonner";
import { ProductDTO } from "@shared/domain/dtos/product-dto";

export interface RenderProductsProps {
  // setProductId is a state setter function coming from the parent component
  setProductId: (id: string) => void;
  setProductName: (name: string) => void;
  setPricing: (pricing: "WEIGHT" | "UNIT") => void;
  handleNextStep: () => void;
}

export default function RenderProducts({ setProductId, setProductName, setPricing, handleNextStep }: RenderProductsProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState<string>("");
  const [products, setProducts] = useState<ProductDTO[]>([] as ProductDTO[]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const observer = useRef<IntersectionObserver | null>(null);

  const loadMore = useCallback(
    debounce(() => {
      setPage((prev) => prev + 1);
    }, 300),
    []
  );

  const handleChangeInput = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
      setPage(1);
      setProducts([]);
    }, 300),
    []
  );

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const product = await GetProducts({ product: query, page: page });
        if (isMounted) {
          setProducts((prevProducts) =>
            page === 1 ? product?.data : [...prevProducts, ...product?.data]
          );
        }
      } catch (error) {
        if (isMounted) {
          toast(String(error));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [query, page]);

  const handleSelectProduct = ({ ...product }: ProductDTO) => {
    setProductId(product.id);
    setProductName(product.name);
    setPricing(product.pricing);
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
    <div className="w-full h-[100%] pt-8">
      <div className="relative w-full h-[3rem]">
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
      <div className="w-full flex flex-col justify-between overflow-y-scroll h-[calc(100%-3rem)]">
        <div className="grid grid-cols-2 justify-items-start gap-3 w-full mt-4 p-4">
          {Array.isArray(products as ProductDTO[]) && products.length > 0
            ? products.map((product, index) => (
              <button
                className="flex flex-col items-center rounded-2xl w-full h-[160px] p-2.5 bg-white"
                key={product.id}
                ref={products.length === index + 1 ? lastProductRef : null}
                onClick={() =>
                  handleSelectProduct(
                    product as ProductDTO
                  )
                }
              >
                <div className="relative w-full min-w-[130px] h-[100px] rounded-[10px]">
                  <Image
                    className="rounded-[10px]"
                    loader={imageLoader}
                    src={product.image}
                    alt={`${product.name.toLowerCase()}.jpg`}
                    quality={256}
                    fill={true}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 256px"
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <span className="pt-2.5 text-base leading-[22px] tracking-tight text-slate-gray">
                  {product.name}
                </span>
              </button>
            ))
            : !isLoading && (
              <p className="text-center text-slate-gray col-span-2 w-full">
                Nenhum produto encontrado.
              </p>
            )}
        </div>
        {isLoading && (
          <div className="mt-2 flex justify-center w-full col-span-2">
            <Loader
              className="mt-3" 
              appId="PRODUCER"
              loaderType="component"
            />{" "}
          </div>
        )}
      </div>
    </div>
  );
}
