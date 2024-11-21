import Image from "next/image";

import LogoDark from "@shared/assets/svg/logo-dark.svg";

type CopyrightTypes = "primary" | "secondary";

interface CopyrightProps {
  type: CopyrightTypes;
}

export default function Copyright({ type }: CopyrightProps) {
  return (
    <div className="w-full flex items-center gap-9 justify-center">
      {type === "primary" && (
        <Image
          src={LogoDark}
          width={112}
          height={37}
          alt="e-COO"
        />
      )}
      <span
        className={`${
          type === "primary" ? "text-left" : "text-center"
        } block w-64 text-xs`}
      >
        Versão 1.0.0 - Copyright © e-COO 2024. Todos os direitos reservados
      </span>
    </div>
  );
}
