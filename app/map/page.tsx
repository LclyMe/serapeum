"use client";

import Map, { FullscreenControl } from "react-map-gl";

export default function MapScreen() {
  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14,
      }}
      projection={"globe" as any}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      <FullscreenControl />
    </Map>
  );
}
