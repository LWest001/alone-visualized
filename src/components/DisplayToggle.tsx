import { ActionIcon } from "@mantine/core";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";

interface DisplayToggleProps {
  toggleState: boolean;
  onClick: () => void;
}

function DisplayToggle({ toggleState, onClick }: DisplayToggleProps) {
  return (
    <ActionIcon
      variant="transparent"
      onClick={onClick}
      px={4}
      m={0}
      radius={"100%"}
    >
      {toggleState ? <IconEye /> : <IconEyeClosed />}
    </ActionIcon>
  );
}

export default DisplayToggle;
