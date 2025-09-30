"use client";

import { useState, useEffect } from "react";

import { set, useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { listWarehouse } from "@admin/_actions/warehouse/GET/list-warehouse";

import TextInput from "@shared/components/TextInput"

export default function ListWarehouseInfo() {

  const warehouseInfoFormSchema = z.object({
    unit: z.string().min(1, { message: "Título é obrigatório" }),
    responsible: z.string().min(1, { message: "Responsável é obrigatório" }),
    cnpj: z.string().min(1, { message: "CNPJ é obrigatório" }),
    cep: z.string().min(1, { message: "CEP é obrigatório" }),
    street: z.string().min(1, { message: "Logradouro é obrigatório" }),
    number: z.string().min(1, { message: "Número é obrigatório" }),
    complement: z.string().optional(),
  });

  const [data, setData] = useState<any>({} as any);

  type WarehouseInfoFormSchema = z.infer<typeof warehouseInfoFormSchema>;

  useEffect(() => {
    (async () => {
      const response = await listWarehouse();
      if (response.message) {
        console.error(response.message);
        return;
      }
      setData(response.data);
      console.log(response.data);
    }
    )();
  }, []);

  const {
    register,
    formState: { errors },
  } = useForm<WarehouseInfoFormSchema>({
    resolver: zodResolver(warehouseInfoFormSchema),
    mode: "onChange",
  });

  return (
  <div className="mt-10 w-full h-full flex gap-15 rounded-lg">
    <div className="w-1/2 gap-7 flex flex-col">
      <div className="flex flex-col gap-2 border border-steel-shadow rounded-lg p-4">
        <span className="font-semibold mb-2">Informações da unidade</span>
        
        <TextInput
          name="message"
          label="Nome da unidade*"
          className="overflow-hidden"
          defaultValue={data?.name || ""}
          maxLength={100}
          register={register("unit")}
          errorMessage={errors.unit?.message}
        />
        <TextInput
          name="responsible"
          label="Responsável*"
          className="overflow-hidden"
          defaultValue={data?.manager || ""}
          maxLength={100}
          register={register("responsible")}
          errorMessage={errors.responsible?.message}
        />
        <TextInput
          name="cnpj"
          label="CNPJ*"
          className="overflow-hidden"
          defaultValue={data?.cnpj || ""}
          maxLength={100}
          register={register("cnpj")}
          errorMessage={errors.cnpj?.message}
        />
      </div>
      <div className="flex flex-col gap-2 border border-steel-shadow rounded-lg p-4">
        <span className="font-semibold mb-2">Endereço da unidade</span>
        
        <TextInput
          name="cep"
          label="CEP*"
          className="overflow-hidden"
          defaultValue={data?.cep || ""}
          maxLength={100}
          register={register("cep")}
          errorMessage={errors.cep?.message}
        />
        <TextInput
          name="street"
          label="Logradouro*"
          className="overflow-hidden"
          defaultValue={data?.street || ""}
          maxLength={100}
          register={register("street")}
          errorMessage={errors.street?.message}
        />
        <div className="flex gap-4">
          <div className="w-[30%]">
            <TextInput
              name="number"
              label="Número*"
              className="overflow-hidden"
              defaultValue={data?.number || ""}
              maxLength={100}
              register={register("number")}
              errorMessage={errors.number?.message}
            />
          </div>
          <div className="w-[70%]">
            <TextInput
              name="complement"
              label="Complemento*"
              className="overflow-hidden"
              defaultValue={data?.complement || ""}
              maxLength={100}
              register={register("complement")}
            />
          </div>
        </div>
      </div>
    </div>
      
    <div className="w-1/2 p-4 border border-theme-default rounded-lg">
      aa
    </div>
  </div>
)
}