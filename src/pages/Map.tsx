import { Box, Center, Stack, Text } from "@mantine/core";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import contestants from "../assets/contestants.json";
import { useCallback, useState } from "react";
import { Contestant } from "../contestant";
import { ChartTooltip } from "./DaysSurvived/ChartTooltip";

const geoUrl =
  "https://raw.githubusercontent.com/LWest001/alone-visualized/main/src/assets/north-america.geojson";

const countriesGeo =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

function Map() {
  const [active, setActive] = useState<Contestant | undefined>();

  const isActive = useCallback(
    (c: Contestant) => {
      return active?.name === c?.name;
    },
    [active]
  );

  const markers = contestants.map((c) => {
    return (
      <Marker
        coordinates={c.coords as [number, number]}
        key={c.name}
        onClick={() => setActive(c)}
        stroke="black"
        strokeWidth={".5"}
        cursor={"pointer"}
      >
        <circle
          r={!isActive(c) ? 5 : 3}
          fill={!isActive(c) ? "#F53" : "#00ff00"}
          display={"flex"}
        />
      </Marker>
    );
  });

  return (
    <Stack h="100%">
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
            style={{
              position: "fixed",
              right: "10%",
              bottom: "10%",
            }}
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
                      hover: { fill: "lightgray" },
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
