import React, { useState, useEffect, useRef } from "react";
import Loading from "../atoms/loading/loading";

type Option = {
  label: string;
  value: string;
};

interface SearchableDropdownProps {
  options: Option[];
  onSelect: (option: Option | null) => void;
  placeholder?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  options,
  onSelect,
  placeholder = "Select...",
  isLoading = false,
  disabled = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    setSearchTerm(option.label);
    setIsOpen(false);
    onSelect(option);
  };

  const clearSelection = () => {
    setSelectedOption(null);
    setSearchTerm("");
    setIsOpen(false);
    onSelect(null);
  };

  const handleInputFocus = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={handleInputFocus}
          placeholder={isLoading ? "Loading options..." : placeholder}
          className={`w-full p-2 pr-8 border border-gray-300 rounded-md ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
          disabled={disabled || isLoading}
        />

        {/* Clear button (X) */}
        {selectedOption && !isLoading && (
          <button
            onClick={clearSelection}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            aria-label="Clear selection"
            disabled={disabled}
          >
            ×
          </button>
        )}

        {/* Loading spinner */}
        {isLoading && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <Loading />
          </div>
        )}
      </div>

      {/* Dropdown menu */}
      {isOpen && !disabled && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {isLoading ? (
            <div className="p-2 text-center text-gray-500 flex items-center justify-center">
              <Loading />
            </div>
          ) : filteredOptions.length > 0 ? (
            <ul className="py-1">
              {filteredOptions.map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleSelect(option)}
                  className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                    option.value === selectedOption?.value ? "bg-gray-100" : ""
                  }`}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-3 py-2 text-gray-500">
              {searchTerm ? "No results found" : "No options available"}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
