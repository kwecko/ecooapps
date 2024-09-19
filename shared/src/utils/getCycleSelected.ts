import { useLocalStorage } from "@shared/hooks/useLocalStorage";

export const getCycleSelected = () => {
  const { getFromStorage } = useLocalStorage();
  const cycle = getFromStorage("selected-cycle");
  return cycle;
};
