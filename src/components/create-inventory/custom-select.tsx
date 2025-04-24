import React, { useState } from 'react';

type Option = {
  label: string;
  value: string;
};

const options: Option[] = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
];

const CustomSelect = ({placeholder}:{placeholder?: string}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (option: Option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        onClick={toggleDropdown}
        className="w-full px-4 py-4 border border-gray-300 rounded-xl bg-white text-left flex items-center justify-between"
      >
        {selected ? selected.label : <p className='text-sm text-gray-400'>{placeholder}</p> }
        <svg
          className={`w-4 h-4 ml-2 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-md">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
