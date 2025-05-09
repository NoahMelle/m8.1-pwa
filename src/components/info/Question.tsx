import React, { useState } from "react";
import { QuestionType } from "./Faq";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

export default function Question({ question }: { question: QuestionType }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="flex flex-col">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex justify-between w-full py-4 text-start"
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
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <p className="pb-4 whitespace-pre-wrap">{question.answer}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <hr className="opacity-50" />
    </div>
  );
}
