import React, { useState } from "react";
import { QuestionType } from "./Faq";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";

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
          <Plus
            width={24}
            height={24}
            className={`transition-transform  ${isOpen ? "rotate-45" : ""}`}
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
