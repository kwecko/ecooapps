import { CatalogDTO } from "@shared/interfaces/dtos";
import Image, { ImageLoader } from "next/image";
import Link from "next/link";

const imageLoader: ImageLoader = ({ src }) => {
  return `https://res.cloudinary.com/dwm7zdljf/image/upload/v1706539060/products/256x256_${src}`;
};
export default function ProducerCard(catalog: CatalogDTO) {
  return (
    <Link href={`/produtor?data=${encodeURIComponent(JSON.stringify({ catalog: catalog, title: catalog.farm.name }))}`}>
      <div className="min-w-87.5 h-25 bg-theme-background flex rounded-2xl m-2.5">
        <div className="flex w-20 h-20 ml-2.5 mt-2.5 mb-2.5 mr-5 bg-theme-highlight rounded-xl">
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
