import { SegmentedControl, Space, Text } from "@mantine/core";
import { IconChartBar, IconChartScatter } from "@tabler/icons-react";
import { Outlet, To, useNavigate, useParams } from "react-router-dom";
import { DaysBarChart } from "./DaysBarChart";
import { DaysScatter } from "./DaysScatter";
import { useCallback, useContext, useEffect } from "react";
import { ActiveContext } from "../Shell/Shell";

function DaysSurvived() {
  const navigate = useNavigate();
  const { chart } = useParams();
  const onChange = useCallback(
    (val: To) => navigate(`/survived/${val}`, { replace: false }),
    [navigate]
  );
  const [active, setActive] = useContext(ActiveContext);

  useEffect(() => {
    if (!chart) {
      onChange("bar");
    }
  }, [chart, onChange]);

  useEffect(() => {
    if (active !== "survived" && setActive) {
      setActive("survived");
    }
  }, [active, setActive]);

  return (
    <>
      <Text>
        See how long each contestant lasted in the wild, and compare survival
        times across seasons. Use the chart selector to see either an
        interactive bar chart or a scatter plot that allows you to compare all
        seasons at once. Hover over the bar chart to meet each contestant.
      </Text>
      <Space h={15} />
      <SegmentedControl
        value={chart}
        data={[
          { value: "bar", label: <IconChartBar /> },
          { value: "scatter", label: <IconChartScatter /> },
        ]}
        onChange={onChange}
        w="fit-content"
      />
      <Space h={15} />
      {chart === "bar" ? <DaysBarChart /> : <DaysScatter />}
      <Outlet />
    </>
  );
}

export default DaysSurvived;
