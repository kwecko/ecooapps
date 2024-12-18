import useDeleteProductModal from ".";

import Loader from "@shared/components/Loader";
import ModalV2 from "@shared/components/ModalV2";
import ButtonV2 from "@shared/components/ButtonV2";
import { ProductDTO } from "@shared/interfaces/dtos";

interface ProductModalProps {
  isOpen: boolean;
  closeModal: () => void;
  product: ProductDTO | null
}

export default function DeleteProductModal({ isOpen, closeModal, product }: ProductModalProps) {
  const { isPending, handleDelete } = useDeleteProductModal()

  return (
    <ModalV2
      isOpen={isOpen}
      closeModal={closeModal}
      className="w-152 bg-white text-coal-black"
      title="Atenção"
    >
      <div className="w-full flex flex-col gap-5 items-center">
        <span className="w-86 text-center text-theme-primary">
          Você confirma que quer excluir o produto 
          "{product?.name}" comercializado em {product?.pricing === "WEIGHT" ? "kilo" : "unidade"}
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
            onClick={() => handleDelete(product?.id as string)}
            className="bg-error border-none"
          >
            {isPending && <Loader loaderType="login" />}
            {!isPending && "Excluir"}
          </ButtonV2>
        </div>
      </div>
    </ModalV2>
  );
}