import { reset } from "drizzle-seed";
import { performancesTable, stagesTable } from "./schemas";
import dayjs from "dayjs";
import "dotenv/config";
import * as schema from "./schemas/index";
import { drizzle } from "drizzle-orm/mysql2";

// function generateRandomAct() {
//   const possibleActs: {
//     title: string;
//     dutchDescription: string;
//     englishDescription: string;
//   }[] = [
//     {
//       title: "Armin van Buuren",
//       dutchDescription: `Five-time “World's No. 1 DJ” and trance icon, Armin delivers euphoric, high-energy sets that have headlined festivals from Tomorrowland to Ultra. His uplifting melodies and impeccable mixing keep crowds dancing for hours.`,
//       englishDescription: `Five-time “World's No. 1 DJ” and trance icon, Armin delivers euphoric, high-energy sets that have headlined festivals from Tomorrowland to Ultra. His uplifting melodies and impeccable mixing keep crowds dancing for hours.`,
//     },
//     {
//       title: "Martin Garrix",
//       dutchDescription: `Broke through as a teenager with “Animals,” Martin Garrix has become one of the biggest names in EDM. His anthemic big-room tracks and stadium-sized drops make him a festival favorite across Europe.`,
//       englishDescription: `Broke through as a teenager with “Animals,” Martin Garrix has become one of the biggest names in EDM. His anthemic big-room tracks and stadium-sized drops make him a festival favorite across Europe.`,
//     },
//     {
//       title: "Kensington",
//       dutchDescription: `Rotterdam-born indie rock quintet known for soaring choruses and driving guitar riffs. Hits like “Streets” and “Riddles” showcase their knack for arena-ready hooks and emotionally charged lyricism.`,
//       englishDescription: `Rotterdam-born indie rock quintet known for soaring choruses and driving guitar riffs. Hits like “Streets” and “Riddles” showcase their knack for arena-ready hooks and emotionally charged lyricism.`,
//     },
//     {
//       title: "Within Temptation",
//       dutchDescription: `Symphonic metal pioneers fronted by Sharon den Adel. Their cinematic soundscapes and operatic vocals (think “Ice Queen,” “Mother Earth”) translate into dramatic, visually stunning festival performances.`,
//       englishDescription: `Symphonic metal pioneers fronted by Sharon den Adel. Their cinematic soundscapes and operatic vocals (think “Ice Queen,” “Mother Earth”) translate into dramatic, visually stunning festival performances.`,
//     },
//     {
//       title: "De Staat",
//       dutchDescription: `Experimental rock outfit from Nijmegen, blending funky grooves with angular guitar work and theatrical stagecraft. Tracks like “Witch Doctor” and “Down Town” highlight their genre-bending approach and infectious energy.`,
//       englishDescription: `Experimental rock outfit from Nijmegen, blending funky grooves with angular guitar work and theatrical stagecraft. Tracks like “Witch Doctor” and “Down Town” highlight their genre-bending approach and infectious energy.`,
//     },
//     {
//       title: "Chef'Special",
//       dutchDescription: `A four-piece from Haarlem mixing funk, pop, rock and hip-hop. Their upbeat, genre-fluid sound on songs like “Amigo” and “In Your Arms” makes for joyous, dance-floor-friendly live shows.`,
//       englishDescription: `A four-piece from Haarlem mixing funk, pop, rock and hip-hop. Their upbeat, genre-fluid sound on songs like “Amigo” and “In Your Arms” makes for joyous, dance-floor-friendly live shows.`,
//     },
//     {
//       title: "Navarone",
//       dutchDescription: `Utrecht's hard-hitting rock four-piece, delivering riff-driven anthems and dynamic vocals. With a live reputation for raw intensity, they're tailor-made for late-night main stages.`,
//       englishDescription: `Utrecht's hard-hitting rock four-piece, delivering riff-driven anthems and dynamic vocals. With a live reputation for raw intensity, they're tailor-made for late-night main stages.`,
//     },
//     {
//       title: "Dotan",
//       dutchDescription: `Folk-pop singer-songwriter whose intimate voice and acoustic arrangements (notably on “Home”) have earned him platinum sales and sell-out shows. His heartfelt storytelling connects deeply on festival acoustic stages.`,
//       englishDescription: `Folk-pop singer-songwriter whose intimate voice and acoustic arrangements (notably on “Home”) have earned him platinum sales and sell-out shows. His heartfelt storytelling connects deeply on festival acoustic stages.`,
//     },
//     {
//       title: "Eefje de Visser",
//       dutchDescription: `Indie-pop artist crafting atmospheric, electronic-tinged songs. Her hypnotic vocals and lush production (as heard on “Ongeveer”) create a dreamlike vibe perfect for twilight festival slots.`,
//       englishDescription: `Indie-pop artist crafting atmospheric, electronic-tinged songs. Her hypnotic vocals and lush production (as heard on “Ongeveer”) create a dreamlike vibe perfect for twilight festival slots.`,
//     },
//     {
//       title: "Froukje",
//       dutchDescription: `Breakthrough pop singer Froukje Veenstra combines candid lyrics with catchy, synth-driven hooks. Since her 2021 debut, she's become a voice of her generation—ideal for mid-day festival stages.`,
//       englishDescription: `Breakthrough pop singer Froukje Veenstra combines candid lyrics with catchy, synth-driven hooks. Since her 2021 debut, she's become a voice of her generation—ideal for mid-day festival stages.`,
//     },
//   ];

//   return possibleActs[Math.floor(Math.random() * possibleActs.length)];
// }

function constructDateWithTime(
  date: "saturday" | "sunday",
  time: { hour: number; minute: number }
): Date {
  const day = dayjs(date === "saturday" ? "2025-09-06" : "2025-09-07")
    .hour(time.hour)
    .minute(time.minute);
  return day.toDate();
}

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("Database url is not defined.");
  }

  const db = drizzle(process.env.DATABASE_URL);

  await reset(db, schema);

  const stageIds = {
    poton: (
      await db
        .insert(stagesTable)
        .values({
          name: "Poton",
          xPosition: 62,
          yPosition: 78,
          dutchDescription: "Main stage",
          englishDescription: "Main stage",
        })
        .$returningId()
    )[0].id,
    theLake: (
      await db
        .insert(stagesTable)
        .values({
          name: "The Lake",
          xPosition: 45,
          yPosition: 46,
          dutchDescription: "Onbekend Talent",
          englishDescription: "Upcoming Talent",
        })
        .$returningId()
    )[0].id,
    theClub: (
      await db
        .insert(stagesTable)
        .values({
          name: "The Club",
          xPosition: 40,
          yPosition: 32,
          dutchDescription: "Theater en stand-up comedy",
          englishDescription: "Theater and stand-up comedy",
        })
        .$returningId()
    )[0].id,
    hangar: (
      await db
        .insert(stagesTable)
        .values({
          name: "Hangar",
          xPosition: 16,
          yPosition: 9,
          dutchDescription: "Non-stop house/techno/dance",
          englishDescription: "Non-stop house/techno/dance",
        })
        .$returningId()
    )[0].id,
  };

  const performances: (typeof performancesTable.$inferInsert)[] = [
    {
      title: "DJ Set 1",
      stageId: stageIds.hangar,
      startsAt: constructDateWithTime("saturday", { hour: 10, minute: 0 }),
      endsAt: constructDateWithTime("saturday", { hour: 11, minute: 0 }),
    },
    {
      title: "DJ Set 2",
      stageId: stageIds.hangar,
      startsAt: constructDateWithTime("saturday", { hour: 11, minute: 0 }),
      endsAt: constructDateWithTime("saturday", { hour: 12, minute: 30 }),
    },
    {
      title: "DJ Set 3",
      stageId: stageIds.hangar,
      startsAt: constructDateWithTime("saturday", { hour: 12, minute: 30 }),
      endsAt: constructDateWithTime("saturday", { hour: 14, minute: 0 }),
    },
    {
      title: "DJ Set 4",
      stageId: stageIds.hangar,
      startsAt: constructDateWithTime("saturday", { hour: 14, minute: 0 }),
      endsAt: constructDateWithTime("saturday", { hour: 15, minute: 30 }),
    },
    {
      title: "DJ Set 5",
      stageId: stageIds.hangar,
      startsAt: constructDateWithTime("saturday", { hour: 15, minute: 30 }),
      endsAt: constructDateWithTime("saturday", { hour: 17, minute: 30 }),
    },
    {
      title: "DJ Set 6",
      stageId: stageIds.hangar,
      startsAt: constructDateWithTime("saturday", { hour: 17, minute: 30 }),
      endsAt: constructDateWithTime("saturday", { hour: 19, minute: 30 }),
    },

    {
      title: "DJ Set 7",
      stageId: stageIds.hangar,
      startsAt: constructDateWithTime("saturday", { hour: 19, minute: 30 }),
      endsAt: constructDateWithTime("saturday", { hour: 21, minute: 30 }),
    },
    {
      title: "DJ Set 8",
      stageId: stageIds.hangar,
      startsAt: constructDateWithTime("saturday", { hour: 21, minute: 30 }),
      endsAt: constructDateWithTime("sunday", { hour: 0, minute: 0 }),
    },

    {
      title: "DJ Set 1",
      stageId: stageIds.hangar,
      startsAt: constructDateWithTime("sunday", { hour: 10, minute: 0 }),
      endsAt: constructDateWithTime("sunday", { hour: 10, minute: 30 }),
    },
    {
      title: "DJ Set 2",
      stageId: stageIds.hangar,
      startsAt: constructDateWithTime("sunday", { hour: 10, minute: 30 }),
      endsAt: constructDateWithTime("sunday", { hour: 12, minute: 30 }),
    },
    {
      title: "DJ Set 3",
      stageId: stageIds.hangar,
      startsAt: constructDateWithTime("sunday", { hour: 12, minute: 30 }),
      endsAt: constructDateWithTime("sunday", { hour: 13, minute: 30 }),
    },
    {
      title: "DJ Set 4",
      stageId: stageIds.hangar,
      startsAt: constructDateWithTime("sunday", { hour: 13, minute: 30 }),
      endsAt: constructDateWithTime("sunday", { hour: 15, minute: 30 }),
    },
    {
      title: "DJ Set 5",
      stageId: stageIds.hangar,
      startsAt: constructDateWithTime("sunday", { hour: 15, minute: 30 }),
      endsAt: constructDateWithTime("sunday", { hour: 17, minute: 0 }),
    },
    {
      title: "DJ Set 6",
      stageId: stageIds.hangar,
      startsAt: constructDateWithTime("sunday", { hour: 17, minute: 0 }),
      endsAt: constructDateWithTime("sunday", { hour: 18, minute: 30 }),
    },
    {
      title: "DJ Set 7",
      stageId: stageIds.hangar,
      startsAt: constructDateWithTime("sunday", { hour: 18, minute: 30 }),
      endsAt: constructDateWithTime("sunday", { hour: 21, minute: 0 }),
    },
    {
      title: "DJ Set 8",
      stageId: stageIds.hangar,
      startsAt: constructDateWithTime("sunday", { hour: 21, minute: 0 }),
      endsAt: constructDateWithTime("sunday", { hour: 24, minute: 0 }),
    },

    {
      title: "Pre-headliner zaterdag",
      stageId: stageIds.poton,
      startsAt: constructDateWithTime("saturday", { hour: 19, minute: 15 }),
      endsAt: constructDateWithTime("saturday", { hour: 21, minute: 15 }),
    },
    {
      title: "Headliner zaterdag",
      stageId: stageIds.poton,
      startsAt: constructDateWithTime("saturday", { hour: 22, minute: 0 }),
      endsAt: constructDateWithTime("saturday", { hour: 24, minute: 0 }),
    },

    {
      title: "Pre-headliner zondag",
      stageId: stageIds.poton,
      startsAt: constructDateWithTime("sunday", { hour: 19, minute: 15 }),
      endsAt: constructDateWithTime("sunday", { hour: 21, minute: 15 }),
    },
    {
      title: "Headliner zondag",
      stageId: stageIds.poton,
      startsAt: constructDateWithTime("sunday", { hour: 22, minute: 0 }),
      endsAt: constructDateWithTime("sunday", { hour: 24, minute: 0 }),
    },
  ];

  for (const performance of performances) {
    await db.insert(performancesTable).values(performance);
  }
}

await main();

console.log("Seeding complete!");

process.exit(0);
