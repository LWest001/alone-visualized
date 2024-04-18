import { SegmentedControl } from "@mantine/core";

interface NavbarProps {
  onChange:
    | ((value: "items" | "survived" | "/" | undefined) => void)
    | undefined;
  value: "items" | "survived" | "/" | undefined;
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
      ]}
    />
  );
}

export default Navbar;
