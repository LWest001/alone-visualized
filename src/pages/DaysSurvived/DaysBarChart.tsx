import { BarChart } from "@mantine/charts";
import { Paper, Stack } from "@mantine/core";
import data from "../../assets/contestants.json";
import { useSearchParams } from "react-router-dom";
import { Contestant } from "../../contestant";
import { useEffect } from "react";
import { ChartTooltip } from "./ChartTooltip";
import SeasonSelector from "../../components/SeasonSelector";

export interface ChartTooltipProps {
  label: string;
  payload: Contestant | undefined;
}

export function DaysBarChart() {
  const [searchParams, setSearchParams] = useSearchParams();
  const season = searchParams.get("s");

  useEffect(() => {
    if (!season) {
      setSearchParams({ ...searchParams, s: "All" });
    }
  }, [searchParams, season, setSearchParams]);

  function handleChangeSeason(val: string) {
    setSearchParams({ s: val });
  }
  return (
    <Stack>
      <Paper withBorder p="sm">
        <SeasonSelector
          active={season || undefined}
          onChange={handleChangeSeason}
        />
      </Paper>
      <BarChart
        data={
          season === "All"
            ? data.sort((a, b) => (a.status < b.status ? 1 : -1))
            : data.filter((contestant) => contestant.season === season)
        }
        series={[{ name: "status", color: "violet.6", label: "Days survived" }]}
        dataKey="firstname"
        h={season === "All" ? 2500 : 400}
        orientation="vertical"
        xAxisProps={{ domain: [0, 100] }}
        yAxisProps={{ interval: 0 }}
        gridAxis="xy"
        tooltipProps={{
          content: (item) => (
            <ChartTooltip
              label={item?.payload?.[0]?.payload.name}
              payload={item?.payload?.[0]?.payload}
            />
          ),
          position: { x: undefined },
        }}
      />
    </Stack>
  );
}
