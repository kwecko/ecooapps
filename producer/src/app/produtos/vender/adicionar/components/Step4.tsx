"use client";
import { OfferProducts } from "@producer/app/_actions/products/OfferProducts";
import Button from "@shared/components/Button";
import Loader from "@shared/components/Loader";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuChevronLeft } from "react-icons/lu";
import { toast } from "sonner";

interface FormProps {
  goNextClick: () => void;
  goBackClick: () => void;
}

interface offerProductData {
  id: string;
  name: string;
  quantity: string;
  weigth: string;
  priceString: string;
  cycle_id: string;
  describe: string;
}

export default function Step4({ goNextClick, goBackClick }: FormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();

  const savedOfferProductsDataString = localStorage.getItem(
    "offer-products-data"
  );

  const {
    id,
    name,
    quantity,
    weigth,
    priceString,
    cycle_id,
    describe,
  }: offerProductData = savedOfferProductsDataString
      ? JSON.parse(savedOfferProductsDataString)
      : null;

  const displayValue = quantity !== "" ? `${quantity} unidades` : `${weigth} g`;

  const onSubmit = async () => {
    setIsLoading(true)
    const priceFormat = priceString.replace(/[^\d,.]/g, "");
    const priceNoFormat = parseFloat(priceFormat.replace(",", "."));

    const quantity_or_weight =
      quantity !== "" ? Number(quantity) : Number(weigth);

    const product_id = id
    const amount = quantity_or_weight
    const price = priceNoFormat
    const description = describe

    await OfferProducts({ product_id, cycle_id, amount, price, description })
      .then((response) => {
        if (response?.reply.message) {
          toast.error(response?.reply.message);
          return;
        } else {
          toast.success("Produto ofertado com sucesso.");
          goNextClick();
        }
      })
      .catch((error) => {
        toast.error(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  };

  const handleCancelButton = () => {
    localStorage.removeItem("offer-product-step");
    localStorage.removeItem("offer-products-data");

    router.push("/");
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="w-full h-1/4 flex flex-col justify-center">
        <span className="text-center font-medium text-3xl text-slate-gray">
          Revise as <br /> informações
        </span>
        <span className="text-center text-slate-gray text-sm mt-5 font-medium">
          Revise todas as informações antes de <br />
          colocar o seu produto a venda
        </span>
      </div>
      <div className="w-full h-[70%]">
        <div className="w-full h-full flex flex-col gap-3 mt-4 justify-between">
          <table className="bg-white w-full p-10 rounded-lg text-theme-primary table-fixed">
            <tbody>
              <tr>
                <td className="w-1/4 p-3">Produto: </td>
                <td className="w-3/4 p-3">{name}</td>
              </tr>
              <tr>
                <td className="w-1/4 p-3">
                  {quantity !== "" ? "Quantidade:" : "Peso:"}
                </td>
                <td className="w-3/4 p-3">{displayValue}</td>
              </tr>
              <tr>
                <td className="w-1/4 p-3">Preço:</td>
                <td className="w-3/4 p-3">{priceString} / {weigth}</td>
              </tr>
              <tr>
                <td className="w-1/4 p-3">Descrição:</td>
                <td className="w-3/4 p-3 truncate">{describe}</td>
              </tr>
            </tbody>
          </table>
          <button
            disabled={isLoading}
            className="w-full px-2 py-3 font-semibold rounded-lg text-white border-0 p-2 bg-theme-default"
            onClick={onSubmit}
          >
            {isLoading ? (
              <Loader className="w-6 h-6 border-white" appId="PRODUCER" loaderType="component" />
            ) : (
              <>
                Confirmar e colocar a venda
              </>
            )}
          </button>
        </div>
      </div>
      <div className="w-full flex items-center justify-between h-[5%] mt-8">
        <div className="flex">
          <LuChevronLeft className="w-[30px] h-[30px] text-theme-default" />
          <Button
            className="flex items-center gap-2 text-sm font-medium text-[${bgColor}] w-auto"
            onClick={goBackClick}
          >
            Voltar
          </Button>
        </div>
        <Button
          className="px-2 py-3 bg-[#FF7070] rounded-lg text-white font-medium"
          onClick={handleCancelButton}
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
}
