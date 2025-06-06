import React from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";

export default function Popup({
  children,
  hidePopup,
  heading,
}: {
  children?: React.ReactNode;
  hidePopup: () => void;
  heading: string;
}) {
  return (
    <motion.div
      className="fixed bg-black/20 dark:bg-black/60 left-0 top-0 h-[100dvh] w-full z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        className="w-full h-full absolute"
        aria-label="Hide popup"
        onClick={hidePopup}
      ></button>
      <motion.div
        className="h-full w-full flex items-center justify-center p-4"
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
        <div className="bg-white dark:bg-neutral-900 border-white/10 border p-4 rounded-md relative z-20 w-full max-w-[400px] max-h-full overflow-hidden flex flex-col">
          <div className="w-full justify-between flex items-center mb-2">
            <h3 className="font-semibold text-lg">{heading}</h3>
            <button onClick={hidePopup} aria-label="Hide popup">
              <X />
            </button>
          </div>
          <div className="h-full overflow-y-auto min-h-0">
            <div>{children}</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
