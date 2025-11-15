"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useHandleError } from "@shared/hooks/useHandleError";
import { registerMarket } from "@admin/_actions/markets/POST/register-market";
import { listCycles } from "@admin/_actions/cycles/GET/list-cycles";
import { CycleDTO } from "@shared/interfaces/dtos";

const marketSchema = z.object({
  name: z.string().min(1, "O nome da feira é obrigatório"),
  description: z.string().max(200, "A descrição deve ter no máximo 200 caracteres").optional(),
  cycle_id: z
    .union([z.string().uuid("Selecione um ciclo válido"), z.literal("")])
    .optional()
    .transform((val) => (val === "" ? undefined : val)),
});

export type MarketSchema = z.infer<typeof marketSchema>;

interface UseCreateMarketModalProps {
  closeModal: () => void;
}

export default function useCreateMarketModal({ closeModal }: UseCreateMarketModalProps) {
  const [isPending, startTransition] = useTransition();
  const { handleError } = useHandleError();
  const router = useRouter();
  const [cycles, setCycles] = useState<CycleDTO[]>([]);
  const [cycleOptions, setCycleOptions] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    (async () => {
      const response = await listCycles();
      if (response.message) {
        return;
      }
      setCycles(response.data);
      const options = [
        { value: "", label: "Não importar estoque" },
        ...response.data.map((cycle: CycleDTO) => ({
          value: cycle.id,
          label: `Ciclo ${cycle.alias}`,
        })),
      ];
      setCycleOptions(options);
    })();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<MarketSchema>({
    resolver: zodResolver(marketSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      description: "",
      cycle_id: "",
    },
  });

  const onSubmit = ({ name, description, cycle_id }: MarketSchema) => {
    startTransition(async () => {
      try {
        const response = await registerMarket({ 
          name, 
          description: description || undefined,
          cycle_id: cycle_id || undefined,
        });

        if (response.message) {
          handleError(response.message);
          return;
        }

        toast.success("Feira criada com sucesso!");
        closeModal();
        reset();

        if (response.data?.id) {
          router.push(`/feiras-do-dia/${response.data.id}/painel`);
        } else {
          router.push("/feiras-do-dia");
        }
      } catch (error) {
        toast.error("Erro desconhecido.");
      }
    });
  };

  return {
    register,
    handleSubmit,
    errors,
    isPending,
    onSubmit,
    cycleOptions,
    setValue,
  };
}

