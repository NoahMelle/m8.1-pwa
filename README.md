# Module 8.1 - Progressive Web App

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)

A progressive web app for the fictional ❤️U festival: a festival for (new) students in Utrecht.

- [Module 8.1 - Progressive Web App](#module-81---progressive-web-app)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
  - [Installation (development environment)](#installation-development-environment)
  - [Installation (PWA on a mobile device)](#installation-pwa-on-a-mobile-device)
  - [Project Structure](#project-structure)
  - [Internationalization](#internationalization)
    - [Determening the preferred language](#determening-the-preferred-language)
    - [Translating using a React hook](#translating-using-a-react-hook)
    - [Defining messages](#defining-messages)

## Getting Started

Follow the steps below to set up and run the project locally.

### Prerequisites

Ensure you have the following installed before proceeding:

- **Bun** (or another package manager, this guide uses [Bun](https://bun.sh/))

## Installation (development environment)

1. Install dependencies:
   ```
   bun i
   ```
2. Create a new MySQL database:
   ```
   # Make sure to run this inside of a MySQL shell
   CREATE DATABASE loveu_festival;
   ```
3. Copy the `.env.example` file and rename it to `.env`:

   ```bash
    cp .env.example .env
   ```

4. Generate private/public VAPID keys:
   ```bash
   bunx web-push generate-vapid-keys
   ```
5. Fill in the `.env` file:
   1. Fill in the database url with your own password and database name
   2. Fill in the VAPID keys with the keys generated in step 4
6. Migrate the database:
   ```
   bunx drizzle-kit migrate
   ```
7. Seed the database:
   ```
   bun ./src/db/seed.ts
   ```
8. Run the dev server:

```
bun run dev
```

10. Visit http://localhost:3000 to view the site! 🚀\*

\*_Tip: use your browser's responsive development tools to simulate the dimensions of a mobile device_

## Installation (PWA on a mobile device)

![QR Code](./public/img/qr-code.png)

To install the PWA, you can use the QR above code or:

1. Visit the live site on a Chromium based browser: https://pwa.noeycodes.com*
2. Click on the three dots in the top-right corner.
3. Select `Add to home screen`, a pop-up will show up prompting you to install the app
4. Click on the `Install` button, located in the bottom-right corner of the pop-up.

\*_Exposing localhost won't work because localhost gets served over HTTP, and PWA's require HTTPS._

## Project Structure

```

m8.1-pwa/
├── **tests**/ # Unit tests (mostly for geolocation calculation stuff)
├── .github/workflows/ # Github Action Workflows
├── docs/ # Project documentation
├── drizzle/ # ORM migrations
├── public/ # Static files (e.g., images, favicon)
├── src/ # Source code files
│ ├── @types/ # Type definitions
│ ├── app/ # The website itself
│ ├── components/ # UI Components
│ ├── context/ # React Context wrappers (theme and language)
│ ├── db/ # Database stuff
│ │ ├── schemas/ # Schema definition files
│ │ ├── index.ts # MySQL connection pool
│ │ ├── seed.ts # Database seeder script
│ ├── i18n/ # Functions and messages for i18n
└─└── styles/ # CSS/SCSS Files

```

## Internationalization

This app is bilingual (Dutch and English). To achieve this, I've made my own custom React hooks.

### Determening the preferred language

A middleware function runs on every page request. This function determines the preferred language of the user based on the `accept-language` header and sets the best matching language as a cookie.

### Translating using a React hook

To change all texts on the page to a new language without a full reload, you will need some kind of client-side component that returns the text based on the current language.

The hook returns a function, which accepts an object with entries for all locales and returns the locale for the current language. The hook looks like this:

```ts
export const useTranslations = () => {
  const { language } = useLanguage();

  return (path: Record<Locale, string | null>): string => {
    return language ? path[language] ?? "" : "";
  };
};
```

The function call would look something like this:

```ts
const t = useTranslations();

console.log(
  t({
    en: "Hello World!",
    nl: "Hallo Wereld!",
  })
);
```

### Defining messages

To keep everything type-safe, I'm storing all messages inside of a constant `messages` TypeScript object. The type looks something like this:

```ts
// To achieve the best possible type safety, each 'leaf' of must provide a translation for every supported locale
export type LocalizedString = Record<Locale, string>;

// The branches of the tree, to support nested objects
type LocalizedTree = {
  [key: string]: LocalizedString | LocalizedTree | LocalizedTree[];
};
```

I can get the translated version of the message easily with a function call like this:

```ts

const messages: LocalizedTree = {
   global: {
      heading: {
          en: "Hello World!",
          nl: "Hallo Wereld!",
      }
   }
}

console.log(t({ messages.global.heading }))
```
