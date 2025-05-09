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
    heading: {
      en: "Information",
      nl: "Informatie",
    },
    subHeading: {
      en: "Het ❤️U Festival is voor (nieuwe) studenten in de regio Utrecht en is een aanvulling op UIT.",
      nl: "Het ❤️U Festival is voor (nieuwe) studenten in de regio Utrecht en is een aanvulling op UIT.",
    },
    transportOptions: {
      en: "Transport Options",
      nl: "Vervoeropties",
    },
    faq: {
      en: "Frequently Asked Questions",
      nl: "Veel Gestelde Vragen",
    },
    goldenGlu: {
      en: `Students of the GLU have special privileges during the festival and can be recognized by a gold bracelet.

With this gold bracelet they can use the gold toilets and gold marked order points at the bars during the festival without having to stand in a queue.`,
      nl: `Studenten van het GLU hebben tijdens het festival speciale privileges en zijn herkenbaar aan een gouden armbandje.

Met dit gouden armbandje kunnen ze tijdens het festival gebruik maken van de gouden toiletten en met goud gemarkeerde bestelpunten aan de bars zonder in een rij te hoeven staan.`,
    },
  },
} as const satisfies LocalizedTree;
