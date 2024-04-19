import { Box } from "@mantine/core";
import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

function Map() {
  return (
    <Box>
      <ComposableMap>
        <Geographies geography={"../assets/north-america.geojson"}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>
      </ComposableMap>
    </Box>
  );
}

export default Map;
