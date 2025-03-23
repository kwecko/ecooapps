import Image from "next/image";
import React, { useEffect, useState } from "react";

import emptyBox from "@shared/assets/images/empty-box.webp";

type EmptyBoxType = "search" | "bag" | "box" | "producer" | "payment";

interface EmptyBoxProps {
  type: EmptyBoxType;
}

export default function EmptyBox({ type }: EmptyBoxProps) {
  const [boxText, setBoxText] = useState("");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (type === "search") {
      setBoxText("Não encontramos resultados para a sua pesquisa.");
      return;
    }
    if (type === "producer") {
      setBoxText("Nenhum produtor encontrado.");
      return;
    }
    if (type === "payment") {
      setWidth(150)
      setHeight(90)
      setBoxText("Nenhum pagamento encontrado.");
      return;
    }
    setWidth(180);
    setHeight(100);
    setBoxText("Nenhuma sacola encontrada!");
  }, [type]);

  return (
    <div className="flex-grow flex h-full">
      <div className="flex flex-col w-full justify-center gap-4 items-center">
        <Image
          src={emptyBox}
          alt="bag"
          width={width}
          height={height}
          quality={100}
          className="object-contain"
        />
        <span className="text-center font-medium w-60 text-slate-gray">
          {boxText}
        </span>
      </div>
    </div>
  );
}
