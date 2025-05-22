import { Locale } from "./settings";

export type LocalizedString = Record<Locale, string>;

type LocalizedTree = {
  [key: string]: LocalizedString | LocalizedTree | LocalizedTree[];
};

export const messages = {
  global: {
    placedAt: {
      en: "Placed at",
      nl: "Geplaatst op",
    },
    showMore: {
      en: "Show More",
      nl: "Toon meer",
    },
    showLess: {
      en: "Show Less",
      nl: "Toon minder",
    },
    weekdays: {
      saturday: {
        en: "Saturday",
        nl: "Zaterdag",
      },
      sunday: {
        en: "Sunday",
        nl: "Zondag",
      },
    },
  },
  offline: {
    subheading: {
      nl: "Sorry, deze pagina is niet beschikbaar offline.",
      en: "Sorry, this page isn't available offline.",
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
      en: "The ❤️U Festival is for (new) students in the Utrecht region and is an addition to UIT.",
      nl: "Het ❤️U Festival is voor (nieuwe) studenten in de regio Utrecht en is een aanvulling op UIT.",
    },
    general: {
      date: {
        nl: "Zaterdag 6 september 2025 - 12:00 tot 23:00 uur",
        en: "Saturday September 6, 2025 - 12:00 to 23:00",
      },
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
  map: {
    popup: {
      currentAct: {
        nl: "Huidige act",
        en: "Current act",
      },
      nextAct: {
        nl: "Volgende act",
        en: "Next up",
      },
      noNextAct: {
        en: "No act planned",
        nl: "Geen volgende act",
      },
      noCurrent: {
        en: "No current act",
        nl: "Geen huidige act",
      },
    },
  },
} as const satisfies LocalizedTree;
