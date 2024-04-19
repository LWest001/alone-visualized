import { Box } from "@mantine/core";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import contestants from "../assets/contestants.json";
import cities from "../assets/uscities.json";
import cancities from "../assets/canadacities.json";

const geoUrl =
  "https://raw.githubusercontent.com/LWest001/alone-visualized/main/src/assets/north-america.geojson";


function Map() {
  return (
    <Box h="100%" bg="red">
      <ComposableMap
        projection={"geoAlbers"}
        projectionConfig={{ scale: 500, center: [0, 50] }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography fill="white" key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>
      </ComposableMap>
    </Box>
  );
}

export default Map;
