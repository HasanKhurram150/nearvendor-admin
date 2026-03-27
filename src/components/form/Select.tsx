import React, { useState } from "react";
import { ChevronDownIcon } from "@/icons";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  defaultValue?: string;
  size?: "sm" | "md";
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Select an option",
  onChange,
  className = "",
  defaultValue = "",
  size = "md",
}) => {
  // Manage the selected value
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    onChange(value); // Trigger parent handler
  };

  const sizeClasses = size === "sm" ? "h-9 text-xs" : "h-[46px] text-sm";

  return (
    <div className={`relative ${className}`}>
      <select
        className={`${sizeClasses} w-full appearance-none rounded-[14px] border border-white/10 bg-[#0C0C11]/50 pl-4 pr-10 text-white transition-all duration-300 focus:border-brand-500/50 focus:outline-hidden focus:ring-4 focus:ring-brand-500/10 cursor-pointer`}
        value={selectedValue}
        onChange={handleChange}
      >
        {/* Placeholder option */}
        <option
          value=""
          disabled
          className="text-gray-700 dark:bg-[#0C0C11] dark:text-gray-400"
        >
          {placeholder}
        </option>
        {/* Map over options */}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="text-gray-700 dark:bg-[#0C0C11] dark:text-white"
          >
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <ChevronDownIcon className={size === "sm" ? "h-4 w-4 text-white/50" : "h-5 w-5 text-white/50"} />
      </div>
    </div>
  );
};

export default Select;
