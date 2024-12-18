import { useTransition } from "react";

export default function useDeleteProductModal() {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    startTransition( async () => {
      console.log(id);
    })
  }

  return {
    isPending,
    handleDelete
  }
}