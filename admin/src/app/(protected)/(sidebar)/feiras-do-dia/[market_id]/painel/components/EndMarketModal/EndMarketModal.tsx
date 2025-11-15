import useEndMarketModal from ".";

import Loader from "@shared/components/Loader";
import ModalV2 from "@shared/components/ModalV2";
import ButtonV2 from "@shared/components/ButtonV2";
import { MarketDTO } from "@shared/interfaces/dtos";

interface EndMarketModalProps {
  isOpen: boolean;
  closeModal: () => void;
  market: MarketDTO | null;
}

export default function EndMarketModal({
  isOpen,
  closeModal,
  market,
}: EndMarketModalProps) {
  const { isPending, handleEndMarket } = useEndMarketModal({
    closeModal,
    market,
  });

  return (
    <ModalV2
      isOpen={isOpen}
      closeModal={closeModal}
      className="w-152 bg-white text-coal-black"
      title="Atenção"
      iconClose={true}
    >
      <div className="w-full flex flex-col gap-5 items-center">
        <span className="w-86 text-center text-theme-primary">
          Você confirma que deseja encerrar a feira "{market?.name}"? Esta ação não pode ser desfeita.
        </span>
        <div className="w-full flex justify-between items-center gap-4">
          <ButtonV2
            variant="default"
            type="button"
            onClick={closeModal}
            className="bg-tertiary text-slate-dark border-none"
          >
            Cancelar
          </ButtonV2>
          <ButtonV2
            variant="default"
            type="button"
            onClick={handleEndMarket}
            className="bg-error border-none"
          >
            {isPending ? <Loader loaderType="login" /> : "Encerrar feira"}
          </ButtonV2>
        </div>
      </div>
    </ModalV2>
  );
}

