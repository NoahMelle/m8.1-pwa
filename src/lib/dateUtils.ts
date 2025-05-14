export function getDatePercent(date: Date) {
  const time = new Date(date);
  const startOfDay = new Date(time);

  startOfDay.setUTCHours(10, 0, 0, 0);

  const lengthOfDay = 14 * 60 * 60 * 1000;
  const timeDiff = time.getTime() - startOfDay.getTime();

  const percent =
    timeDiff >= 0 && timeDiff <= lengthOfDay
      ? (timeDiff / lengthOfDay) * 100
      : time.getUTCHours() < 10
      ? ((timeDiff + 24 * 60 * 60 * 1000) / lengthOfDay) * 100
      : 100;

  return percent;
}
