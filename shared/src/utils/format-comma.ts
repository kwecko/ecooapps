export function formatComma(value: string | number) {
  return value.toString().replace(/\./g, ",");
}