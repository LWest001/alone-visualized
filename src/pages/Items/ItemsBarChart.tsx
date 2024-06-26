import { BarChart } from "@mantine/charts";
import {
  Box,
  Button,
  Checkbox,
  Group,
  Paper,
  SegmentedControl,
  Stack,
  Text,
} from "@mantine/core";
import contestants from "../../assets/contestants.json";
import items from "../../assets/items.json";
import { useSearchParams } from "react-router-dom";
import { Contestant } from "../../contestant";
import { useCallback, useEffect, useMemo, useState } from "react";
import DisplayToggle from "../../components/DisplayToggle";
import { useDisclosure } from "@mantine/hooks";
import SeasonSelector from "../../components/SeasonSelector";
import capitalize from "lodash.capitalize";
import { IconSortAZ, IconSortDescending } from "@tabler/icons-react";

export interface ChartTooltipProps {
  label: string;
  payload: Contestant | undefined;
}

export function ItemsBarChart() {
  const [searchParams, setSearchParams] = useSearchParams();
  const season = searchParams.get("s");
  const [selected, setSelected] = useState(items.map((item) => item.name));
  const [opened, { toggle }] = useDisclosure(false);
  const [sort, setSort] = useState("alpha");

  function handleSelectAll() {
    setSelected(items.map((item) => item.name));
  }
  function handleDeselectAll() {
    setSelected([]);
  }
  const sortFn = useCallback(
    (a: (typeof data)[0], b: (typeof data)[0]) =>
      sort === "alpha"
        ? a.name > b.name
          ? 1
          : -1
        : a.count < b.count
        ? 1
        : -1,
    [sort]
  );

  const data = useMemo(() => {
    const itemsWithCounts: {
      contestants: string[];
      count: number;
      id: number;
      name: string;
    }[] = items.map((item) => {
      return { ...item, contestants: [], count: 0 };
    });

    for (const contestant of contestants.filter((c) =>
      season === "All" ? c : c.season === season
    )) {
      for (const cItem of contestant.items) {
        for (const item of itemsWithCounts) {
          if (item.id === cItem) {
            item.contestants.push(contestant.name);
            item.count++;
          }
        }
      }
    }

    return itemsWithCounts;
  }, [season]);

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
        <Stack w={"100%"} mb="md">
          <Group>
            <Text fz="lg">Items</Text>
            <DisplayToggle toggleState={opened} onClick={toggle} />
          </Group>
          <Box display={opened ? "block" : "none"}>
            <Button.Group mb={"md"}>
              <Button
                onClick={handleSelectAll}
                w={120}
                color={"violet.6"}
                size="compact-sm"
              >
                Select all
              </Button>
              <Button
                onClick={handleDeselectAll}
                w={120}
                variant="outline"
                color={"violet.6"}
                size="compact-sm"
              >
                Deselect all
              </Button>
            </Button.Group>
            <Checkbox.Group
              value={selected}
              onChange={setSelected}
              display={"flex"}
              style={{ flexDirection: "row" }}
            >
              <Group gap={10}>
                {data
                  .sort((a, b) => (a.name > b.name ? 1 : -1))
                  .map((item) => (
                    <Checkbox
                      key={item.id}
                      value={item.name}
                      label={capitalize(item.name)}
                      color="violet.6"
                    />
                  ))}
              </Group>
            </Checkbox.Group>
          </Box>
        </Stack>
        <Group>
          <Text fz="lg">Sort</Text>
          <SegmentedControl
            data={[
              { value: "alpha", label: <IconSortAZ size={20} /> },
              { value: "pop", label: <IconSortDescending size={20} /> },
            ]}
            value={sort}
            onChange={setSort}
            size="xs"
          />
        </Group>
      </Paper>
      <BarChart
        data={data.sort(sortFn).filter((item) => selected.includes(item.name))}
        series={[{ name: "count", color: "violet.6", label: "Times selected" }]}
        dataKey="name"
        h={selected.length === 1 ? 50 : selected.length * 32}
        orientation="vertical"
        barProps={{ label: true }}
        yAxisProps={{
          interval: 0,
          type: "category",
          tickMargin: -8,
          tickFormatter: (v) => capitalize(v),
        }}
        xAxisProps={{
          domain: [0, Math.max(...data.map((item) => item.count))],
        }}
        tooltipProps={{
          position: { x: undefined },
        }}
        referenceLines={
          season !== "All"
            ? [
                {
                  x: contestants.filter((c) => c.season === season).length,
                  color: "red.5",
                  label: `${
                    contestants.filter((c) => c.season === season).length
                  } contestants`,
                  labelPosition: "insideBottomRight",
                },
              ]
            : []
        }
      />
    </Stack>
  );
}

// function CustomTick({ x, y, payload }) {
//   return (
//     <g transform={`translate(${x},${y})`}>
//       <text
//         x={0}
//         y={0}
//         // dy={16}
//         textAnchor="end"
//         fill="#666"

//         // fontSize={20}
//       >
//         {capitalize(payload.value)}
//       </text>
//     </g>
//   );
// }
