// Entities

export function first(days: number[]): Date {
  const min = Math.min(...days);
  const max = Math.max(...days);

  const merge = max === 7 && min === 1;

  const oldest = merge
    ? days.reverse().find((day, index) => day - 1 !== days.at(index + 1))!
    : min;

  const today = new Date();

  const current = today.getDay() + 1;

  let difference = current - oldest;

  if (difference < 0) difference += 7;

  const date = new Date(today.setDate(today.getDate() - difference));

  date.setHours(0, 0, 0, 0);

  return date;
}
