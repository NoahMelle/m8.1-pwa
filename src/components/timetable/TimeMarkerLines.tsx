import React from "react";

export default function TimeMarkerLines() {
  return (
    <div className="absolute flex w-full row-start-2 col-start-2 h-full">
      <div className="w-full h-full flex justify-between">
        {Array.from({ length: 29 }, (_, i) => {
          return <div className="border-l border-foreground/20" key={i}></div>;
        })}
      </div>
    </div>
  );
}
