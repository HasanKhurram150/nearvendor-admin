import React from "react";

const DateTimeRangePicker: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4 w-full px-2">
      {/* Start */}
      <div className="flex items-center">
        <div className="flex flex-col items-start justify-between h-[3rem] w-20 border-l border-dashed border-[#D9D9D9] relative">
          <div className="h-2 w-2 bg-gray-400 rounded-full absolute top-[-1rem] left-[-0.25rem]" />
          <span className="font-semibold text-gray-700">Start</span>
          <span className="font-semibold text-gray-700">End</span>
          <div className="h-2 w-2 border border-gray-400 rounded-full  absolute bottom-[-1rem] left-[-0.25rem]" />
        </div>
        <input
          type="date"
          defaultValue="2025-05-15"
          className="border rounded px-3 py-2 w-40"
        />
        <input
          type="time"
          defaultValue="19:30"
          className="border rounded px-3 py-2 w-32"
        />
        <div className="border rounded p-3 w-32 text-center">
          <div className="text-xs text-gray-500">🌐</div>
          <div className="text-sm font-medium">GMT+05:00</div>
          <div className="text-xs text-gray-500">Karachi</div>
        </div>
      </div>

      {/* End */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 w-20">
         

        </div>
        <input
          type="date"
          defaultValue="2025-06-15"
          className="border rounded px-3 py-2 w-40"
        />
        <input
          type="time"
          defaultValue="19:30"
          className="border rounded px-3 py-2 w-32"
        />
      </div>
    </div>
  );
};

export default DateTimeRangePicker;
