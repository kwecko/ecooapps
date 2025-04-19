export function validateCellphone(value: string) {
  const brazilianCellphoneRegex =
    /^(\(?\d{2}\)?\s?)?(9\d{4})-?\d{4}$/;

  return brazilianCellphoneRegex.test(value);
}
