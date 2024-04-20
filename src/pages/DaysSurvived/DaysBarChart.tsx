import { BarChart } from "@mantine/charts";
import { Chip, Group, MantineStyleProp, Paper, Stack } from "@mantine/core";
import data from "../../assets/contestants.json";
import { useSearchParams } from "react-router-dom";
import { Contestant } from "../../contestant";
import { useEffect, useState } from "react";
import { ChartTooltip } from "./ChartTooltip";
import SeasonSelector from "../../components/SeasonSelector";

export interface ChartTooltipProps {
  label: string;
  payload: Contestant | undefined;
  style?: MantineStyleProp;
}

export function DaysBarChart() {
  const [filter, setFilter] = useState<string | undefined>();
  const [searchParams, setSearchParams] = useSearchParams();
  const season = searchParams.get("s");

  useEffect(() => {
    if (!season) {
      setSearchParams({ ...searchParams, s: "All" });
    }
  }, [searchParams, season, setSearchParams]);

  function handleFilter(val: string[]) {
    setFilter((prev) => (prev === val[1] ? undefined : val[1]));
  }

  function handleChangeSeason(val: string) {
    setFilter(undefined);
    setSearchParams({ s: val });
  }
  return (
    <Stack>
      <Paper withBorder p="sm">
        <SeasonSelector
          active={season || undefined}
          onChange={handleChangeSeason}
        />
        {season === "All" && (
          <Chip.Group value={[filter]} onChange={handleFilter} multiple>
            <Group>
              <Chip value={"winner"} color="orange">
                Winner
              </Chip>
              <Chip value={"medically_evacuated"} color="red">
                Medically Evacuated
              </Chip>
            </Group>
          </Chip.Group>
        )}
      </Paper>
      <BarChart
        data={
          season === "All"
            ? data
                .filter((c) =>
                  filter === "medically_evacuated"
                    ? c.medically_evacuated === true
                    : filter === "winner"
                    ? c.winner === true
                    : c
                )
                .sort((a, b) => (a.status < b.status ? 1 : -1))
            : data.filter((contestant) => contestant.season === season)
        }
        series={[{ name: "status", color: "violet.6", label: "Days survived" }]}
        dataKey="firstname"
        h={
          season === "All" && filter === undefined
            ? 2500
            : filter === "medically_evacuated"
            ? 800
            : 400
        }
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
