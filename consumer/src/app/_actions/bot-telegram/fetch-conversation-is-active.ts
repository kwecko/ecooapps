"use server";

import axios from "axios";

interface ConversationIsActiveRequest {
	chatId: string;
}

export async function fetchConversationIsActive({
	chatId
}: ConversationIsActiveRequest): Promise<{ isActive: boolean }> {
	console.log("process.env.BOT_TELEGRAM_URL", process.env.BOT_TELEGRAM_URL);	
	const response = await axios.get(`${process.env.BOT_TELEGRAM_URL}/chat/conversation/isActive/${chatId}`);

	console.log("response.data", response.data);
	return response.data;
}
