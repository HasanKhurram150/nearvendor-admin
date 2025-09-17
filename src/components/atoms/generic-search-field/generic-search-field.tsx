import React from "react";
import { GenericSearchFieldProps } from "./generic-search-field.types";
import { SearchIcon } from "@/icons";

const GenericSearchField: React.FC<GenericSearchFieldProps> = ({
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="flex items-center border border-[#2A2A2A96] rounded-3xl px-3 py-3 dark:bg-[#0C0C0C8F] bg-white w-full max-w-[34.5rem] search-icon">
      <SearchIcon className=" w-5 h-5 mr-2" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full focus:outline-none dark:text-white text-[#00000080]"
        placeholder={placeholder}
      />
    </div>
  );
};

export default GenericSearchField;
