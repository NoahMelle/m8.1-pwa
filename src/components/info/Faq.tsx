"use client";

import { messages } from "@/i18n/messages";
import { useTranslations } from "@/i18n/useTranslations";
import React from "react";
import Question from "./Question";

export interface QuestionType {
  question: string;
  answer: string;
}

export default function Faq() {
  const t = useTranslations();

  const questions: QuestionType[] = [
    {
      question: t({
        nl: "Ik gebruik medicatie. Wat nu?",
        en: "I am taking medication. What should I do?",
      }),
      answer: t({
        en: `You are allowed to take medication in a dose that you need for 1 day. A doctor's statement/medication passport is required.
Security will assess your documentation and check the medication. It is possible that the first aid will take your medication (for example if it is dangerous in combination with alcohol) into custody and you can only take it at the first aid.`,
        nl: `Het is toegestaan om medicijnen mee te nemen in een dosis die je maximaal nodig hebt op 1 dag. Een doktersverklaring/medicatiepaspoort is noodzakelijk.
De beveiliging zal jouw documentatie beoordelen en de medicijnen controleren. Het kan zijn dat de EHBO jouw medicijnen (bijvoorbeeld als deze gevaarlijk zijn i.c.m. alcohol) in bewaring neemt en je deze enkel kan innemen bij de EHBO.`,
      }),
    },
    {
      question: t({
        en: "Can I leave the festival grounds during the event?",
        nl: "Mag ik het festivalterrein tussentijds verlaten?",
      }),
      answer: t({
        en: `No, unfortunately that is not possible. In order to guarantee the safety of all visitors, we cannot allow the festival site to be left in between. We have no insight into what a visitor does outside the festival site and in what state they enter the site again. Therefore, no exceptions can be made for this. We have enough lounge areas, food stands & bars to last a whole day.`,
        nl: `Nee, helaas is dat niet mogelijk. Om de veiligheid van alle bezoekers te kunnen waarborgen, kunnen we het niet toestaan dat het festivalterrein tussentijds verlaten wordt. Wij hebben namelijk geen zicht op hetgeen wat een bezoeker buiten het festivalterrein doet en ik welke staat deze het terrein weer betreedt. Hier kunnen dan ook geen uitzonderingen voor gemaakt worden. Wij hebben genoeg loungeplekken, foodstands & barren om het een hele dag uit te kunnen houden.`,
      }),
    },
    {
      question: t({
        en: "Are there lockers?",
        nl: "Zijn er lockers?",
      }),
      answer: t({
        en: `Yes, these are available! On site you can rent medium & large lockers.`,
        nl: `Yes, deze zijn er! Op het terrein kun je medium & grote lockers huren.`,
      }),
    },
  ];

  return (
    <div>
      <h2>{t(messages.info.faq)}</h2>
      <div>
        {questions.map((question) => (
          <Question key={question.question} question={question} />
        ))}
      </div>
    </div>
  );
}
