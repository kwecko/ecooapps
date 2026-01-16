import { CatalogDTO } from "@shared/interfaces/dtos";
import Image from "next/image";
import Link from "next/link";
import { SlArrowRight } from "react-icons/sl";

export default function ProducerCard(catalog: CatalogDTO) {

	const setCatalogLocalStorage = () => {
		localStorage.setItem(catalog.id, JSON.stringify(catalog));
	};

  return (
    <Link onClick={setCatalogLocalStorage} href={`/produtor?data=${encodeURIComponent(JSON.stringify({ catalogId: catalog.id, title: catalog.name }))}`}>
      <div className="flex items-center justify-between h-25 bg-theme-background rounded-2xl m-2.5">
				<Image
					className="rounded-xl w-20 h-20 ml-2.5 mt-2.5 mb-2.5 mr-5"
					src={catalog.photo ?? "/produtor.jpg"}
					width={80}
					height={80}
					alt={`${catalog.name.toLowerCase()}.jpg`}
				/>
        <div className="mt-2 mb-2 flex-1">
          <span className="w-full text-left text-base text-theme-home-bg">
            {catalog.name}
          </span>
        </div>
        <div className="m-2">
            <SlArrowRight className="text-slate-gray" />        
        </div>
      </div>
    </Link>
  );
}
