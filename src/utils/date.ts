/**
 *
 * @param ms string
 * @returns date format YYYY-MM-DD
 */
export function formatDate(ms: number) {
  const date = new Date(ms);
  const Year = date.getFullYear();
  const Month = date.getMonth() + 1;
  const Day = date.getDate();

  return `${Year}-${dateNum(Month)}-${dateNum(Day)}`;
}

function dateNum(date: number) {
  return date < 10 ? "0" + date : date;
}
