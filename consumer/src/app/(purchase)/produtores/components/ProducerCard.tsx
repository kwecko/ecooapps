import { CatalogDTO } from "@shared/interfaces/dtos";
import Image from "next/image";
import Link from "next/link";
import { SlArrowRight } from "react-icons/sl";

export default function ProducerCard(catalog: CatalogDTO) {
  return (
    <Link href={`/produtor?data=${encodeURIComponent(JSON.stringify({ catalog: catalog, title: catalog.farm.name }))}`}>
      <div className="min-w-87.5 h-25 bg-theme-background flex rounded-2xl m-2.5">
        <div className="flex ml-2.5 mt-2.5 mb-2.5 mr-5 bg-theme-highlight rounded-2xl">
					<Image
						className="rounded-xl w-20 h-20"
						src={catalog.farm.photo ?? "/produtor.jpg"}
						width={80}
						height={80}
						alt={`${catalog.farm.name.toLowerCase()}.jpg`}
					/>
        </div>
        <div className="grow flex flex-col items-center justify-center min-h-20 mt-2 mb-2">
          <span className="w-full text-left text-base text-theme-home-bg">
            {catalog.farm.name}
          </span>
        </div>
        <div className="flex min-w-24 min-h-20 items-center justify-center m-2">
            <SlArrowRight className="text-slate-gray" />        
        </div>
      </div>
    </Link>
  );
}
