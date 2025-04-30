import dayjs, { Dayjs } from "dayjs";

// Always show full format: Apr 29 – Apr 29, 2025
export function formatStartEndDate(
  startDate: Dayjs | string | Date,
  endDate: Dayjs | string | Date,
): string {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  return `${start.format("MMM D")} – ${end.format("MMM D, YYYY")}`;
}
