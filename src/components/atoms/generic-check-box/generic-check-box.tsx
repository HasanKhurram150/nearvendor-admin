import { ActiveCheckBoxIcon, InactiveCheckBoxIcon } from "@/icons";
import { useState } from "react";

type GenericCheckboxProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
};

export const GenericCheckbox: React.FC<GenericCheckboxProps> = ({
  checked: initialChecked = false,
  onChange,
}) => {
  const [checked, setChecked] = useState(initialChecked);

  const toggle = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onChange?.(newChecked);
  };

  return (
    <button
      onClick={toggle}
      className="w-6 h-6 flex items-center justify-center transition-colors"
    >
      {checked ? <ActiveCheckBoxIcon /> : <InactiveCheckBoxIcon />}
    </button>
  );
};
