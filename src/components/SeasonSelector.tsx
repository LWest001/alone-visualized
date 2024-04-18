import { SegmentedControl, Stack, Text } from "@mantine/core";
interface SeasonSelectorProps {
  active: string | undefined;
  onChange: (val: string) => void;
}
function SeasonSelector({ active, onChange }: SeasonSelectorProps) {
  return (
    <Stack w="100%" mb="md">
      <Text fz="lg">Season</Text>
      <SegmentedControl
        value={active || undefined}
        data={["All", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
        onChange={onChange}
        w="100%"
      />
    </Stack>
  );
}

export default SeasonSelector;
