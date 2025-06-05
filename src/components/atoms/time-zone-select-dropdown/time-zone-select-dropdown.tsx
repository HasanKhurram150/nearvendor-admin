import React, { useState } from "react";
import moment from "moment-timezone";
import { GlobalIcon } from "@/icons";

const TimeZoneSelectDropdown = () => {
  const [open, setOpen] = useState(false);
  const [selectedTimeZone, setSelectedTimeZone] = useState<string | null>(null);
  const timeZones = moment.tz.names();

  const handleSelect = (tz: string) => {
    setSelectedTimeZone(tz);
    setOpen(false);
  };

  const formatOffset = (tz: string | null) => {
    if (!tz) return "";
    const offset = moment().tz(tz).utcOffset(); // in minutes
    const sign = offset >= 0 ? "+" : "-";
    const hours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, "0");
    const minutes = String(Math.abs(offset) % 60).padStart(2, "0");
    return `${sign}${hours}:${minutes}`;
  };

  return (
    <div className="relative inline-block text-left w-[20%]">
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 bg-white border border-[#E5E5E5] text-white rounded-[1rem] w-full text-left"
      >
        {selectedTimeZone ? (
          <div className="flex flex-col gap-2">
            <GlobalIcon />
            <div className="font-semibold text-[#102445] text-sm break-all">
              {selectedTimeZone}
            </div>
            <div className="text-xs text-[#00000080]">
              GMT{formatOffset(selectedTimeZone)}
            </div>
          </div>
        ) : (
          "Select Time Zone"
        )}
      </button>

      {open && (
        <div className="absolute max-h-60 overflow-y-auto right-0 mt-2 w-full bg-white border rounded shadow-md z-10">
          {timeZones.map((tz, index) => {
            const [region, city] = tz.split("/");
            return (
              <button
                key={index}
                onClick={() => handleSelect(tz)}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                <span className="font-semibold">{region}</span> /{" "}
                <span>{city?.replace(/_/g, " ")}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TimeZoneSelectDropdown;
