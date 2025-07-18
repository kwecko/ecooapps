import CloseMiniApp from "@consumer/app/_components/telegram/close-mini-app";

export default function ModalBlock(daysWeekOrder: string[]) {
	return (
		<>
			<div className="w-full text-center text-sm">
				<p>Compras indisponíveis no momento. Hoje não é um dos dias abertos para realizar compras na plataforma.</p>
				{daysWeekOrder.length > 0 &&
					(<p>Volte em um dos dias disponíveis: {daysWeekOrder.join(", ")}.</p>)
				}
			</div>
		</>
	);
}
