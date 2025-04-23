export function getDayOfWeek(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { weekday: "long" };
  return date.toLocaleDateString(undefined, options);
}
