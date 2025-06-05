import Label from "@/components/form/Label";
import { CaretIcon } from "@/icons";
import React, { useState, useEffect } from "react";

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
    <div className="flex flex-col gap-1 w-full">
      <Label>{label}</Label>
      <div className="relative w-full">
        <select
          id="type"
          name="type"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="block w-full appearance-none rounded-xl border border-gray-300 bg-white pr-10 px-4 py-4 text-sm shadow-none focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
          <CaretIcon />
        </div>
      </div>
    </div>
  );
};

export default GenericSelectDropdown;
