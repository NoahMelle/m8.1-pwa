"use client";

import { PerformanceWithStageType } from "@/@types/types";
import { favouriteActsSchema } from "@/lib/schemas";
import { toggleArrayItem } from "@/lib/utils";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface TimetableClientType {
  initialActs: Record<
    "saturday" | "sunday",
    Map<string, PerformanceWithStageType[]>
  >;
  allActs: PerformanceWithStageType[];
  setAllActs: Dispatch<SetStateAction<PerformanceWithStageType[]>>;

  groupedActs: Map<string, PerformanceWithStageType[]>;
  setGroupedActs: Dispatch<
    SetStateAction<Map<string, PerformanceWithStageType[]>>
  >;

  favouriteActs: number[] | null;
  setFavouriteActs: Dispatch<SetStateAction<number[] | null>>;

  toggleFavouriteAct: (id: number) => void;
}

export const useTimetable = () => {
  const ctx = useContext(TimetableContext);

  if (!ctx) {
    throw new Error("Context has not been initialized");
  }

  return ctx;
};

const TimetableContext = createContext<TimetableClientType | null>(null);

export const TimetableContextProvider = ({
  initialGroupedActs,
  children,
}: {
  initialGroupedActs: Record<
    "saturday" | "sunday",
    Map<string, PerformanceWithStageType[]>
  >;
  children: React.ReactNode;
}) => {
  const [groupedActs, setGroupedActs] = useState(initialGroupedActs.saturday);
  const [favouriteActs, setFavouriteActs] = useState<number[] | null>(null);
  const [allActs, setAllActs] = useState<PerformanceWithStageType[]>(
    Array.from(initialGroupedActs.saturday.values()).flat()
  );

  const toggleFavouriteAct = (id: number) => {
    setFavouriteActs((prev) => (!prev ? [id] : toggleArrayItem(prev, id)));
  };

  useEffect(() => {
    const localStorageItem = localStorage.getItem("favourite-acts");

    if (localStorageItem) {
      try {
        const localStorageItemJson = JSON.parse(localStorageItem);

        const parseRes = favouriteActsSchema.parse(localStorageItemJson);

        setFavouriteActs(parseRes);
      } catch {
        localStorage.removeItem("favourite-acts");
        setFavouriteActs([]);
      }
    } else {
      setFavouriteActs([]);
    }
  }, []);

  useEffect(() => {
    if (favouriteActs) {
      localStorage.setItem("favourite-acts", JSON.stringify(favouriteActs));
    }
  }, [favouriteActs]);

  return (
    <TimetableContext.Provider
      value={{
        initialActs: initialGroupedActs,
        groupedActs: groupedActs,
        setGroupedActs,
        favouriteActs,
        setFavouriteActs,
        toggleFavouriteAct,
        allActs,
        setAllActs,
      }}
    >
      {children}
    </TimetableContext.Provider>
  );
};
