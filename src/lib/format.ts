/**
 * Dates are formatted with an explicit locale and time zone so the same
 * post always shows the same day, wherever it is read from.
 */
const dateFormat = new Intl.DateTimeFormat("zh-TW", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: "Asia/Taipei",
});

export function formatDate(date: Date) {
  return dateFormat.format(date);
}
