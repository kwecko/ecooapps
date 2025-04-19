import { useDebounce } from "@shared/hooks/useDebounce";
import { useSearchParams } from "next/navigation";

export default function usePageQueryParams() {
  const searchParams = useSearchParams();

  const p = searchParams.get("p");
  const page = (p && parseInt(p)) || 1;

  const q = searchParams.get("q") ?? "";
  const query = useDebounce(q, 500);

  return { page, query };
}
