import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { useJamSessionGlobalContext } from "../context/jamContext";

const geoUrl =
  "https://raw.githubusercontent.com/samateja/D3topoJson/master/israel.json";

const MapChart = () => {
  const { allJamSessions } = useJamSessionGlobalContext();

  const markers = allJamSessions.map((jamSession) => ({
    markerOffset: 15,
    name: jamSession.jamSessionName,
    coordinates: jamSession.location.coordinates,
  }));

  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{
        center: [35.0, 31.5],
        scale: 5000,
      }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#EAEAEC"
              stroke="#D6D6DA"
            />
          ))
        }
      </Geographies>
      {markers.map(({ name, coordinates, markerOffset }) => (
        <Marker key={name} coordinates={coordinates}>
          <g
            fill="none"
            stroke="#FF5533"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(-12, -24)"
          >
            <circle cx="12" cy="10" r="3" />
            <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
          </g>
          <text
            textAnchor="middle"
            y={markerOffset}
            style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
          >
            {name}
          </text>
        </Marker>
      ))}
    </ComposableMap>
  );
};

export default MapChart;
