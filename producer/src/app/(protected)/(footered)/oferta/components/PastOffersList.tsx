"use client";

import { listOffers } from "@producer/app/_actions/offers/list-offers";
import Loader from "@shared/components/Loader";
import { OfferWithProductDTO } from "@shared/domain/dtos/offer-with-product-dto";
import { useHandleError } from "@shared/hooks/useHandleError";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CycleSelector, { CycleData } from "./CycleSelector";
import OfferCard from "./OfferCard";

export default function OffersList() {
	const [offers, setOffers] = useState<OfferWithProductDTO[] | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [cycle, setCycle] = useState<CycleData | null>(null);

	const { handleError } = useHandleError();

	useEffect(() => {
		if (!cycle) {
		setOffers(null);
		toast.error("Selecione um ciclo para ver os pedidos!");
		setIsLoading(false);
		return;
		}

		const fetchListOffers = async () => {
			setIsLoading(true);

			try {
				const { id } = cycle;

				const response = await listOffers({
						cycle_id: id as string,
				});

				if (response.message) {
						handleError(response.message as string);
						setOffers(null);
				} else if (response.data) {
						const dataOffers: OfferWithProductDTO[] = response.data;
						setOffers(dataOffers);
				} else {
						setOffers([]);
				}
			} catch {
				handleError("Erro desconhecido.");
				setOffers(null);
			} finally {
				setIsLoading(false);
			}
		};

		fetchListOffers();
	}, [cycle, handleError]);

	return (
		<>
			<CycleSelector cycle={cycle} setCycle={setCycle} />
			<div className="flex flex-col gap-2 w-full m-0 h-[calc(80px*3+0.5rem*3)] overflow-y-scroll snap-y snap-mandatory">
				{isLoading ? (
					<div className="w-full h-20 flex items-center justify-center">
						<Loader 
							appId="PRODUCER"
							loaderType="component"
						/>
					</div>
				) : (
					<div className="m-0 w-full rounded-2xl p-2.5">
							{offers && offers.length > 0 ? (
								offers.map((offer) => (
									<OfferCard key={offer.id} offer={offer} />
								))
							) : (
								<p className="text-center text-gray-500">Nenhum dado disponível para este ciclo.</p>
							)}
					</div>
				)}
			</div>
		</>
	);
}
