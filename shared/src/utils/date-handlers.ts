export const formatDateToDDMMYYYY = (date?: Date): string | undefined => {
  if (!date) return undefined;

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export const formatDateToDateAndTime = (value: string) => {
  const date = new Date(value);
  const formattedDate = date.toLocaleDateString("pt-BR");
  const formattedTime = date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${formattedDate} | ${formattedTime}`;
};
