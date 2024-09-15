import dayjs from "dayjs";

export function getNextSaturdayDate() {
  const today = dayjs();
  const dayOfWeek = today.day();

  const daysUntilSaturday = 6 - dayOfWeek;
  const nextSaturday = today.add(daysUntilSaturday, 'day');

  return nextSaturday.format("DD/MM/YYYY");
};