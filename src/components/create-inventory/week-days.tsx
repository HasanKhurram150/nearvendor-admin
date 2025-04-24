import React, { useState } from "react";

type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

const days: Day[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const WeekdayCheckboxes: React.FC = () => {
  const [selectedDays, setSelectedDays] = useState<Day[]>([]);

  const toggleDay = (day: Day) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="flex gap-2 mt-2">
      {days.map((day) => {
        const isSelected = selectedDays.includes(day);
        return (
          <button
            key={day}
            onClick={() => toggleDay(day)}
            className={`w-[2rem] h-[2rem] rounded-lg flex items-center justify-center border border-[#DADADA] font-semibold
              transition duration-200 ease-in-out
              ${isSelected
                ? 'btn-bg text-white'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}
            `}
            title={day}
          >
            {day[0]}
          </button>
        );
      })}
    </div>
  );
};
