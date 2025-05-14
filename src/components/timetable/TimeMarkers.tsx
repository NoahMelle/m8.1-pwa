import React from "react";

export default function TimeMarkers() {
  return (
    <div className="relative flex w-full col-start-2 h-fit">
      <div className="w-full h-fit grid grid-cols-14">
        {Array.from({ length: 14 }, (_, i) => {
          const hour = 10 + i;
          const timeLabel = hour < 24 ? `${hour}:00` : "00:00";
          return (
            <p className="text-xs h-fit text-gray-500" key={timeLabel}>
              {timeLabel}
            </p>
          );
        })}
      </div>
    </div>
  );
}
