"use server";
import axios from "axios";
import { cookies } from "next/headers";

export async function generateReport(cycle_id: string) {
  try {
    const response = await axios.get(
      process.env.API_URL +
        "/deliveries/report?cycle_id=" +
        "520396ab-d1dc-4902-a621-f05fef96a5e1",
      {
        headers: {
          Authorization: `Bearer ${cookies().get("token")?.value}`,
        },
        responseType: "blob",
      }
    );

    return response.data;
  } catch (e) {
    console.error("Error generating report:", e);
  }
}
