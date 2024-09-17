export const convertUnit = (type: string) => {
  const types: Record<string, string> = {
    UNIT: "un.",
    WEIGHT: "kg",
  };

  return types[type];
};
