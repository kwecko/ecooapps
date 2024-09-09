export function validateCellphone(value: string) {
  const brazilianCellphoneRegex =
    /^(\+\d{1,3}\s?)?(\(\d{2,3}\)|\d{2,3})?[\s-]?\d{4,5}[\s-]?\d{4}$/;

  return brazilianCellphoneRegex.test(value);
}
