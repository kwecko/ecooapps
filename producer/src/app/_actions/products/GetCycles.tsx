"use server";
import { cookies } from "next/headers";

export interface CycleData {
  id: string;
  alias: string;
  offering: number[];
  ordering: number[];
  dispatching: number[];
}

export async function GetCycles() {
  const token = cookies().get("token")?.value;

  if (token) {
    try {
      const response = await fetch(`${process.env.API_URL}/cycles`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const reply = await response.json();

      return {
        reply,
      };
    } catch (error: any) {
      console.error(error);
    }
  }
}