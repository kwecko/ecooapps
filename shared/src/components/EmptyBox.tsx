import Image from "next/image";
import React, { useEffect, useState } from "react";

import emptyBox from "@shared/assets/images/empty-box.webp";

type EmptyBoxType = "search" | "bag" | "box";

interface EmptyBoxProps {
  type: EmptyBoxType;
}

export default function EmptyBox({ type }: EmptyBoxProps) {
  const [boxText, setBoxText] = useState("");

  useEffect(() => {
    if (type == "search") {
      setBoxText("Não encontramos resultados para a sua pesquisa.");
      return;
    }
    setBoxText("Nenhuma sacola encontrada!");
  }, [type]);

  return (
    <div className="flex-grow flex h-full">
      <div className="flex flex-col w-full pb-20 justify-center gap-4 items-center">
        <Image
          src={emptyBox}
          alt="bag"
          width={180}
          height={100}
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
