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
    WEIGHT: value / 1000,
  };

  return types[type];
};

export const convertUnitToLabel = (type: string) => {
  const types: Record<string, string> = {
    UNIT: "Unidades",
    WEIGHT: "Quilogramas (kg)",
  };

  return types[type];
};

export const convertPricingToGrams = (type: string) => {
  const types: Record<string, string> = {
    UNIT: "unid.",
    WEIGHT: "g",
  };

  return types[type];
};

export const convertPricingToQuantityInGrams = (type: string) => {
  const types: Record<string, number> = {
    UNIT: 1,
    WEIGHT: 500,
  };

  return types[type];
};
