import Link from "next/link";
import { AiFillCheckCircle } from "react-icons/ai";

import Button from "@shared/components/Button";

export default function Step5() {
  const handleClick = () => {
    localStorage.removeItem("offer-product-step");
    localStorage.removeItem("offer-products-data");
  };

  return (
    <div className="w-full h-screen flex justify-center flex-col">
      <div className="w-full h-4/5 flex items-center flex-col justify-center">
        <AiFillCheckCircle className="w-[100px] h-[100px] text-rain-forest" />
        <span className="mt-6 text-center text-3xl text-slate-gray font-medium">
          Seu produto já <br /> está a venda!
        </span>
        <span className="mt-4 text-center text-slate-gray font-medium text-sm">
          Fique atento as notificações do <br /> nosso aplicativo para não
          perder <br /> os prazos de envio até o nosso
          <br /> centro de distribuição.
        </span>
      </div>
      <div className="w-full h-1/5 pb-2 bg-red flex flex-col justify-end gap-4">
        <Link href={"/"}>
          <Button
            className="w-full rounded-lg font-semibold text-slate-gray border-slate-gray border-2 py-[10px]"
            onClick={handleClick}
          >
            Voltar para a tela inicial
          </Button>
        </Link>
        <Link href={"/produtos/vender"}>
          <Button
            className="w-full px-2 py-3 font-semibold rounded-lg text-white border-0 p-2 bg-theme-default"
            onClick={handleClick}
          >
            Colocar outro produto a venda
          </Button>
        </Link>
      </div>
    </div>
  );
}
