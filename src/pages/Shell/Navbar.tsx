import { SegmentedControl } from "@mantine/core";

interface NavbarProps {
  onChange: ((value: string | undefined) => void) | undefined;
  value: string | undefined;
}

function Navbar({ onChange, value }: NavbarProps) {
  return (
    <SegmentedControl
      value={value}
      orientation="vertical"
      w={"100%"}
      onChange={onChange}
      data={[
        { label: "Home", value: "/" },
        { label: "Days survived", value: "survived" },
        { label: "Items", value: "items" },
        { label: "Locations", value: "map" },
      ]}
    />
  );
}

export default Navbar;
