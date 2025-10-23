import { Badge, Card, Group, Image, Stack, Text } from "@mantine/core";
import { ChartTooltipProps } from "./DaysBarChart";
import { useSearchParams } from "react-router-dom";
import items from "../../assets/items.json";

export function ChartTooltip({ label, payload, style }: ChartTooltipProps) {
  const [searchParams] = useSearchParams();
  if (!payload) return null;
  const s = searchParams.get("s");
  function getItemName(id: number) {
    return items.find((item) => item.id === id)?.name;
  }
  const itemNames = payload.items.map((id) => getItemName(id)).sort();
  const { season, name } = payload;
  const imgUrl = `/profpics/${season}/${name.replaceAll('"', "")}.jpg`;

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className="ChartTooltip"
      style={style}
      mah={"min-content"}
    >
      <Card.Section>
        <Image src={imgUrl} height={200} pos={"relative"} />
        <Stack
          gap={0}
          p="xs"
          fz="lg"
          bg={
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(46,46,46,0.8) 25%, rgba(46,46,46,0.8) 75%)"
          }
          pos="relative"
          bottom={60}
          w="100%"
          mb={-60}
        >
          <Text>
            {label.replace(" (S5)", "")}, {payload.age}
          </Text>
          <Text fz="sm">
            {payload.hometown}, {payload["state/province"]}
          </Text>
        </Stack>
        {(s === "All" || !s) && (
          <Badge pos="absolute" top={5} right={5} color="green">
            S.{payload.season}
          </Badge>
        )}
      </Card.Section>

      <Group p={0} my={"xs"}>
        {payload.winner && <Badge color="orange">👑 Winner</Badge>}
        <Badge color="indigo">{payload.status} days</Badge>
        {payload.medically_evacuated && (
          <Badge color="red">⚕️ Medical evacuation</Badge>
        )}
      </Group>

      {!payload.winner && (
        <Stack gap={1} mb={"xs"} maw={355}>
          <Text fw="bold">Reason for tapping out</Text>
          <Text m={0}>{payload.reason_tapped}</Text>
        </Stack>
      )}
      <Stack gap={5} maw={355}>
        <Text fw="bold">10 chosen items</Text>
        <Group gap={1}>
          {itemNames.map((name) => (
            <Badge>{name}</Badge>
          ))}
        </Group>
      </Stack>
    </Card>
  );
}
