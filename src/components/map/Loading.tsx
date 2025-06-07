import React from "react";
import Spinner from "../reusable/Spinner";

export default function Loading() {
  return (
    <div className="absolute h-full w-full top-0 left-0 bg-green z-[1] flex justify-center items-center">
      <Spinner className="text-black/50 dark:text-black/50" />
    </div>
  );
}
