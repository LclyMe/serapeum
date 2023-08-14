"use client";

import Map, { Marker } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

export default function VaultMap({ entries }: { entries: any[] }) {
  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
      initialViewState={{
        longitude: entries[0].longitude,
        latitude: entries[0].latitude,
        zoom: 6,
      }}
      fog={{
        range: [0.1, 0.8],
        color: "#aaa",
        "horizon-blend": 0.1,
      }}
      projection={"globe" as any}
      style={{
        width: "100%",
        height: "100%",
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid #99999960",
      }}
      attributionControl={false}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      {entries?.map((entry) => (
        <Marker
          key={entry.id}
          longitude={entry.longitude}
          latitude={entry.latitude}
          anchor="bottom"
        />
      ))}
    </Map>
  );
}
