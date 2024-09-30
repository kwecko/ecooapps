export const addTaxToPrice = (price: number, tax: number) => {
  return price + price * tax;
};

export const removeTaxFromPrice = (price: number, tax: number) => {
  return price / (1 + tax);
};
