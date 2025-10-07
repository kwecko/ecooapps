"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineReceiptTax, HiOutlineShoppingCart, HiOutlineTruck } from "react-icons/hi";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { listWarehouse } from "@admin/_actions/warehouse/GET/list-warehouse";
import { updateWarehouse } from "@admin/_actions/warehouse/PATCH/update-warehouse";
import { states } from "@admin/app/(protected)/(sidebar)/configuracoes/data/states";
import { listCycles } from "@admin/_actions/cycles/GET/list-cycles";
import { warehouseInfoFormSchema } from "@admin/app/(protected)/(sidebar)/configuracoes/data/warehouseInfoFormSchema";

import TextInput from "@shared/components/TextInput"
import SelectInput from "@shared/components/SelectInput";
import ButtonV2 from "@shared/components/ButtonV2";
import Copyright from "@admin/app/components/Copyright";
import { toast } from "sonner";

export default function ListWarehouseInfo() {

  type WarehouseInfoFormSchema = z.infer<typeof warehouseInfoFormSchema>;

  const [formData, setFormData] = useState<WarehouseInfoFormSchema | null>(null);
  const [cycles, setCycles] = useState<any>({} as any);

  useEffect(() => {
    (async () => {
      const response = await listWarehouse();
      if (response.message) {
        console.error(response.message);
        return;
      }
      setFormData(response.data);
      reset(response.data);
    }
    )();
    (async () => {
      const response = await listCycles();
      if (response.message) {
      return;
      }
      const weeklyCycle = response.data.find((cycle: any) => cycle.alias === "Semanal");
      setCycles(weeklyCycle);
    }
    )();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WarehouseInfoFormSchema>({
    resolver: zodResolver(warehouseInfoFormSchema),
    mode: "onChange",
  });

  const handleSubmitForm = async (data: WarehouseInfoFormSchema) => {

    if (Array.isArray(data.socials)) {
      data.socials = data.socials.filter(
        (item: { platform?: string; value?: string }) =>
          typeof item.platform === "string" &&
          item.platform.trim() !== "" &&
          item.platform !== null &&
          item.platform !== undefined &&
          typeof item.value === "string" &&
          item.value.trim() !== "" &&
          item.value !== null &&
          item.value !== undefined
      );
    }
    setFormData(data);
    const success = await updateWarehouse(data);
    console.log(success);
    if (success) {
      setFormData(null);
      reset();
      toast.success("Configurações do armazém enviada com sucesso!");
      window.location.reload();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)} className="w-full flex justify-center mb-10">
      <div className="mt-10 w-full h-full flex gap-15">
        <div className="w-1/2 gap-7 flex flex-col">
          <div className="flex flex-col gap-2 border border-steel-shadow rounded-lg p-4">
            <span className="font-semibold mb-2">Informações da unidade</span>
            <TextInput
              name="name"
              label="Nome da unidade*"
              className="overflow-hidden"
              maxLength={100}
              register={register("name")}
            />
            
            <TextInput
              name="manager"
              label="Responsável*"
              className="overflow-hidden"
              maxLength={100}
              register={register("manager")}
              errorMessage={errors.manager?.message}
            />
            <TextInput
              name="cnpj"
              label="CNPJ*"
              className="overflow-hidden"
              maxLength={100}
              register={register("CNPJ")}
              errorMessage={errors.CNPJ?.message}
            />
          </div>
          <div className="flex flex-col gap-2 border border-steel-shadow rounded-lg p-4">
            <span className="font-semibold mb-2">Endereço da unidade</span>
            
            <TextInput
              name="cep"
              label="CEP*"
              placeholder="00000-000"
              className="overflow-hidden"
              maxLength={9}
              register={register("address.CEP")}
              errorMessage={errors.address?.CEP?.message}
            />
            <TextInput
              name="street"
              label="Logradouro*"
              placeholder="Logradouro"
              className="overflow-hidden"
              maxLength={100}
              register={register("address.street")}
              errorMessage={errors.address?.street?.message}
            />
            <div className="flex gap-4">
              <div className="w-[30%]">
                <TextInput
                  name="number"
                  label="Número*"
                  placeholder="Número"
                  className="overflow-hidden"
                  maxLength={100}
                  register={register("address.number")}
                  errorMessage={errors.address?.number?.message}
                />
              </div>
              <div className="w-[70%]">
                <TextInput
                  name="complement"
                  label="Complemento"
                  placeholder="Complemento"
                  className="overflow-hidden"
                  maxLength={100}
                  register={register("address.complement")}
                />
              </div>
            </div>
            <TextInput
              name="neighborhood"
              label="Bairro*"
              placeholder="Bairro"
              className="overflow-hidden"
              maxLength={100}
              register={register("address.neighborhood")}
              errorMessage={errors.address?.neighborhood?.message}
            />
            <div className="flex gap-4">
              <div className="w-[70%]">
                <TextInput
                  name="city"
                  label="Cidade*"
                  placeholder="Cidade"
                  className="overflow-hidden"
                  maxLength={100}
                  register={register("address.city")}
                  errorMessage={errors.address?.city?.message}
                />
              </div>
              <div className="w-[30%]">
                <SelectInput
                  label="Estado*"
                  defaultOption={states.find((state) => state.value === formData?.address.state) || undefined}
                  options={states}
                  register={register("address.state")}
                  errorMessage={errors.address?.state?.message}
                  className="pt-0"
                />
              </div>
            </div>            
            <TextInput
              name="link"
              label="Google Maps (Link da localização)"
              className="overflow-hidden"
              maxLength={200}
              register={register("address.link")}
            />
          </div>
          <div className="flex flex-col gap-2 border border-steel-shadow rounded-lg p-4">
            <span className="font-semibold mb-2">Área de cobertura das entregas</span>
            <span className="text-sm text-steel-shadow font-inter mb-3"> Insira apenas os 3 primeiros dígitos de cada CEP da área de cobertura, separando-os por vírgulas.</span>
            <TextInput
              name="ceps"
              label="CEPs*"
              className="overflow-hidden"
              placeholder="000, 000, 000"
              maxLength={200}
              register={register("coverage", {
                setValueAs: (value: string) => [value ?? ""],
              })}
              errorMessage={errors.coverage?.message}
            />
          </div>
          <div className="flex gap-6 mt-4">
            <ButtonV2
              type="submit"
              variant="default"
              className="w-full justify-center bg-rain-forest"
            >
              Salvar
            </ButtonV2>
          </div>
          <div className="mt-6 mb-6">
            <Copyright type="primary" />
          </div>
        </div>
        <div className="w-1/2 gap-7 flex flex-col">
          <div className="flex flex-col gap-2 border border-steel-shadow rounded-lg p-4">
            <span className="font-semibold mb-2">Contato</span>

            <TextInput
              name="email"
              label="Email*"
              placeholder="contato@ecoo.org.br"
              className="overflow-hidden"
              maxLength={100}
              register={register("email")}
              errorMessage={errors.email?.message}
            />

            <div className="flex gap-5">
              <div className="w-[50%]">
                <TextInput
                  name="telegram"
                  label="Telegram"
                  placeholder="https://telegram.me/nomeusuario"
                  className="overflow-hidden"
                  maxLength={100}
                  register={register("socials.0.value")}
                />
                <input 
                  type="hidden" 
                  {...register("socials.0.platform")} 
                  value="telegram" 
                />
              </div>
              <div className="w-[50%]">
                <TextInput
                  name="instagram"
                  label="Instagram"
                  placeholder="https://instagram.com/nomeusuario"
                  className="overflow-hidden"
                  maxLength={100}
                  register={register("socials.1.value")}
                />
                <input 
                  type="hidden" 
                  {...register("socials.1.platform")} 
                  value="instagram" 
                />
              </div>
            </div>
            <div className="flex gap-5">
              <div className="w-[50%]">
                <TextInput
                  name="whatsapp"
                  label="WhatsApp"
                  placeholder="(99) 9 9999-9999"
                  className="overflow-hidden"
                  maxLength={100}
                  register={register("socials.2.value")}
                />
                <input 
                  type="hidden" 
                  {...register("socials.2.platform")} 
                  value="whatsapp" 
                />
              </div>
              <div className="w-[50%]">
                <TextInput
                  name="telefone"
                  label="Telefone"
                  placeholder="(99) 9 9999-9999"
                  className="overflow-hidden"
                  maxLength={100}
                  register={register("phone")}
                />
              </div>
            </div>
            <div className="flex gap-5">
              <div className="w-[50%]">
                <TextInput
                  name="facebook"
                  label="Facebook"
                  placeholder="https://facebook.com/nomeusuario"
                  className="overflow-hidden"
                  maxLength={100}
                  register={register("socials.3.value")}
                />
                <input 
                  type="hidden" 
                  {...register("socials.3.platform")} 
                  value="facebook" 
                />
              </div>
              <div className="w-[50%]">
                <TextInput
                  name="youtube"
                  label="YouTube"
                  placeholder="https://youtube.com/nomeusuario"
                  className="overflow-hidden"
                  maxLength={100}
                  register={register("socials.4.value")}
                />
                <input 
                  type="hidden" 
                  {...register("socials.4.platform")} 
                  value="youtube" 
                />
              </div>
            </div>
            <div className="flex gap-5">
              <div className="w-[50%]">
                <TextInput
                  name="X "
                  label="X (Antigo Twitter)"
                  placeholder="https://x.com/nomeusuario"
                  className="overflow-hidden"
                  maxLength={100}
                  register={register("socials.5.value")}
                />
                <input 
                  type="hidden" 
                  {...register("socials.5.platform")} 
                  value="x" 
                />
              </div>
              <div className="w-[50%]">
                <TextInput
                  name="tiktok"
                  label="TikTok"
                  placeholder="https://tiktok.com/nomeusuario"
                  className="overflow-hidden"
                  maxLength={100}
                  register={register("socials.6.value")}
                />
                <input 
                  type="hidden" 
                  {...register("socials.6.platform")} 
                  value="tiktok" 
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 border border-steel-shadow rounded-lg p-4">
            <span className="font-semibold mb-2">Ciclo semanal</span>
            <div className="w-full flex p-5 pr-10 pl-10">
              {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day, id) => {
                const offerDays = cycles?.offer || [];
                const orderDays = cycles?.order || [];
                const deliverDays = cycles?.deliver || [];

                let bg = "bg-steel-shadow";
                let icon = null;

                if (offerDays.includes(id + 1)) {
                  bg = "bg-rain-forest";
                  icon = <HiOutlineShoppingCart size={26} />;
                } else if (orderDays.includes(id + 1)) {
                  bg = "bg-[#F37200]";
                  icon = <HiOutlineReceiptTax size={26} />;
                } else if (deliverDays.includes(id + 1)) {
                  bg = "bg-[#2F75E4]";
                  icon = <HiOutlineTruck size={26} />;
                }

                return (
                  <div key={day} className="flex-1 flex flex-col items-center">
                    <span className="font-inter text-xs text-theme-secondary">{day}</span>
                    <div
                      className={`h-14 w-14 ${bg} text-white rounded-md flex items-center justify-center`}
                    >
                      {icon}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex gap-8 justify-center mb-5 mt-1">
              <div className="flex items-center gap-1">
                <div className="h-6 w-6 text-steel-shadow rounded-md flex items-center justify-center">
                  <HiOutlineReceiptTax size={24} />
                </div>
                <span className="text-sm text-theme-primary">Oferta</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-6 w-6 text-steel-shadow rounded-md flex items-center justify-center">
                  <HiOutlineShoppingCart size={24} />
                </div>
                <span className="text-sm text-theme-primary">Compra</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-6 w-6 text-steel-shadow rounded-md flex items-center justify-center">
                  <HiOutlineTruck size={24} />
                </div>
                <span className="text-sm text-theme-primary">Entrega</span>
              </div>
            </div> 
          </div>
        </div>
      </div>
    </form>
)}