export function maskTally(value: string) {
  if (!value) return "";
  return value.replace(/\D/g, "");
}
