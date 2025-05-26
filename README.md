# Module 8.1 - Progressive Web App

A progressive web app for the fictional ❤️U festival: a festival for (new) students in Utrecht.

- [Module 8.1 - Progressive Web App](#module-81---progressive-web-app)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
  - [Installation (development environment)](#installation-development-environment)
  - [Installation (PWA on a mobile device)](#installation-pwa-on-a-mobile-device)
  - [Project Structure](#project-structure)

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
2. Run the dev server:
   ```
   bun run dev
   ```
3. Visit http://localhost:3000 to view the site!\*

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
├── __tests__/ # Unit tests (mostly for geolocation calculation stuff)
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
