import { ScatterChart } from "@mantine/charts";
import data from "../../assets/contestantgroups.json";

export function DaysScatter() {
  return (
    <ScatterChart
      h={400}
      my={20}
      data={data}
      withTooltip={false}
      dataKey={{ y: "season", x: "status" }}
      gridAxis="xy"
      xAxisLabel="Days survived"
      yAxisLabel="Season"
      yAxisProps={{ domain: [0, 10], tickCount: 11, interval: 0 }}
      xAxisProps={{ domain: [0, 100], tickCount: 11, interval: 0 }}
    />
  );
}
