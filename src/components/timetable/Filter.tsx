import { toggleArrayItem } from "@/lib/utils";
import React, { Dispatch, SetStateAction } from "react";

export default function Filter({
  genre,
  selectedGenres,
  setSelectedGenres,
}: {
  genre: { name: string; id: number };
  selectedGenres: number[];
  setSelectedGenres: Dispatch<SetStateAction<number[]>>;
}) {
  return (
    <label className="has-checked:bg-red has-checked:text-white bg-transparent border-red transition-colors border-2 px-4 py-1 rounded-full text-sm block">
      <input
        type="checkbox"
        onChange={() =>
          setSelectedGenres((prev) => toggleArrayItem(prev, genre.id))
        }
        checked={selectedGenres.includes(genre.id)}
        className="sr-only"
      />
      {genre.name}
    </label>
  );
}
