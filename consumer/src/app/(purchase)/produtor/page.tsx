"use client";

import RedirectCart from "@consumer/app/_components/telegram/redirect-cart";
import ModalV2 from "@shared/components/ModalV2";
import { CatalogDTO } from "@shared/interfaces/dtos";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { HiOutlinePhotograph, HiOutlineShoppingBag } from "react-icons/hi";
import FarmPhotos from "./components/FarmPhotos";
import { useLocalStorage } from "@shared/hooks/useLocalStorage";

export default function Produtor() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  const [showPhotos, setShowPhotos] = useState(false);

  const catalogId: string = data ? JSON.parse(decodeURIComponent(data as string)).catalogId : null;
	
	const LocalStorage = useLocalStorage();
	const cycleId = useMemo(() => LocalStorage.getFromStorage("cycle_id"),[]);

	const catalog: CatalogDTO = catalogId ? JSON.parse(localStorage.getItem(catalogId) as string) : null;

	useEffect(() => {
			return () => {
				if (catalogId) {
					localStorage.removeItem(catalogId);
				}
			};
		}, [catalogId]);
		
  return (
    <div className="flex flex-col h-full">
      <div className="bg-slate-gray h-36"></div>

      <div className="flex absolute top-36 left-5 font-poppins">
        <div className="w-25 h-25 z-10">
					<Image
						className="rounded-xl h-24 w-24"
						src={catalog.photo ?? "/produtor.jpg"}
						width={100}
						height={100}
						alt={`${catalog.name.toLowerCase()}.jpg`}
					/>
        </div>
        <div className="flex flex-col">
          <div className="pl-5 pt-10 text-xl text-white">
            {catalog.name}
          </div>
        </div>
      </div>

      <div className="flex ml-5 text-xs gap-4 mt-12">
        <button
          onClick={() => setShowPhotos(true)}
          className="flex items-center gap-2  w-36 h-10 bg-tertiary text-theme-primary font-bold rounded-md"
        >
          <HiOutlinePhotograph  className="ml-6 w-6 h-6 float-left mr-1" />
          <p>Ver Fotos</p>
        </button>
        <ModalV2
          children={FarmPhotos(catalog.images)}
          title={`Fotos ${catalog.name}`}
          className="flex flex-col w-full h-full overflow-y-auto"
          closeModal={() => setShowPhotos(false)}
          isOpen={showPhotos}
        />
        <Link
          href={`/ofertas-catalogo?data=${encodeURIComponent(
            JSON.stringify({
              id: catalog.id,
              cycle_id: cycleId,
              title: catalog.name,
            })
          )}`}
        >
          <button className="flex items-center gap-2 w-44 h-10 bg-theme-highlight text-white font-bold rounded-md">
            <HiOutlineShoppingBag className="ml-7 w-6 h-6 float-left mr-1" />
            <p>Ver Produtos</p>
          </button>
        </Link>
      </div>

      <div className="p-5 text-justify text-xs font-inter">
        {catalog.description}
      </div>

      <div className="min-h-17">
        <RedirectCart />
      </div>
    </div>
  );
}
