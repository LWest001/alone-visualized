import { SegmentedControl, Stack, Text } from "@mantine/core";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
interface SeasonSelectorProps {
  active: string | undefined;
  onChange: (val: string) => void;
}
function SeasonSelector({ active, onChange }: SeasonSelectorProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const season = searchParams.get("s");
    useEffect(() => {
      if (!season) {
        setSearchParams({ ...searchParams, s: "All" });
      }
    }, [searchParams, season, setSearchParams]);
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
