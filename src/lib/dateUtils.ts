export function getDatePercent(date: Date) {
  const time = new Date(date);
  const startOfDay = new Date(time);

  // Festival starts at 10AM
  startOfDay.setHours(10, 0, 0, 0);
  const lengthOfDay = 14 * 60 * 60 * 1000;

  // Difference between start of day (10AM) and time
  const timeDiff = time.getTime() - startOfDay.getTime();

  if (timeDiff >= 0 && timeDiff <= lengthOfDay) {
    // During the festival day
    return (timeDiff / lengthOfDay) * 100;
  } else {
    // At midnight
    return 100;
  }
}

/**
 * Formats a date to time only (excluding seconds)
 * @param date The date you want to format
 */
export function formatDateToTime(date: Date) {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}
