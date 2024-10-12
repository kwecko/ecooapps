"use client"

import ButtonV2 from "@shared/components/ButtonV2";
import { AiFillCheckCircle } from "react-icons/ai";
import { useLocalStorage } from "@shared/hooks/useLocalStorage"
import Link from "next/link";

export default function FourthStep() {
	const { deleteFromStorage } = useLocalStorage()

	return (
		<div className="w-full h-screen flex flex-col justify-between">
			<div className="flex flex-1 flex-col items-center justify-center gap-6">
				<AiFillCheckCircle className="w-28 h-28 text-rain-forest" />
				<h1 className="text-3xl text-slate-gray w-64 text-center font-medium leading-8">
					Conta criada com sucesso!
				</h1>
				<span className="text-sm text-center text-slate-gray font-medium w-64">
					O seu cadastro na e-COO foi concluído com sucesso.
				</span>
				<span className="text-sm text-center text-slate-gray font-medium w-64">
					Agora você pode adicionar informações de pagamento para a sua conta.
				</span>
			</div>
			<div className="w-full flex flex-col gap-4 mb-4">
				<Link href={'/login'}>
					<ButtonV2
						variant="default"
						className="mt-0 h-12 flex justify-center items-center"
						onClick={() => {
							deleteFromStorage('register-current-step');
						}}
						>
							Fazer login
					</ButtonV2>
				</Link>
			</div>
		</div>
	)
}