import Spinner from "@/components/reusable/Spinner";
import TimetableServer from "@/components/timetable/TimetableServer";
import React, { Suspense } from "react";

export default async function TimetablePage() {
  return (
    <>
      <h1>Timetable</h1>
      <Suspense
        fallback={
          <div className="w-full flex items-center h-full justify-center">
            <Spinner />
          </div>
        }
      >
        <TimetableServer />
      </Suspense>
    </>
  );
}
