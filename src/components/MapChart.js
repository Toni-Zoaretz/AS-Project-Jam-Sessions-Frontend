import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { useJamSessionGlobalContext } from "../context/jamContext";
import { useUserGlobalContext } from "../context/userContext";

const geoUrl =
  "https://raw.githubusercontent.com/samateja/D3topoJson/master/israel.json";

const MapChart = () => {
  const { getUserContactInfoByName } = useUserGlobalContext();

  const { allJamSessions } = useJamSessionGlobalContext();

  const markers = allJamSessions.map((jamSession) => ({
    markerOffset: 7,
    name: jamSession.jamSessionName,
    coordinates: jamSession.location.coordinates,
    creator: jamSession.user_id ? jamSession.user_id.name : "unavailable",
  }));

  return (
    <div className="map-container">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: [35.0, 31.5],
          scale: 5000,
        }}
        width={500}
        height={450}
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
        {markers.map(({ name, coordinates, markerOffset, creator }) => (
          <Marker key={name} coordinates={coordinates} creator={creator}>
            <g
              fill="none"
              stroke="#FF5533"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              transform="translate(-12, -24)"
            >
              <circle cx="12" cy="10" r="3" />
              <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
            </g>
            <text
              onClick={() => getUserContactInfoByName(creator)}
              textAnchor="middle"
              y={markerOffset}
              style={{
                fontFamily: "system-ui",
                fill: "#5D5A6D",
                fontSize: "10px",
                cursor: "pointer",
              }}
            >
              {name}
            </text>
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
};

export default MapChart;
