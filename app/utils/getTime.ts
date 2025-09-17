import { format, toZonedTime } from "date-fns-tz";

export default function getTime() {
  const date = new Date();
  const zonedDate = toZonedTime(date, "Europe/London")
  return format(zonedDate, "HH:mm")
}
