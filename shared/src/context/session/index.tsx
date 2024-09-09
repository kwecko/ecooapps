import React, { createContext, useContext, useState, Dispatch, SetStateAction, ReactNode } from "react";

interface SessionExpiredContextProps {
  sessionExpired: boolean;
  setSessionExpired: Dispatch<SetStateAction<boolean>>;
}

const SessionExpiredContext = createContext<SessionExpiredContextProps>({
  sessionExpired: false,
  setSessionExpired: () => {},
});

export function SessionExpiredWrapper({ children }: { children: ReactNode }) {
  const [sessionExpired, setSessionExpired] = useState(false);

  return (
    <SessionExpiredContext.Provider value={{ sessionExpired, setSessionExpired }}>
      {children}
    </SessionExpiredContext.Provider>
  );
}

export function useSessionExpiredContext() {
  return useContext(SessionExpiredContext);
}
