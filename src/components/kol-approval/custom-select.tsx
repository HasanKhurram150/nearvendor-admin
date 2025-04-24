import { BlueIcon, ChevronDownIcon, GoldenIcon, SilverIcon, TickMarkIcon } from "@/icons";
import { useState } from "react";

interface Option {
  label: string;
  value: string;
  icon: any;
}

const options: Option[] = [
  {
    label: "Golden",
    value: "golden",
    icon: <GoldenIcon />,
  },
  {
    label: "Blue",
    value: "blue",
    icon: <BlueIcon />,
  },
  {
    label: "Silver",
    value: "silver",
    icon: <SilverIcon />,
  },
];

export default function CustomDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(null);

  const toggleOpen = () => setIsOpen((prev) => !prev);
  const handleSelect = (option: Option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left w-full">
      <button
        onClick={toggleOpen}
        className="w-full flex items-center justify-between rounded-2xl border p-3 bg-white transition-all"
      >
        <span className="flex items-center gap-2">
          {selected ? (
            <>
              {selected.icon}
              <span>{selected.label}</span>
            </>
          ) : (
            <span className="text-gray-400">Select</span>
          )}
        </span>
        <ChevronDownIcon className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-2 w-full rounded-2xl bg-white shadow-lg overflow-hidden">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              className="flex items-center justify-between p-3 hover:bg-gray-100 cursor-pointer"
            >
              <span className="flex items-center gap-2">
                {option.icon}
                {option.label}
              </span>
              {selected?.value === option.value && <TickMarkIcon />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
