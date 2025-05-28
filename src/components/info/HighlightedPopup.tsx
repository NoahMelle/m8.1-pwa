import React, { Dispatch, SetStateAction } from "react";
import { TransportOption } from "./TransportOptions";
import { motion } from "motion/react";
import { X } from "lucide-react";

export default function HighlightedPopup({
  option,
  setIsShowing,
}: {
  option: TransportOption;
  setIsShowing: Dispatch<SetStateAction<TransportOption | null>>;
}) {
  return (
    <motion.div
      className="fixed bg-black/20 dark:bg-black/60 p-4 left-0 top-0 h-[100dvh] w-full z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        className="w-full h-full absolute"
        onClick={() => setIsShowing(null)}
      ></button>
      <motion.div
        className="h-full w-full flex items-center justify-center"
        initial={{
          y: "100%",
        }}
        animate={{
          y: 0,
        }}
        exit={{
          y: "100%",
        }}
        transition={{
          duration: 0.2,
        }}
      >
        <div className="bg-white dark:bg-neutral-900 border-white/10 border p-4 rounded-md relative z-20">
          <div className="w-full justify-between flex items-center mb-2">
            <h3 className="font-semibold text-lg">{option.name}</h3>
            <button onClick={() => setIsShowing(null)}>
              <X />
            </button>
          </div>
          <p className="whitespace-pre-wrap">{option.description.trim()}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
