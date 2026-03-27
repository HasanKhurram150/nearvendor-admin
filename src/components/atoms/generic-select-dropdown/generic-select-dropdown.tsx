import Label from "@/components/form/Label";
import { CaretIcon } from "@/icons";
import React, { useState, useEffect } from "react";
import Select from "../../form/Select";

type Option = {
  label: string;
  value: string;
};

interface GenericSelectDropdownProps {
  label: string;
  options: Option[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const GenericSelectDropdown: React.FC<GenericSelectDropdownProps> = ({
  label,
  options,
  defaultValue,
  onChange,
}) => {
  const [selectedType, setSelectedType] = useState(
    defaultValue || options[0]?.value || "",
  );

  useEffect(() => {
    if (onChange) onChange(selectedType);
  }, [selectedType, onChange]);

  return (
    <div className="flex flex-col w-full gap-2">
      <Label>{label}</Label>
      <Select
        options={options}
        defaultValue={selectedType}
        onChange={setSelectedType}
        className="w-full"
      />
    </div>
  );
};

export default GenericSelectDropdown;
