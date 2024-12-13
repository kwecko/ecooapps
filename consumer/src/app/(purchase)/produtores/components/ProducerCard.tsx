import { CatalogDTO } from "@shared/interfaces/dtos";
import Image from "next/image";
import Link from "next/link";


export default function ProducerCard(catalog: CatalogDTO) {
  return (
    <Link href={`/produtor?data=${encodeURIComponent(JSON.stringify({ catalog: catalog, title: catalog.farm.name }))}`}>
      <div className="min-w-87.5 h-25 bg-theme-background flex rounded-2xl m-2.5">
        <div className="flex w-20 h-20 ml-2.5 mt-2.5 mb-2.5 mr-5 bg-theme-highlight rounded-xl">
          <Image
            src={catalog.farm.tally != "123456789" ? "/produtor.jpg" : "/produtor2.jpeg"}
            className="w-full h-full object-cover rounded-2.5"
            width={80}
            height={80}
            alt={`produtor.jpg`}
          />
        </div>
        <div className="grow flex flex-col items-center justify-center min-h-20 mt-2 mb-2">
          <span className="w-full text-left text-base text-theme-home-bg">
            {catalog.farm.name}
          </span>
        </div>
        <div className="flex min-w-24 min-h-20 items-center justify-center m-2">
          <Image src="/arrow.png" alt="arrow" width={10} height={7} />
        </div>
      </div>
    </Link>
  );
}
