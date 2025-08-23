"use client";

import CloseMiniApp from "@consumer/app/_components/telegram/close-mini-app";
import { useTelegram } from "@consumer/context/telegram";
import { listCycles } from "@shared/_actions/cycles/GET/list-cycles";
import ModalV2 from "@shared/components/ModalV2";
import { useHandleError } from "@shared/hooks/useHandleError";
import { useLocalStorage } from "@shared/hooks/useLocalStorage";
import { CycleDTO } from "@shared/interfaces/dtos";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import { useSearchParams } from "next/navigation";
import RedirectCart from "../../_components/telegram/redirect-cart";
import ModalBlock from "./components/modal-block";
import { fetchConversationIsActive } from "@consumer/app/_actions/bot-telegram/fetch-conversation-is-active";


export default function Inicio() {

	const LocalStorage = useLocalStorage();
	const { handleError } = useHandleError();
	const [showBlock, setShowBlock] = useState(false);
	const [chatId, setChatId] = useState<string | undefined>(undefined);
	const [showExpiredModal, setShowExpiredModal] = useState(false);
	const [loading, setLoading] = useState(true);
	const [daysWeekOrder, setDaysWeekOrder] = useState([] as string[]);
	const tg = useTelegram();
	const searchParams = useSearchParams();
	

	const mapDaysWeek: Record<number, string> = {
		1: "Domingo",
		2: "Segunda-feira",
		3: "Terça-feira",
		4: "Quarta-feira",
		5: "Quinta-feira",
		6: "Sexta-feira",
		7: "Sábado"
	};

	useEffect(() => {
		(async () => {
			try {
				// Obter chatId dos parâmetros da URL
				const chatIdFromUrl = searchParams.get('chatId');
				
				if (chatIdFromUrl) {
					setChatId(chatIdFromUrl);
					
					try {
						const conversationResponse = await fetchConversationIsActive({ chatId: chatIdFromUrl });
						
						console.log("conversationResponse", conversationResponse);
						if (!conversationResponse.isActive) {
							setShowExpiredModal(true);
							// Fechar o mini app após 5 segundos
							setTimeout(() => {
								tg.sendData(JSON.stringify([]));
							}, 5000);
							return;
						}
					} catch (error) {
						console.error("Erro ao verificar conversa:", error);
						// Se houver erro na verificação, continua normalmente
					}
				}

				const response = await listCycles();
				if (response.message) {
					handleError(response.message as string);
				} else if (response.data) {
					const cycles: CycleDTO[] = response.data;

					const aliasCycle = (process.env.NEXT_PUBLIC_ENV && process.env.NEXT_PUBLIC_ENV === "dev") ? "livre" : "semanal";
					const selectedCycle = cycles.find((cycle) => cycle.alias.toLowerCase() === aliasCycle);

					if (!selectedCycle)
						return handleError("Ciclo não encontrado.");

					const dayWeek = new Date().getDay() + 1;
					if (!selectedCycle.order.includes(dayWeek)) {
						setShowBlock(true);
						const daysWeekOrder = selectedCycle.order.map((dayNumber) => mapDaysWeek[dayNumber]);
						setDaysWeekOrder(daysWeekOrder);
					}

					LocalStorage.setInStorage("cycle_id", selectedCycle.id as string);
				}
			} catch {
				handleError("Erro desconhecido.");
			} finally {
				setLoading(false)
			}
		})();
	}, [searchParams]);

	const onCloseModal = async () => { 
			await tg.sendData(JSON.stringify([]));
	}

	if(loading)
		return (<div className="text-center">Carregando...</div>)
	
	return (
		<>
			<div className="flex flex-col w-full h-screen">
				<h1 className="text-2xl font-bold mb-4">Chat id: {chatId}</h1>
				<h2 className="text-xl font-bold mb-4">Conversa Ativa: {showExpiredModal}</h2>
				<div className="h-screen scroll-smooth">

					<Link href={"/categorias"}>
						<div className="min-w-87.5 h-25 bg-theme-background flex rounded-2xl m-2.5">
							<div className="flex w-20 h-20 ml-2.5 mt-2.5 mb-2.5 mr-5 bg-theme-highlight rounded-xl">
								<Image
									className="rounded-xl"
									src={"/categorias.jpg"}
									width={80}
									height={80}
									alt={`categorias.jpg`}
								/>
							</div>
							<div className="grow flex flex-col items-center justify-center min-h-20 mt-2 mb-2">
								<span className="w-full text-left text-base">
									Categorias
								</span>
							</div>
							<div className="flex min-w-24 min-h-20 items-center justify-center m-2">
								<SlArrowRight className="text-slate-gray" />
							</div>
						</div>
					</Link>

					<Link href={"/produtores"}>
						<div className="min-w-87.5 h-25 bg-theme-background flex rounded-2xl m-2.5">
							<div className="flex w-20 h-20 ml-2.5 mt-2.5 mb-2.5 mr-5 bg-theme-highlight rounded-xl">
								<Image
									className="rounded-xl"
									src={"/produtores.jpg"}
									width={80}
									height={80}
									alt={`produtores.jpg`}
								/>
							</div>
							<div className="grow flex flex-col items-center justify-center min-h-20 mt-2 mb-2">
								<span className="w-full text-left text-base">
									Produtores
								</span>
							</div>
							<div className="flex min-w-24 min-h-20 items-center justify-center m-2">
								<SlArrowRight className="text-slate-gray" />
							</div>
						</div>
					</Link>

					<Link
						href={`/ofertas?data=${encodeURIComponent(
							JSON.stringify({
								title: 'Todas os produtos',
							})
						)}`}>
						<div className="min-w-87.5 h-25 bg-theme-background flex rounded-2xl m-2.5">
							<div className="flex w-20 h-20 ml-2.5 mt-2.5 mb-2.5 mr-5 bg-theme-highlight rounded-xl">
								<Image
									className="rounded-xl"
									src={"/todos_produtos.jpg"}
									width={80}
									height={80}
									alt={`produtores.jpg`}
								/>
							</div>
							<div className="grow flex flex-col items-center justify-center min-h-20 mt-2 mb-2">
								<span className="w-full text-left text-base">
									Todos os Produtos
								</span>
							</div>
							<div className="flex min-w-24 min-h-20 items-center justify-center m-2">
								<SlArrowRight className="text-slate-gray" />
							</div>
						</div>
					</Link>
				</div>
			</div>

			<ModalV2
					title="Informativo"
          children={ModalBlock(daysWeekOrder)}
					iconClose={true}
					className="m-1.5"
          closeModal={onCloseModal}
          isOpen={showBlock}
        />

			<ModalV2
					title="Conversa Expirada"
          children={
						<div className="p-4 text-center">
							<p className="text-sm text-gray-700">
								A conversa foi expirada por motivos de segurança. O mini app será fechado e a conversa será reiniciada!
							</p>
						</div>
					}
					iconClose={false}
					className="m-1.5"
          closeModal={() => {}}
          isOpen={showExpiredModal}
        />

			{ !showBlock && !showExpiredModal ? <RedirectCart /> : <CloseMiniApp /> }

		</>
	);
}
