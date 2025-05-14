export function getDatePercent(date: Date) {
  const time = new Date(date);
  const startOfDay = new Date(time);

  // Normalize to 10:00 AM
  startOfDay.setHours(10, 0, 0, 0);

  const lengthOfDay = 14 * 60 * 60 * 1000; // 14 hours (10 AM to 00:00)
  const timeDiff = time.getTime() - startOfDay.getTime();

  // Handle if after midnight (i.e., technically next day but still part of same schedule)
  const percent =
    timeDiff >= 0 && timeDiff <= lengthOfDay
      ? (timeDiff / lengthOfDay) * 100
      : time.getHours() < 10
      ? ((timeDiff + 24 * 60 * 60 * 1000) / lengthOfDay) * 100
      : 100; // cap it

  return percent;
}
