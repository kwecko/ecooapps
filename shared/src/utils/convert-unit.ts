export const convertUnit = (type: string) => {
  const types: Record<string, string> = {
    UNIT: "un.",
    WEIGHT: "kg",
  };

  return types[type];
};

export const convertUnitFull = (type: string, plural: boolean = false) => {
  const types: Record<string, string> = {
    UNIT: plural ? "unidades" : "unidade",
    WEIGHT: "kg",
  };

  return types[type];
};

export const convertOfferAmount = (value: number, type: string) => {
  const types: Record<string, number> = {
    UNIT: value,
    WEIGHT: (value / 1000),
  };

  return types[type];
};

export const convertUnitToLabel = (type: string) => {
  const types: Record<string, string> = {
    UNIT: "Unidades",
    WEIGHT: "Quilogramas (kg)",
  };

  return types[type];
}