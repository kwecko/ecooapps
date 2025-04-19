import { CategoryDTO } from "@shared/interfaces/dtos";
import Image, { ImageLoader } from "next/image";
import Link from "next/link";
import { SlArrowRight } from "react-icons/sl";

const imageLoader: ImageLoader = ({ src }) => {
  return `${src}`;
};
export default function CategoryCard(category: CategoryDTO) {
  return (
    <Link
      href={`/ofertas-categoria?data=${encodeURIComponent(
        JSON.stringify({
          id: category.id,
          title: category.name,
        })
      )}`}
    >
      <div className="min-w-87.5 h-25 bg-theme-background flex rounded-2xl m-2.5">
        <div className="flex ml-2.5 mt-2.5 mb-2.5 mr-5 bg-theme-highlight rounded-2xl">
					<Image
						className="rounded-xl w-20 h-20"
						src={category.image ?? "category.jpg"}
						loader={imageLoader}
						width={80}
						height={80}
						alt={category.image ?? "category.jpg"}
					/>
        </div>
        <div className="grow flex flex-col items-center justify-center min-h-20 mt-2 mb-2">
          <span className="w-full text-left text-base text-theme-home-bg">
            {category.name}
          </span>
        </div>
        <div className="flex min-w-24 min-h-20 items-center justify-center m-2">
          <SlArrowRight className="text-slate-gray" />
        </div>
      </div>
    </Link>
  );
}
