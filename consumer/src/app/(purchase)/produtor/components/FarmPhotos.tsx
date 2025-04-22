import Image from "next/image";

export default function FarmPhotos(images: string[] | null) {
	return (
		<>
			{images && images.length !== 0
				? images.map((image) => {
					return (
						<div className="w-full">
							<Image
								src={image}
								width={0}
								height={0}
								sizes="100vw"
								className="w-full h-auto"
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
