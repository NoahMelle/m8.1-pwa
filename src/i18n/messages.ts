import { TransportOptionType } from "@/@types/types";
import { Locale } from "./settings";
import { Bike, Bus, Car, CarTaxiFront, Ticket } from "lucide-react";

export type LocalizedString = Record<Locale, string>;

type LocalizedTree = {
  [key: string]: LocalizedString | LocalizedTree | LocalizedTree[];
};

export const messages = {
  global: {
    loading: {
      en: "Loading",
      nl: "Aan het laden",
    },
    startsAt: {
      en: "Starts at",
      nl: "Start om",
    },
    endsAt: {
      en: "Ends at",
      nl: "Eindigt om",
    },
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
    heading: {
      en: "Welcome to",
      nl: "Welkom bij",
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
  news: {
    heading: {
      en: "News",
      nl: "Nieuws",
    },
  },
  map: {
    legend: {
      en: "Legend",
      nl: "Legenda",
    },
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
  install: {
    heading: {
      en: "Install App",
      nl: "Installeer App",
    },
    noPrompt: {
      en: "Installation prompt not available. Please try again later.",
      nl: "Installatie prompt niet beschikbaar. Probeer het later opnieuw.",
    },
    iosPrompt: {
      en: 'To install this app on your iOS device, tap the share button and then "Add to Home Screen".',
      nl: 'Klik op de shareknop en "Add to Home Screen", om de app te installeren op een iOS device.',
    },
    homescreen: {
      nl: "Voeg toe aan homescreen",
      en: "Add to homescreen",
    },
  },
} as const satisfies LocalizedTree;

export const transportOptions: TransportOptionType[] = [
  {
    id: 0,
    name: {
      en: "Bike",
      nl: "Fiets",
    },
    description: {
      en: "There is a large free bicycle shed where you can park your bike all day.",
      nl: "Er is een grote gratis fietsenstalling aanwezig waar je jouw fiets de gehele dag kunt stallen.",
    },
    image: Bike,
  },
  {
    id: 1,
    name: {
      en: "Car",
      nl: "Auto",
    },
    description: {
      en: "You can purchase a parking ticket. You can park at P+R Papendorp, follow the signs 'P online ticket'. Did you not purchase a ticket in advance? Then you can purchase a parking ticket from the parking attendant on location (PIN ONLY). Please note: FULL=FULL",
      nl: "Je kunt een parkingticket aanschaffen. Parkeren kan op P+R Papendorp, volg hiervoor de borden 'P online ticket'. Heb je geen ticket van te voren gekocht? Dan kun je bij de parkeerwachter op locatie een parkeerticket aanschaffen (PIN ONLY). Let wel op: VOL=VOL",
    },
    image: Car,
  },
  {
    id: 2,
    name: {
      en: "Public Transport",
      nl: "OV",
    },
    description: {
      en: "Are you coming to Lief by public transport? Then plan your trip via 9292.nl.",
      nl: "Kom je met het openbaar vervoer naar Lief? Plan dan je trip via 9292.nl.",
    },
    image: Ticket,
  },
  {
    id: 3,
    name: {
      en: "Shuttle Bus",
      nl: "Shuttlebus",
    },
    description: {
      en: `From Utrecht Central Station you can take our free shuttle bus to the festival site. You can find this bus at the central station on Mineurslaan. Follow the white signs with black arrows and ' ❤️U Festival'. 

The bus runs between 12:00 and 19:00 towards the festival and from 21:00 you can get on again to go to the station.`,
      nl: `
        Vanaf Utrecht Centraal kun je onze gratis shuttlebus richting het festivalterrein pakken. Je vindt deze bus op het centraal station aan de Mineurslaan. Volg de witte bordjes met zwarte pijlen én ' ❤️U Festival'. 

De bus rijdt tussen 12:00 uur & 19:00 uur richting het festival en vanaf 21:00 uur kun je weer instappen om richting het station te gaan.`,
    },
    image: Bus,
  },
  {
    id: 4,
    name: {
      en: "Taxi + Kiss & Ride",
      nl: "Taxi + Kiss & Ride",
    },
    description: {
      en: `Navigate to Strijkviertel, De Meern (Utrecht). Follow the signs "Kiss & Ride ❤️U Festival", once you are near the festival grounds.`,
      nl: `Navigeer naar Strijkviertel, De Meern (Utrecht). Volg de borden "Kiss & Ride ❤️U Festival", zodra je in de buurt bent van het festivalterrein.`,
    },
    image: CarTaxiFront,
  },
];
