"use server";

import axios from "axios";

interface CreateLog {
	chatId: string;
	action: string;
	description?: string;
}

export async function createLog(createLog: CreateLog): Promise<void> {
	await axios.post(`${process.env.API_CHAT_SERVER_URL}/log`, createLog);
}
