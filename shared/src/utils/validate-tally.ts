export function validateTally(value: string) {
  // has to be a number type integer
  const tallyRegex = /^\d+$/;

  return tallyRegex.test(value);
}
