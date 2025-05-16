import { reset } from "drizzle-seed";
import { performancesTable, stagesTable } from "./schemas";
import dayjs from "dayjs";
import "dotenv/config";
import * as schema from "./schemas/index";
import { drizzle } from "drizzle-orm/mysql2";
import utc from "dayjs/plugin/utc";

function constructDateWithTime(
  date: "saturday" | "sunday",
  time: { hour: number; minute: number }
): Date {
  dayjs.extend(utc);

  const day = dayjs
    .utc(date === "saturday" ? "2025-09-06" : "2025-09-07")
    .hour(time.hour)
    .minute(time.minute)
    .second(0)
    .millisecond(0);
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

  const hangarPerformances: (typeof performancesTable.$inferInsert)[] = [
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
  ];

  const potonPerformances: (typeof performancesTable.$inferInsert)[] = [
    {
      title: "Armin van Buuren",
      dutchDescription: `Five-time “World's No. 1 DJ” and trance icon, Armin delivers euphoric, high-energy sets that have headlined festivals from Tomorrowland to Ultra. His uplifting melodies and impeccable mixing keep crowds dancing for hours.`,
      englishDescription: `Five-time “World's No. 1 DJ” and trance icon, Armin delivers euphoric, high-energy sets that have headlined festivals from Tomorrowland to Ultra. His uplifting melodies and impeccable mixing keep crowds dancing for hours.`,
      stageId: stageIds.poton,
      videoUrl: "https://www.youtube.com/embed/TxvpctgU_s8?si=uoRzcQDl5e2keAqu",
      startsAt: constructDateWithTime("saturday", { hour: 10, minute: 30 }),
      endsAt: constructDateWithTime("saturday", { hour: 12, minute: 0 }),
    },
    {
      title: "Kensington",
      dutchDescription: `Rotterdam-born indie rock quintet known for soaring choruses and driving guitar riffs. Hits like “Streets” and “Riddles” showcase their knack for arena-ready hooks and emotionally charged lyricism.`,
      englishDescription: `Rotterdam-born indie rock quintet known for soaring choruses and driving guitar riffs. Hits like “Streets” and “Riddles” showcase their knack for arena-ready hooks and emotionally charged lyricism.`,
      videoUrl: "https://www.youtube.com/embed/IH77eOyV95o?si=F0AFd5Ub6cgQueMC",
      stageId: stageIds.poton,
      startsAt: constructDateWithTime("saturday", { hour: 12, minute: 30 }),
      endsAt: constructDateWithTime("saturday", { hour: 14, minute: 0 }),
    },

    {
      title: "De Staat",
      dutchDescription: `Experimental rock outfit from Nijmegen, blending funky grooves with angular guitar work and theatrical stagecraft. Tracks like “Witch Doctor” and “Down Town” highlight their genre-bending approach and infectious energy.`,
      englishDescription: `Experimental rock outfit from Nijmegen, blending funky grooves with angular guitar work and theatrical stagecraft. Tracks like “Witch Doctor” and “Down Town” highlight their genre-bending approach and infectious energy.`,
      videoUrl: "https://www.youtube.com/embed/0ttGgIQpAUc?si=7YCNukWo43p6y-qW",
      stageId: stageIds.poton,
      startsAt: constructDateWithTime("saturday", { hour: 14, minute: 30 }),
      endsAt: constructDateWithTime("saturday", { hour: 16, minute: 30 }),
    },
    {
      title: "Navarone",
      dutchDescription: `Utrecht's hard-hitting rock four-piece, delivering riff-driven anthems and dynamic vocals. With a live reputation for raw intensity, they're tailor-made for late-night main stages.`,
      englishDescription: `Utrecht's hard-hitting rock four-piece, delivering riff-driven anthems and dynamic vocals. With a live reputation for raw intensity, they're tailor-made for late-night main stages.`,
      videoUrl: "https://www.youtube.com/embed/EvLpaCSnc4k?si=pfWsK1wAuBbvAkQn",
      stageId: stageIds.poton,
      startsAt: constructDateWithTime("saturday", { hour: 17, minute: 0 }),
      endsAt: constructDateWithTime("saturday", { hour: 18, minute: 30 }),
    },
    {
      title: "Dotan",
      dutchDescription: `Folk-pop singer-songwriter whose intimate voice and acoustic arrangements (notably on “Home”) have earned him platinum sales and sell-out shows. His heartfelt storytelling connects deeply on festival acoustic stages.`,
      englishDescription: `Folk-pop singer-songwriter whose intimate voice and acoustic arrangements (notably on “Home”) have earned him platinum sales and sell-out shows. His heartfelt storytelling connects deeply on festival acoustic stages.`,
      videoUrl: "https://www.youtube.com/embed/FZEuqzW16Nw?si=sf-cFGrobFzRZyYt",
      stageId: stageIds.poton,
      startsAt: constructDateWithTime("saturday", { hour: 19, minute: 15 }),
      endsAt: constructDateWithTime("saturday", { hour: 21, minute: 15 }),
    },
    {
      title: "Froukje",
      dutchDescription: `Breakthrough pop singer Froukje Veenstra combines candid lyrics with catchy, synth-driven hooks. Since her 2021 debut, she's become a voice of her generation—ideal for mid-day festival stages.`,
      englishDescription: `Breakthrough pop singer Froukje Veenstra combines candid lyrics with catchy, synth-driven hooks. Since her 2021 debut, she's become a voice of her generation—ideal for mid-day festival stages.`,
      videoUrl: "https://www.youtube.com/embed/g4PlReX9e-E?si=UvSJ2iNJsECGXVQ0",
      stageId: stageIds.poton,
      startsAt: constructDateWithTime("saturday", { hour: 22, minute: 0 }),
      endsAt: constructDateWithTime("saturday", { hour: 24, minute: 0 }),
    },

    // SUNDAY
    {
      title: "Martin Garrix",
      dutchDescription: `Broke through as a teenager with “Animals,” Martin Garrix has become one of the biggest names in EDM. His anthemic big-room tracks and stadium-sized drops make him a festival favorite across Europe.`,
      englishDescription: `Broke through as a teenager with “Animals,” Martin Garrix has become one of the biggest names in EDM. His anthemic big-room tracks and stadium-sized drops make him a festival favorite across Europe.`,
      videoUrl: "https://www.youtube.com/embed/Zv1QV6lrc_Y?si=_yWEtH6m_uDtDJEd",
      stageId: stageIds.poton,
      startsAt: constructDateWithTime("sunday", { hour: 11, minute: 0 }),
      endsAt: constructDateWithTime("sunday", { hour: 13, minute: 0 }),
    },

    {
      title: "Within Temptation",
      dutchDescription: `Symphonic metal pioneers fronted by Sharon den Adel. Their cinematic soundscapes and operatic vocals (think “Ice Queen,” “Mother Earth”) translate into dramatic, visually stunning festival performances.`,
      englishDescription: `Symphonic metal pioneers fronted by Sharon den Adel. Their cinematic soundscapes and operatic vocals (think “Ice Queen,” “Mother Earth”) translate into dramatic, visually stunning festival performances.`,
      videoUrl: "https://www.youtube.com/embed/iQVei5C2N4E?si=_Vn5BfzP9sVRNYBa",
      stageId: stageIds.poton,
      startsAt: constructDateWithTime("sunday", { hour: 13, minute: 45 }),
      endsAt: constructDateWithTime("sunday", { hour: 15, minute: 45 }),
    },

    {
      title: "Chef'Special",
      dutchDescription: `A four-piece from Haarlem mixing funk, pop, rock and hip-hop. Their upbeat, genre-fluid sound on songs like “Amigo” and “In Your Arms” makes for joyous, dance-floor-friendly live shows.`,
      englishDescription: `A four-piece from Haarlem mixing funk, pop, rock and hip-hop. Their upbeat, genre-fluid sound on songs like “Amigo” and “In Your Arms” makes for joyous, dance-floor-friendly live shows.`,
      videoUrl: "https://www.youtube.com/embed/l3jRIr44lss?si=dx6f-EsHYDJD8HPc",
      stageId: stageIds.poton,
      startsAt: constructDateWithTime("sunday", { hour: 16, minute: 30 }),
      endsAt: constructDateWithTime("sunday", { hour: 18, minute: 30 }),
    },

    {
      title: "Eefje de Visser",
      dutchDescription: `Indie-pop artist crafting atmospheric, electronic-tinged songs. Her hypnotic vocals and lush production (as heard on “Ongeveer”) create a dreamlike vibe perfect for twilight festival slots.`,
      englishDescription: `Indie-pop artist crafting atmospheric, electronic-tinged songs. Her hypnotic vocals and lush production (as heard on “Ongeveer”) create a dreamlike vibe perfect for twilight festival slots.`,
      videoUrl: "https://www.youtube.com/embed/6IlLJNmLDMg?si=rDs2psBL8oI4VgNt",
      stageId: stageIds.poton,
      startsAt: constructDateWithTime("sunday", { hour: 19, minute: 15 }),
      endsAt: constructDateWithTime("sunday", { hour: 21, minute: 15 }),
    },

    {
      title: "Spinvis",
      englishDescription: `Erik de Jong performs under the moniker Spinvis, crafting poetic, collage-like songs that blend spoken-word snippets, lo-fi electronics and wistful pop. Since his debut album in 2002—recorded in his attic—he's become a fixture of Dutch indie, renowned for narratives that feel both intimate and surreal. His live shows turn everyday observations into shared, dreamlike experiences.`,
      dutchDescription: `Erik de Jong performs under the moniker Spinvis, crafting poetic, collage-like songs that blend spoken-word snippets, lo-fi electronics and wistful pop. Since his debut album in 2002—recorded in his attic—he's become a fixture of Dutch indie, renowned for narratives that feel both intimate and surreal. His live shows turn everyday observations into shared, dreamlike experiences.`,
      videoUrl: "https://www.youtube.com/embed/F3ZTrGWSLf4?si=11hberv0K9fE6gtD",
      stageId: stageIds.poton,
      startsAt: constructDateWithTime("sunday", { hour: 22, minute: 0 }),
      endsAt: constructDateWithTime("sunday", { hour: 24, minute: 0 }),
    },
  ];

  const lakePerformances: (typeof performancesTable.$inferInsert)[] = [
    {
      title: "Talent set 1",
      stageId: stageIds.theLake,
      startsAt: constructDateWithTime("saturday", { hour: 10, minute: 0 }),
      endsAt: constructDateWithTime("saturday", { hour: 11, minute: 0 }),
    },
    {
      title: "Talent set 2",
      stageId: stageIds.theLake,
      startsAt: constructDateWithTime("saturday", { hour: 11, minute: 30 }),
      endsAt: constructDateWithTime("saturday", { hour: 13, minute: 0 }),
    },

    {
      title: "Talent set 3",

      stageId: stageIds.theLake,
      startsAt: constructDateWithTime("saturday", { hour: 13, minute: 30 }),
      endsAt: constructDateWithTime("saturday", { hour: 15, minute: 0 }),
    },

    {
      title: "Talent set 4",

      stageId: stageIds.theLake,
      startsAt: constructDateWithTime("saturday", { hour: 15, minute: 30 }),
      endsAt: constructDateWithTime("saturday", { hour: 17, minute: 0 }),
    },

    {
      title: "Talent set 5",

      stageId: stageIds.theLake,
      startsAt: constructDateWithTime("saturday", { hour: 17, minute: 30 }),
      endsAt: constructDateWithTime("saturday", { hour: 18, minute: 30 }),
    },

    {
      title: "Talent set 6",

      stageId: stageIds.theLake,
      startsAt: constructDateWithTime("saturday", { hour: 19, minute: 15 }),
      endsAt: constructDateWithTime("saturday", { hour: 20, minute: 45 }),
    },

    {
      title: "Talent set 7",

      stageId: stageIds.theLake,
      startsAt: constructDateWithTime("saturday", { hour: 21, minute: 30 }),
      endsAt: constructDateWithTime("saturday", { hour: 23, minute: 0 }),
    },
    // SUNDAY

    {
      title: "Talent set 1",

      stageId: stageIds.theLake,
      startsAt: constructDateWithTime("sunday", { hour: 10, minute: 0 }),
      endsAt: constructDateWithTime("sunday", { hour: 11, minute: 0 }),
    },
    {
      title: "Talent set 2",

      stageId: stageIds.theLake,
      startsAt: constructDateWithTime("sunday", { hour: 11, minute: 30 }),
      endsAt: constructDateWithTime("sunday", { hour: 13, minute: 0 }),
    },

    {
      title: "Talent set 3",

      stageId: stageIds.theLake,
      startsAt: constructDateWithTime("sunday", { hour: 13, minute: 30 }),
      endsAt: constructDateWithTime("sunday", { hour: 15, minute: 0 }),
    },

    {
      title: "Talent set 4",

      stageId: stageIds.theLake,
      startsAt: constructDateWithTime("sunday", { hour: 15, minute: 30 }),
      endsAt: constructDateWithTime("sunday", { hour: 17, minute: 30 }),
    },

    {
      title: "Talent set 5",
      stageId: stageIds.theLake,
      startsAt: constructDateWithTime("sunday", { hour: 18, minute: 15 }),
      endsAt: constructDateWithTime("sunday", { hour: 19, minute: 45 }),
    },

    {
      title: "Talent set 6",

      stageId: stageIds.theLake,
      startsAt: constructDateWithTime("sunday", { hour: 20, minute: 30 }),
      endsAt: constructDateWithTime("sunday", { hour: 22, minute: 30 }),
    },
  ];

  const clubPerformances: (typeof performancesTable.$inferInsert)[] = [
    {
      title: "Comedy",
      stageId: stageIds.theClub,
      startsAt: constructDateWithTime("saturday", { hour: 12, minute: 15 }),
      endsAt: constructDateWithTime("saturday", { hour: 13, minute: 0 }),
    },
    {
      title: "Lecture",
      stageId: stageIds.theClub,
      startsAt: constructDateWithTime("saturday", { hour: 13, minute: 45 }),
      endsAt: constructDateWithTime("saturday", { hour: 14, minute: 30 }),
    },
    {
      title: "Theater",

      stageId: stageIds.theClub,
      startsAt: constructDateWithTime("saturday", { hour: 15, minute: 15 }),
      endsAt: constructDateWithTime("saturday", { hour: 16, minute: 45 }),
    },

    {
      title: "Movie",

      stageId: stageIds.theClub,
      startsAt: constructDateWithTime("saturday", { hour: 17, minute: 30 }),
      endsAt: constructDateWithTime("saturday", { hour: 19, minute: 30 }),
    },

    {
      title: "Performance",

      stageId: stageIds.theClub,
      startsAt: constructDateWithTime("saturday", { hour: 20, minute: 15 }),
      endsAt: constructDateWithTime("saturday", { hour: 21, minute: 15 }),
    },

    {
      title: "Illusionist",

      stageId: stageIds.theClub,
      startsAt: constructDateWithTime("saturday", { hour: 22, minute: 0 }),
      endsAt: constructDateWithTime("saturday", { hour: 23, minute: 0 }),
    },

    // SUNDAY
    {
      title: "Comedy",

      stageId: stageIds.theClub,
      startsAt: constructDateWithTime("sunday", { hour: 12, minute: 0 }),
      endsAt: constructDateWithTime("sunday", { hour: 12, minute: 45 }),
    },
    {
      title: "Lecture",

      stageId: stageIds.theClub,
      startsAt: constructDateWithTime("sunday", { hour: 13, minute: 30 }),
      endsAt: constructDateWithTime("sunday", { hour: 14, minute: 30 }),
    },
    {
      title: "Theater",

      stageId: stageIds.theClub,
      startsAt: constructDateWithTime("sunday", { hour: 15, minute: 30 }),
      endsAt: constructDateWithTime("sunday", { hour: 16, minute: 30 }),
    },

    {
      title: "Movie",

      stageId: stageIds.theClub,
      startsAt: constructDateWithTime("sunday", { hour: 17, minute: 30 }),
      endsAt: constructDateWithTime("sunday", { hour: 19, minute: 30 }),
    },

    {
      title: "Magic Show",

      stageId: stageIds.theClub,
      startsAt: constructDateWithTime("sunday", { hour: 20, minute: 15 }),
      endsAt: constructDateWithTime("sunday", { hour: 21, minute: 45 }),
    },
  ];

  const performances: (typeof performancesTable.$inferInsert)[] = [
    ...potonPerformances,
    ...hangarPerformances,
    ...lakePerformances,
    ...clubPerformances,
  ];

  for (const performance of performances) {
    await db.insert(performancesTable).values(performance);
  }
}

await main();

console.log("Seeding complete!");

process.exit(0);
