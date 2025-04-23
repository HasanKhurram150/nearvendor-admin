export const getUniqueRandomNumbers = (min: number, max: number, count: number) => {
  const range = Math.floor(max) - Math.ceil(min) + 1;
  if (count > range) {
    throw new Error("The count is greater than the range of possible numbers.");
  }

  const numbers = new Set<number>();
  let attempts = 0;
  while (numbers.size < count && attempts < 1000) {
    const randomNumber = Math.floor(Math.random() * range) + Math.ceil(min);
    numbers.add(randomNumber);
    attempts++;
  }

  if (numbers.size < count) {
    throw new Error("Unable to generate enough unique random numbers within the given range.");
  }

  return Array.from(numbers);
};
