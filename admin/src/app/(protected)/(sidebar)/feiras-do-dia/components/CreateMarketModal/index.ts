"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useHandleError } from "@shared/hooks/useHandleError";
import { registerMarket } from "@admin/_actions/markets/POST/register-market";

const marketSchema = z.object({
  name: z.string().min(1, "O nome da feira é obrigatório"),
  description: z.string().max(200, "A descrição deve ter no máximo 200 caracteres").optional(),
});

export type MarketSchema = z.infer<typeof marketSchema>;

interface UseCreateMarketModalProps {
  closeModal: () => void;
}

export default function useCreateMarketModal({ closeModal }: UseCreateMarketModalProps) {
  const [isPending, startTransition] = useTransition();
  const { handleError } = useHandleError();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MarketSchema>({
    resolver: zodResolver(marketSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = ({ name, description }: MarketSchema) => {
    startTransition(async () => {
      registerMarket({ name, description: description || undefined })
        .then((response) => {
          if (response.message) return handleError(response.message);

          toast.success("Feira criada com sucesso!");
          closeModal();
          reset();
          // Redirecionar para o painel da feira
          router.push("/feiras-do-dia/painel");
        })
        .catch(() => {
          toast.error("Erro desconhecido.");
        });
    });
  };

  return {
    register,
    handleSubmit,
    errors,
    isPending,
    onSubmit,
  };
}

