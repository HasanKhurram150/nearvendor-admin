import { ChevronDownIcon, FiltersIcon, TickMarkIcon } from "@/icons";
import { useState } from "react";

interface Option {
  label: string;
  value: string;
}

const options: Option[] = [
  {
    label: "Name",
    value: "name",
  },
  {
    label: "Type",
    value: "type",
  },
  {
    label: "Calendar",
    value: "calendar",
  },
  {
    label: "Category",
    value: "category",
  },
  {
    label: "Location",
    value: "location",
  },
];

export default function SearchFilterDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(null);

  const toggleOpen = () => setIsOpen((prev) => !prev);
  const handleSelect = (option: Option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left min-w-[7.5rem]">
      <button
        onClick={toggleOpen}
        className="w-full flex items-center justify-between rounded-[0.75rem] border px-3 py-1 h-[2.5rem] bg-transparent transition-all"
      >
        <FiltersIcon />
        <span className="flex items-center gap-2"> 
          {selected ? (
            <span>{selected.label}</span>
          ) : (
            <span className="text-[#102445] text-sm">Filters</span>
          )}
        </span>
        <ChevronDownIcon
          className={`text-[#566273] h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-2 w-full rounded-2xl bg-white shadow-lg overflow-hidden">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              className="flex items-center justify-between p-3 hover:bg-gray-100 cursor-pointer"
            >
              <span className="flex items-center gap-2">{option.label}</span>
              {selected?.value === option.value && <TickMarkIcon />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
