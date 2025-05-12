import React from "react";
import Spinner from "../reusable/Spinner";

export default function Loading() {
  return (
    <div className="absolute h-full w-full top-0 left-0 bg-green z-[1] flex justify-center items-center">
      <Spinner />
    </div>
  );
}
