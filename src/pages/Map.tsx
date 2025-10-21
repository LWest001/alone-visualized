import { Box, Center, Paper, Stack, Text } from "@mantine/core";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import contestants from "../assets/contestants.json";
import { useCallback, useMemo, useState } from "react";
import { Contestant } from "../contestant";
import { ChartTooltip } from "./DaysSurvived/ChartTooltip";
import SeasonSelector from "../components/SeasonSelector";
import { useSearchParams } from "react-router-dom";

const geoUrl =
  "https://raw.githubusercontent.com/LWest001/alone-visualized/main/src/assets/north-america.geojson";

const countriesGeo =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const colorMap = {
  "1": "red",
  "2": "orange",
  "3": "goldenrod",
  "4": "lightgreen",
  "5": "darkgreen",
  "6": "darkblue",
  "7": "lightblue",
  "8": "purple",
  "9": "wheat",
  "10": "magenta",
};

function Map() {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChangeSeason(val: string) {
    setSearchParams({ s: val });
  }

  const season = searchParams.get("s");

  const [active, setActive] = useState<Contestant | undefined>();

  const isActive = useCallback(
    (c: Contestant) => {
      return active?.name === c?.name;
    },
    [active]
  );

  const markers = useMemo(
    () =>
      contestants.map((c) => {
        return (
          (season === "All" || season === null || c.season === season) && (
            <Marker
              coordinates={c.coords as [number, number]}
              key={c.name}
              onClick={() => setActive(c)}
              cursor={"pointer"}
            >
              <circle
                r={!isActive(c) ? 5 : 3}
                fill={
                  !isActive(c)
                    ? colorMap[
                        c.season as
                          | "1"
                          | "2"
                          | "3"
                          | "4"
                          | "5"
                          | "6"
                          | "7"
                          | "8"
                          | "9"
                          | "10"
                      ]
                    : "white"
                }
                display={"flex"}
                stroke={isActive(c) ? "black" : undefined}
              />
            </Marker>
          )
        );
      }),
    [isActive, season]
  );

  return (
    <Stack h="100%">
      <Text>
        Explore where Alone contestants are from and see how their home regions
        span across the map. You can click on a marker to see who it represents,
        then click again to hide the contestant. Marker colors are assigned by
        season.
      </Text>
      <Paper withBorder p="sm">
        <SeasonSelector
          active={season || undefined}
          onChange={handleChangeSeason}
        />
      </Paper>
      {active && (
        <Box onClick={() => setActive(undefined)}>
          <ChartTooltip
            label={active?.name}
            payload={active}
            style={{
              position: "fixed",
              right: "10%",
              bottom: "10%",
              zIndex: 10000000,
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
