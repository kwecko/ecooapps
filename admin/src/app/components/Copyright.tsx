import LogoDard from "@shared/assets/svg/logo-dark"

type CopyrightTypes = "primary" | "secondary";

interface CopyrightProps {
  type: CopyrightTypes;
}

export default function Copyright({ type }: CopyrightProps) {
  return (
    <div className="w-full flex items-center gap-9 justify-center">
      {type === "primary" && (
        <LogoDard />
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
