import { Locale } from "./settings";

type LocalizedString = Record<Locale, string>;

type LocalizedTree = {
  [key: string]: LocalizedString | LocalizedTree;
};

export const messages = {
  homepage: {
    about: {
      en: "About the festival",
      nl: "Over het festival",
    },
    timetable: {
      en: "Timetable",
      nl: "Blokkenschema",
    },
  },
} as const satisfies LocalizedTree;
