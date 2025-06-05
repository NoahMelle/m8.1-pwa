import { messages } from "@/i18n/messages";
import { useTranslations } from "@/i18n/useTranslations";
import {
  IceCream,
  Lock,
  LucideIcon,
  Martini,
  Plus,
  ShieldPlus,
  Shirt,
  Toilet,
  Utensils,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";

interface Icon {
  name: string;
  Icon: LucideIcon | string;
}

export default function Legend() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations();

  const icons: Icon[] = [
    {
      name: "Ponton",
      Icon: "1",
    },
    {
      name: "The Lake",
      Icon: "2",
    },
    {
      name: "The Club",
      Icon: "3",
    },
    {
      name: "Hangar",
      Icon: "4",
    },
    {
      name: "Toilet",
      Icon: Toilet,
    },
    {
      name: "Merchandise",
      Icon: Shirt,
    },
    {
      name: "Ice Cream",
      Icon: IceCream,
    },
    {
      name: "Food",
      Icon: Utensils,
    },
    {
      name: "Bar",
      Icon: Martini,
    },
    {
      name: "First Aid",
      Icon: ShieldPlus,
    },
    {
      name: "Locker",
      Icon: Lock,
    },
  ];

  return (
    <div className="fixed bottom-18 left-0 px-2 w-full flex flex-col space-y-2 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="z-50 bg-background p-4 rounded-lg w-full shadow-lg origin-bottom"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <h3 className="text-lg font-semibold mb-2">
              {t(messages.map.legend)}
            </h3>
            <ul className="space-y-2">
              {icons.map((icon) => (
                <li key={icon.name} className="flex items-center space-x-2">
                  {typeof icon.Icon === "string" ? (
                    <span className="inline-block w-6 h-6 text-center">
                      {icon.Icon}
                    </span>
                  ) : (
                    <icon.Icon className="w-6 h-6" />
                  )}
                  <span>{icon.name}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        className="z-50 bg-background active:scale-[97%] text-foreground px-4 h-12 flex items-center gap-2 rounded-full shadow-lg w-full  justify-between transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        {t(messages.map.legend)}
        <Plus className={`${isOpen ? "rotate-45" : ""} transition-transform`} />
      </button>
    </div>
  );
}
