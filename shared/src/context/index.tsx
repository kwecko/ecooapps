import React, { createContext, useState, useContext, ReactNode } from 'react';
import { CycleDTO } from '@shared/domain/dtos/cycle-dto';

interface CycleContextProps {
  cycle: CycleDTO | undefined;
  setCycle: (cycle: CycleDTO | undefined) => void;
}

const CycleContext = createContext<CycleContextProps>({
  cycle: undefined,
  setCycle: () => {},
});


export function CycleProvider({ children }: { children: ReactNode }) {
  const [cycle, setCycle] = useState<CycleDTO | undefined>();

  return (
    <CycleContext.Provider value={{ cycle, setCycle }}>
      {children}
    </CycleContext.Provider>
  );
}

export function useCycleProvider() {
  return useContext(CycleContext);
}
