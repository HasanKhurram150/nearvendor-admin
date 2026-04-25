import React, { useState } from "react";

type Option = {
  label: string;
  value: string;
};

interface RadioButtonGroupProps {
  options: Option[];
  name: string;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({ options, name }) => {
  const [selected, setSelected] = useState<string>("");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {options.map((option) => (
        <label
          key={option.value}
          className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors bg-white`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selected === option.value}
            onChange={() => setSelected(option.value)}
            className="accent-green-600"
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default RadioButtonGroup;
