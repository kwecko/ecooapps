import { handleFarmStatus } from "@admin/_actions/farms/PATCH/handle-farm-status";
import { Button } from "@headlessui/react";
import ModalV2 from "@shared/components/ModalV2";
import { FarmDTO } from "@shared/interfaces/dtos";
import convertStatus from "@shared/utils/convert-status";
import dayjs from "dayjs";
import { toast } from "sonner";

interface UpdateFarmStatusModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  farm: FarmDTO;
  farms: FarmDTO[];
  updateData: (newData: FarmDTO[]) => void;
}

export default function UpdateFarmStatusModal({
  isOpen,
  setIsOpen,
  farm,
  farms,
  updateData,
}: UpdateFarmStatusModalProps) {
  const today = dayjs();
  const handleFarmStatusChange = async (
    status: "ACTIVE" | "PENDING" | "INACTIVE"
  ) => {
    if (!farm) return;
    await handleFarmStatus({ farm_id: farm.id, status });
    const _farms: FarmDTO[] = farms.map((_farm) =>
      _farm.id === farm.id ? { ..._farm, status } : _farm
    );
    updateData(_farms);
    setIsOpen(false);
    toast.success("Status do produtor alterado com sucesso!");
  };

  return (
    <ModalV2
      isOpen={isOpen}
      closeModal={() => setIsOpen(false)}
      title="Verificar produtor"
    >
      <div className="w-full h-full rounded-md bg-white font-inter text-theme-primary">
        {[
          {
            label: "Nome",
            value: `${farm?.admin?.first_name} ${farm.admin?.last_name}`,
          },
          {
            label: "Status",
            value: convertStatus(farm.status).name,
            isBold: "font-bold",
          },
          {
            label: "Solicitação",
            value: today.format("DD/MM/YYYY [às] HH:mm:ss"),
          },
          { label: "Negócio", value: farm.name },
          { label: "Talão", value: farm.tally },
          { label: "Email", value: farm.admin?.email },
          { label: "Celular", value: farm.admin?.phone },
        ].map((item, index) => (
          <div key={index}>
            <div className="flex w-full h-12 items-center p-4">
              <span className="w-2/6">{item.label}:</span>
              <span className={`w-4/6 ${item.isBold}`}>{item.value}</span>
            </div>
            <hr className="w-full border-theme-background" />
          </div>
        ))}
      </div>
      <div className="w-full flex pt-5 gap-4 font-inter font-semibold">
        <Button
          className="w-full h-14 rounded-md text-white bg-error"
          onClick={() => handleFarmStatusChange("INACTIVE")}
        >
          Rejeitar
        </Button>
        <Button
          className="w-full h-14 rounded-md text-white bg-rain-forest"
          onClick={() => handleFarmStatusChange("ACTIVE")}
        >
          Aprovar
        </Button>
      </div>
    </ModalV2>
  );
}
