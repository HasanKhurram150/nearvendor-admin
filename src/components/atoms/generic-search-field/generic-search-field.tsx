import React from "react";
import { GenericSearchFieldProps } from "./generic-search-field.types";
import { SearchIcon } from "@/icons";

const GenericSearchField: React.FC<GenericSearchFieldProps> = ({
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="flex items-center border border-[#736C9900] rounded-3xl px-3 py-3 bg-white w-full max-w-[34.5rem]">
      <SearchIcon className="w-5 h-5 mr-2" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full focus:outline-none text-[#00000080]"
        placeholder={placeholder}
      />
    </div>
  );
};

export default GenericSearchField;
