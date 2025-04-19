import useArchiveProductModal from "."

import Loader from "@shared/components/Loader";
import ModalV2 from "@shared/components/ModalV2";
import ButtonV2 from "@shared/components/ButtonV2";
import { ProductDTO } from "@shared/interfaces/dtos";

interface ArchiveProductModalProps {
  isOpen: boolean;
  closeModal: () => void;
  product: ProductDTO | null;
  reloadProducts: () => void;
}

export default function ArchiveProductModal({
  isOpen,
  closeModal,
  product,
  reloadProducts,
}: ArchiveProductModalProps) {
  const { isPending, handleArchive } = useArchiveProductModal({
    closeModal,
    reloadProducts,
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
          Você confirma que quer {product?.archived ? "desocultar" : "ocultar"} o produto "{product?.name}" comercializado em{" "}
          {product?.pricing === "WEIGHT" ? "kilo" : "unidade"}
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
            onClick={() => handleArchive(product?.id as string, product as ProductDTO)}
            className={`border-none ${(product?.archived ? "bg-rain-forest" : "bg-error")}`}
          >
            {isPending ? <Loader loaderType="login" /> : product?.archived ? "Desocultar" : "Ocultar"}
          </ButtonV2>
        </div>
      </div>
    </ModalV2>
  );
}
