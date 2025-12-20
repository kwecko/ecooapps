"use server";

import axios from "axios";

interface ConversationIsActiveRequest {
	chatId: string;
}

export async function fetchConversationIsActive({
	chatId
}: ConversationIsActiveRequest): Promise<{ isActive: boolean }> {
	const response = await axios.get(`${process.env.API_CHAT_SERVER_URL}/conversations/active/${chatId}`, {
		headers: {
			"x-api-key": process.env.API_KEY_CHAT_SERVER
		}
	});

	return response.data;
}
