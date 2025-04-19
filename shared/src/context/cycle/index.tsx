import { CycleDTO } from "@shared/interfaces/dtos";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface CycleContextProps {
  cycle: CycleDTO | null;
  setCycle: (cycle: CycleDTO | null) => void;
}

const CycleContext = createContext<CycleContextProps>({
  cycle: null,
  setCycle: () => {},
});

export function CycleProvider({ children }: { children: ReactNode }) {
  const [cycle, setCycle] = useState<CycleDTO | null>(null);

  return (
    <CycleContext.Provider value={{ cycle, setCycle }}>
      {children}
    </CycleContext.Provider>
  );
}

export function useCycleProvider() {
  return useContext(CycleContext);
}
