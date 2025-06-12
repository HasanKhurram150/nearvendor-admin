import React from "react";

type Day = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

const days: Day[] = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
];

interface WeekdayCheckboxesProps {
  value?: Day[];
  onChange: (selectedDays: Day[]) => void;
  disabled?: boolean;
}

export const WeekdayCheckboxes: React.FC<WeekdayCheckboxesProps> = ({
  value = [],
  onChange,
  disabled = false,
}) => {
  const toggleDay = (day: Day) => {
    const newSelectedDays = value.includes(day)
      ? value.filter(d => d !== day)
      : [...value, day];
    onChange(newSelectedDays);
  };

  const dayLabels: Record<Day, string> = {
    MONDAY: 'M',
    TUESDAY: 'T',
    WEDNESDAY: 'W',
    THURSDAY: 'Th',
    FRIDAY: 'F',
    SATURDAY: 'Sa',
    SUNDAY: 'Su'
  };

  return (
    <div className="flex gap-2 mt-2 flex-wrap">
      {days.map((day) => {
        const isSelected = value.includes(day);
        return (
          <button
            key={day}
            type="button"
            onClick={() => toggleDay(day)}
            disabled={disabled}
            className={`
              w-[2.5rem] h-[2.5rem] rounded-lg flex items-center justify-center border
              font-medium text-sm
              transition duration-200 ease-in-out
              ${
                isSelected
                  ? 'btn-bg text-white border-transparent'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
            title={day.charAt(0) + day.slice(1).toLowerCase()}
          >
            {dayLabels[day]}
          </button>
        );
      })}
    </div>
  );
};