import { Theme, themes } from "@/@types/theme";
import { PerformanceWithStageType, StageType } from "@/@types/types";

/**
 * Checks whether the string is inside of the 'themes' array
 * @param value The string you want to check
 */
export function isTheme(value: string): value is Theme {
  return (themes as readonly string[]).includes(value);
}

/**
 * Formats a date to time only (excluding seconds)
 * @param date The date you want to format
 */
export function formatDateToTime(date: Date) {
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function groupPerformancesByStage(
  acts: PerformanceWithStageType[],
  stages: StageType[]
) {
  const groupMap = new Map<string, PerformanceWithStageType[]>(
    stages.map((stage) => [stage.name, []])
  );

  acts.forEach((act) => {
    if (act.stage) {
      const existingEntry = groupMap.get(act.stage.name);

      if (existingEntry) {
        groupMap.set(act.stage.name, [...existingEntry, act]);
      } else {
        groupMap.set(act.stage.name, [act]);
      }
    }
  });

  return groupMap;
}

export function toggleArrayItem<T>(arr: Array<T>, item: T): Array<T> {
  const copy = [...arr];
  const index = copy.indexOf(item);

  if (index != -1) {
    copy.splice(index, 1);
  } else {
    copy.push(item);
  }

  return copy;
}
