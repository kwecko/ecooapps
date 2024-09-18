export function maskDate(value: string) {
  if (!value) return "";

  const dateWithMask = value.replace(/\D/g, "");

  if (dateWithMask.length <= 2) {
    return dateWithMask;
  } else if (dateWithMask.length <= 4) {
    return dateWithMask.replace(/(\d{2})(\d)/, "$1/$2");
  } else {
    return dateWithMask.replace(/(\d{2})(\d{2})(\d)/, "$1/$2/$3").slice(0, 14);
  }
}
