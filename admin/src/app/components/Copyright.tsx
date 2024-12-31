import LogoDark from "@shared/assets/svg/logo-dark";
import { twMerge } from "tailwind-merge";

type CopyrightTypes = "primary" | "secondary";

interface CopyrightProps {
  type: CopyrightTypes;
  className?: string;
}

export default function Copyright({ type, className }: CopyrightProps) {
  return (
    <div
      className={twMerge(
        "w-full flex items-center gap-9 justify-center",
        className
      )}
    >
      {type === "primary" && <LogoDark />}
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
