import Spinner from "@/components/reusable/Spinner";
import TimetableServer from "@/components/timetable/TimetableServer";
import React, { Suspense } from "react";

export default async function TimetablePage() {
  return (
    <div className="p-4 grow flex flex-col gap-8">
      <h1 className="text-center text-5xl">Timetable</h1>
      <Suspense
        fallback={
          <div className="w-full flex items-center h-full justify-center">
            <Spinner />
          </div>
        }
      >
        <TimetableServer />
      </Suspense>
    </div>
  );
}
