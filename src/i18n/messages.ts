import { Locale } from "./settings";

export type LocalizedString = Record<Locale, string>;

type LocalizedTree = {
  [key: string]: LocalizedString | LocalizedTree | LocalizedTree[];
};

export const messages = {
  global: {
    showMore: {
      en: "Show More",
      nl: "Toon meer",
    },
    showLess: {
      en: "Show Less",
      nl: "Toon minder",
    },
  },
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
  info: {
    transportOptions: {
      en: "Transport Options",
      nl: "Vervoeropties",
    },
  },
} as const satisfies LocalizedTree;
