import { Box, Center, Stack, Text } from "@mantine/core";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import contestants from "../assets/contestants.json";
import { useState } from "react";
import { Contestant } from "../contestant";
import { ChartTooltip } from "./DaysSurvived/ChartTooltip";

const geoUrl =
  "https://raw.githubusercontent.com/LWest001/alone-visualized/main/src/assets/north-america.geojson";

const countriesGeo =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

function Map() {
  const [active, setActive] = useState<Contestant | undefined>();
  const markers = contestants.map((c) => {
    return (
      <Marker
        coordinates={c.coords as [number, number]}
        key={c.name}
        onClick={() => setActive(c)}
        stroke="black"
        strokeWidth={".5"}
        style={{
          pressed: {
            fill: "#00ff00",
          },
        }}
      >
        <circle
          r={2}
          fill={active?.name !== c.name ? "#F53" : "#00ff00"}
          display={"flex"}
        />
      </Marker>
    );
  });

  return (
    <Stack mah="100%">
      <Text>
        Explore where Alone contestants are from and see how their home regions
        span across the map. You can click on a marker to see who it represents,
        then click again to hide the contestant.
      </Text>
      {active && (
        <Box onClick={() => setActive(undefined)}>
          <ChartTooltip
            label={active?.name}
            payload={active}
            style={{ position: "fixed", top: "50%", left: "50%" }}
          />
        </Box>
      )}
      <Center>
        <ComposableMap
          projection={"geoMercator"}
          projectionConfig={{ scale: 500, center: [0, 50] }}
        >
          <ZoomableGroup center={[-100, 45]}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    strokeWidth={1}
                    stroke="black"
                    fill="white"
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => setActive(undefined)}
                    style={{
                      pressed: { fill: "#00ff00", stroke: "#00ff00" },
                      hover: { fill: "#00ff00" },
                    }}
                  />
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
                    <Geography
                      strokeWidth={1}
                      stroke="black"
                      fill="white"
                      key={geo.rsmKey}
                      geography={geo}
                    />
                  ))
              }
            </Geographies>
            {markers}
          </ZoomableGroup>
        </ComposableMap>
      </Center>
    </Stack>
  );
}

export default Map;
