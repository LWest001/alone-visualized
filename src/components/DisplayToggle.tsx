import { IconEye, IconEyeClosed } from "@tabler/icons-react";

interface DisplayToggleProps {
  toggleState: boolean;
  onClick: () => void;
}

function DisplayToggle({ toggleState, onClick }: DisplayToggleProps) {
  return toggleState ? (
    <IconEye onClick={onClick} />
  ) : (
    <IconEyeClosed onClick={onClick} />
  );
}

export default DisplayToggle;
