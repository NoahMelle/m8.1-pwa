import React, { useState } from "react";
import { QuestionType } from "./Faq";
import Image from "next/image";

export default function Question({ question }: { question: QuestionType }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="py-4 flex flex-col gap-2">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex justify-between w-full"
        >
          <span>{question.question}</span>
          <Image
            src={"/icons/plus.svg"}
            alt="Plus"
            width={24}
            height={24}
            className={`transition-transform dark:invert-0 invert ${
              isOpen ? "rotate-45" : ""
            }`}
          />
        </button>
        {isOpen && <p>{question.answer}</p>}
      </div>

      <hr className="opacity-50" />
    </div>
  );
}
