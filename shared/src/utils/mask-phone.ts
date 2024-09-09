export function maskCellphone(value: string) {
  if (!value) return "";

  const phoneWithoutMask = value.replace(/\D/g, "");

  if (phoneWithoutMask.length <= 10) {
    return phoneWithoutMask
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  } else {
    return phoneWithoutMask
      .slice(0, 11)
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1");
  }
}

export function unmaskCellphone(value: string) {
  if (!value) return "";

  return value.replace(/\D/g, "");
}
