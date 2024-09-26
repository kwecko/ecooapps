"use server"

import axios, { AxiosError } from "axios";

import { cookies } from "next/headers";

interface IGetBoxesProps {
  cycle_id: string;
  page: number;
}

export async function getBoxes({ cycle_id, page }: IGetBoxesProps) {
  try {
    const { data } = await axios.get('http://localhost:3333/boxes', {
      headers: {
        Authorization: `Bearer ${cookies().get("token")?.value}`
      },
      params: {
        cycle_id,
        page
      }
    });

    return data
  } catch (error: any) {
    console.log(error?.response.data)
  }
}