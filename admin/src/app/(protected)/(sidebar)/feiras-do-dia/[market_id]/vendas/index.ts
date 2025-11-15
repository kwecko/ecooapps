"use client";

import { useParams } from "next/navigation";

export default function useVendasPage() {
  const params = useParams();
  const market_id = params?.market_id as string;

  return {
    market_id,
  };
}

