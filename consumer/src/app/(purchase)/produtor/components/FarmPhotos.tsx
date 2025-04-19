import Image, { ImageLoader } from "next/image";

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
