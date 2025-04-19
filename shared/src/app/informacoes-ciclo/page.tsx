"use client";

import { ModelPage } from "@shared/components/ModelPage";
import CycleInfoMiniTable from "./components/CycleInfoMiniTable";
import Button from "@shared/components/Button";
import Link from "next/link";

export default function Home() {
	return (
		<ModelPage
			title="Informações do Ciclo"
			subtitle="No e-COO, cada Centro de Distribuição (CDD) tem seu próprio ciclo de funcionamento. Confira as definições do ciclo selecionado:"
			buttonArea={
				<Link href={"/"}>
					<Button
						className="w-full h-12 bg-theme-default rounded-md text-white font-semibold text-base leading-5.5"
					>
						Ok, entendi
					</Button>
				</Link>}
		>
			<CycleInfoMiniTable />
		</ModelPage>
	);
}