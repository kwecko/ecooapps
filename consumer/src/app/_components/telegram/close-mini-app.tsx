"use client";

import { useTelegram } from "@consumer/context/telegram";
import { useEffect } from "react";

export default function CloseMiniApp() {
	const tg = useTelegram();

	useEffect(() => {

		tg.MainButton.setParams({
			text: "Fechar",
			color: "#545F71",
		});

		tg.MainButton.show();

		tg.onEvent("mainButtonClicked", async () => await tg.sendData(JSON.stringify([])));

		return () => {
			tg.offEvent("mainButtonClicked", async () => await tg.sendData(JSON.stringify([])));
		};

	}, [tg])

	return <>
	</>;
}