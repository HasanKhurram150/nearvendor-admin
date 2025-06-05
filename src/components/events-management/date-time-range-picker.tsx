import React from "react";
import TimeZoneSelectDropdown from "../atoms/time-zone-select-dropdown/time-zone-select-dropdown";

const DateTimeRangePicker: React.FC = () => {
  return (
    <div className="flex space-y-4 w-full px-2">
      {/* Start */}
      <div className="flex items-center justify-between gap-2 w-full">
        <div className="flex flex-col items-start justify-between h-[3rem] w-[10%] border-l border-dashed border-[#D9D9D9] relative">
          <div className=" flex items-center justify-start gap-1 absolute top-[-1rem] left-[-0.25rem]">
            {" "}
            <div className="h-2 w-2 bg-gray-400 rounded-full" />{" "}
            <span className="font-semibold text-gray-700">Start</span>
          </div>

          <div className=" flex items-center justify-start gap-1 absolute bottom-[-1rem] left-[-0.25rem]">
            <div className="h-2 w-2 border border-gray-400 rounded-full" />
            <span className="font-semibold text-gray-700">End</span>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between gap-2 w-[40%]">
          <input
            type="date"
            defaultValue="2025-05-15"
            className="border rounded-[0.75rem] px-3 py-2 w-full"
          />
          <input
            type="date"
            defaultValue="2025-06-15"
            className="border rounded-[0.75rem] px-3 py-2 w-full"
          />
        </div>
        <div className="flex flex-col items-start justify-between gap-2 w-[30%]">
          <input
            type="time"
            defaultValue="19:30"
            className="border rounded-[0.75rem] px-3 py-2 w-full"
          />
          <input
            type="time"
            defaultValue="19:30"
            className="border rounded-[0.75rem] px-3 py-2 w-full"
          />
        </div>
        <TimeZoneSelectDropdown />
      </div>
    </div>
  );
};

export default DateTimeRangePicker;
