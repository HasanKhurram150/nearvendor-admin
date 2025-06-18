/**
 * Formats a number with commas and adds a suffix (k, m, b) for large numbers.
 *
 * @param num The number to format.
 * @returns The formatted string (e.g., "5,029k", "123", "1.5m").
 */
export function formatNumber(num: number): string {
  // Check for invalid input
  if (typeof num !== "number" || isNaN(num)) {
    console.error("Invalid input: Please provide a valid number.");
    return "Invalid Number";
  }

  // Define the thresholds and suffixes
  const billion = 1_000_000_000;
  const million = 1_000_000;
  const thousand = 1_000;

  let formattedNum: number = num;
  let suffix: string = "";

  // Determine the appropriate suffix and adjust the number
  if (Math.abs(num) >= billion) {
    formattedNum = num / billion;
    suffix = "b";
  } else if (Math.abs(num) >= million) {
    formattedNum = num / million;
    suffix = "m";
  } else if (Math.abs(num) >= thousand) {
    formattedNum = num / thousand;
    suffix = "k";
  }

  // Format the number with commas.
  // For numbers that have been divided, we might want to limit decimal places
  // to avoid very long strings.toFixed(1) rounds to one decimal place.
  const numberFormatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1, // Allow one decimal place for scaled numbers
  });

  return numberFormatter.format(formattedNum) + suffix;
}
