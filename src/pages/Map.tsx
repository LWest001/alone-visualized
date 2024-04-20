import { Box, Center } from "@mantine/core";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import contestants from "../assets/contestants.json";
import { useState } from "react";

const geoUrl =
  "https://raw.githubusercontent.com/LWest001/alone-visualized/main/src/assets/north-america.geojson";

const countriesGeo =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

function Map() {
  const [text, setText] = useState("");
  const markers = contestants.map((c) => {
    return (
      <Marker
        coordinates={c.coords}
        key={c.name}
        onClick={() => setText(c.name)}
      >
        <circle
          r={2}
          fill={text !== c.name ? "#F53" : "#00ff00"}
          display={"flex"}
        />
      </Marker>
    );
  });
  return (
    <Center h="100%">
      <ComposableMap
        projection={"geoMercator"}
        projectionConfig={{ scale: 500, center: [0, 50] }}
      >
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography fill="white" key={geo.rsmKey} geography={geo} />
              ))
            }
          </Geographies>
          <Geographies geography={countriesGeo}>
            {({ geographies }) =>
              geographies
                .filter(
                  (g) =>
                    g.properties.name !== "United States of America" &&
                    g.properties.name !== "Canada"
                )
                .map((geo) => (
                  <Geography fill="white" key={geo.rsmKey} geography={geo} />
                ))
            }
          </Geographies>
          {markers}
        </ZoomableGroup>
      </ComposableMap>
    </Center>
  );
}

export default Map;
