"use client";

import RedirectCart from "@consumer/app/_components/redirectCart";
import ModalV2 from "@shared/components/ModalV2";
import Image, { ImageLoader } from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import FarmPhotos from "./components/FarmPhotos";
import { CatalogDTO } from "@shared/interfaces/dtos";
import { HiOutlinePhotograph, HiOutlineShoppingBag } from "react-icons/hi";

export default function Produtor() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  const [showPhotos, setShowPhotos] = useState(false);

  const catalog: CatalogDTO = data
    ? JSON.parse(decodeURIComponent(data as string)).catalog
    : null;

  const imageLoader: ImageLoader = ({ src }) => {
    return `${src}`;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-slate-gray h-36"></div>

      <div className="flex absolute top-36 left-5 font-poppins">
        <div className="w-25 h-25 z-10">
          {catalog.farm.admin.photo ? (
            <Image
              className="rounded-xl h-24 w-24"
              loader={imageLoader}
              src={catalog.farm.admin.photo}
              width={100}
              height={100}
              alt={`${catalog.farm.name.toLowerCase()}.jpg`}
            />
          ) : (
            <Image
              className="rounded-xl h-24 w-24"
              src={
                catalog.farm.tally != "123456789"
                  ? "/produtor.jpg"
                  : "/produtor2.jpeg"
              }
              width={100}
              height={100}
              alt="produtor.jpg"
            />
          )}
        </div>
        <div className="flex flex-col">
          <div className="pl-5 pt-10 text-xl text-white">
            {catalog.farm.name}
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
          children={FarmPhotos([])}
          title={`Fotos ${catalog.farm.name}`}
          className="flex flex-col w-full h-full overflow-y-auto"
          closeModal={() => setShowPhotos(false)}
          isOpen={showPhotos}
        />
        <Link
          href={`/ofertas?data=${encodeURIComponent(
            JSON.stringify({
              id: catalog.id,
              cycle_id: catalog.cycle_id,
              title: catalog.farm.name,
            })
          )}`}
        >
          <button className="flex items-center gap-2 w-44 h-10 bg-theme-highlight text-white font-bold rounded-md">
            <HiOutlineShoppingBag className="ml-7 w-6 h-6 float-left mr-1" />
            <p>Ver Produtos</p>
          </button>
        </Link>
      </div>

      <div className="p-5 text-left text-xs font-inter">
        {catalog.farm.description}
      </div>

      <div className="min-h-17">
        <RedirectCart />
      </div>
    </div>
  );
}
