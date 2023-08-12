"use client";

import Map, { FullscreenControl } from "react-map-gl";

// const Map = ReactMapboxGl({
//     accessToken: "pk.eyJ1IjoiZGlsbG9uZXJoYXJkdCIsImEiOiJjbGw3aWRuMGowYjlwM2xvNmR5eTV1YmcwIn0.fFq0bTKJSHTlv6820R-0Bw"
//   });

export default function MapScreen() {
  return (
    <Map
      mapboxAccessToken="pk.eyJ1IjoiZGlsbG9uZXJoYXJkdCIsImEiOiJjbGw3aWRuMGowYjlwM2xvNmR5eTV1YmcwIn0.fFq0bTKJSHTlv6820R-0Bw"
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14,
      }}
      //   fog={{
      //     range: [0.8, 8],
      //     color: "#ef3131",
      //     "horizon-blend": 0.5,
      //   }}
      projection={"globe" as any}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      <FullscreenControl />
    </Map>
  );
}
