import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ICycle } from '@shared/interfaces/cycle';

interface CycleContextProps {
  cycle: ICycle | undefined;
  setCycle: (cycle: ICycle | undefined) => void;
}

const CycleContext = createContext<CycleContextProps>({
  cycle: undefined,
  setCycle: () => {},
});


export function CycleProvider({ children }: { children: ReactNode }) {
  const [cycle, setCycle] = useState<ICycle | undefined>();

  return (
    <CycleContext.Provider value={{ cycle, setCycle }}>
      {children}
    </CycleContext.Provider>
  );
}

export function useCycleProvider() {
  return useContext(CycleContext);
}
