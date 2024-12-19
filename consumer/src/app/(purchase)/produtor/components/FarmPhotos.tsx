import Image, { ImageLoader } from "next/image";

const imageLoader: ImageLoader = ({ src }) => {
  return `https://res.cloudinary.com/dwm7zdljf/image/upload/v1706539060/products/256x256_${src}`;
};

export default function FarmPhotos(images: string[]) {
  return (
    <>
        {images && images.length !== 0
          ? images.map((image) => {
              return (
                <div className="w-full">
                    <Image
                    src={image}
                    width={100}
                    height={100}
                    alt={`${image}.jpg`}
                    />
                </div>
              );
            })
          :
          <div className="text-center">Não possui imagens</div>
          }
    </>
  );
}
