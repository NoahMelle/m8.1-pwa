"use client";

import Image from "next/image";
import React, { Suspense, useState } from "react";
import {
  KeepScale,
  ReactZoomPanPinchRef,
  TransformComponent,
  TransformWrapper,
} from "react-zoom-pan-pinch";

interface Location {
  name: string;
  position: {
    x: number;
    y: number;
  };
}

export default function ZoomableMap() {
  const [scale, setScale] = useState(1);

  function handleTransform(e: ReactZoomPanPinchRef) {
    setScale(e.instance.transformState.scale);
  }

  const locations: Location[] = [
    {
      position: {
        x: 62,
        y: 78,
      },
      name: "Ponton",
    },
  ];

  return (
    <div className="overflow-hidden h-full">
      <Suspense fallback={"Loading...."}>
        <TransformWrapper
          initialScale={1.5}
          centerOnInit={true}
          centerZoomedOut
          limitToBounds
          minScale={1}
          onTransformed={(e) => handleTransform(e)}
        >
          <TransformComponent wrapperClass="w-full! h-full!">
            <div>
              {locations.map((location) => (
                <KeepScale
                  key={location.name}
                  style={{
                    left: `${location.position.x}%`,
                    top: `${location.position.y}%`,
                  }}
                  className="absolute  -translate-1/2"
                >
                  <div className="h-4 w-4 rounded-full bg-background border-foreground border-2"></div>
                  {scale > 3 && (
                    <h3 className="absolute -top-8 left-1/2 -translate-x-1/2 bg-background px-2 py-1 leading-tight rounded-sm">
                      {location.name}
                    </h3>
                  )}
                </KeepScale>
              ))}
              <Image
                src={"/img/map.png"}
                sizes="100vh"
                alt="Map of the terrain"
                width={0}
                height={0}
                className="w-full h-full"
              />
            </div>
          </TransformComponent>
        </TransformWrapper>
      </Suspense>
    </div>
  );
}
