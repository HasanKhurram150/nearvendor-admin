// "use client";
// import {
//   BlueIcon,
//   ChevronDownIcon,
//   GoldenIcon,
//   SilverIcon,
//   TickMarkIcon,
// } from "@/icons";
// import { useState } from "react";

// interface Option {
//   label: string;
//   value: string;
//   icon: any;
// }

// const options: Option[] = [
//   {
//     label: "Golden",
//     value: "golden",
//     icon: <GoldenIcon />,
//   },
//   {
//     label: "Blue",
//     value: "blue",
//     icon: <BlueIcon />,
//   },
//   {
//     label: "Silver",
//     value: "silver",
//     icon: <SilverIcon />,
//   },
// ];

// interface CustomDropdownProps {
//   onSelect: (value: string) => void;
// }

// export default function CustomDropdown({ onSelect }: CustomDropdownProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selected, setSelected] = useState<Option | null>(null);

//   const toggleOpen = () => setIsOpen((prev) => !prev);

//   const handleSelect = (option: Option) => {
//     setSelected(option);
//     onSelect(option.value);
//     setIsOpen(false);
//   };

//   return (
//     <div className="relative inline-block text-left w-full">
//       <button
//         onClick={toggleOpen}
//         className="w-full flex items-center justify-between rounded-2xl border p-3 bg-white transition-all dark:bg-gray-800 dark:border-gray-700"
//       >
//         <span className="flex items-center gap-2">
//           {selected ? (
//             <>
//               {selected.icon}
//               <span className="dark:text-white">{selected.label}</span>
//             </>
//           ) : (
//             <span className="text-gray-400 dark:text-gray-400">Select</span>
//           )}
//         </span>
//         <ChevronDownIcon
//           className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""} dark:text-white`}
//         />
//       </button>

//       {isOpen && (
//         <div className="absolute z-50 mt-1 w-full">
//           <ul className="rounded-2xl bg-white shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
//             {options.map((option) => (
//               <li
//                 key={option.value}
//                 onClick={() => handleSelect(option)}
//                 className="flex items-center justify-between p-3 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700"
//               >
//                 <span className="flex items-center gap-2 dark:text-white">
//                   {option.icon}
//                   {option.label}
//                 </span>
//                 {selected?.value === option.value && (
//                   <TickMarkIcon className="dark:text-white" />
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// ------------------------------

// "use client";
// import {
//   BlueIcon,
//   ChevronDownIcon,
//   GoldenIcon,
//   SilverIcon,
//   TickMarkIcon,
// } from "@/icons";
// import { useState } from "react";
// import { IKolBadge } from "@/services/kols-api/kols-api.types";

// interface Option {
//   label: string;
//   value: IKolBadge;
//   icon: any;
// }

// const options: Option[] = [
//   {
//     label: "Golden",
//     value: "golden",
//     icon: <GoldenIcon />,
//   },
//   {
//     label: "Blue",
//     value: "blue",
//     icon: <BlueIcon />,
//   },
//   {
//     label: "Silver",
//     value: "silver",
//     icon: <SilverIcon />,
//   },
// ];

// interface CustomDropdownProps {
//   onSelect: (value: IKolBadge) => void;
//   disabled?: boolean;
// }

// export default function CustomDropdown({
//   onSelect,
//   disabled = false,
// }: CustomDropdownProps) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selected, setSelected] = useState<Option | null>(null);

//   const toggleOpen = () => {
//     if (!disabled) {
//       setIsOpen((prev) => !prev);
//     }
//   };

//   const handleSelect = (option: Option) => {
//     setSelected(option);
//     onSelect(option.value);
//     setIsOpen(false);
//   };

//   return (
//     <div className="relative inline-block text-left w-full">
//       <button
//         onClick={toggleOpen}
//         className={`w-full flex items-center justify-between rounded-2xl border p-3 bg-white transition-all dark:bg-gray-800 dark:border-gray-700 ${
//           disabled ? "opacity-50 cursor-not-allowed" : ""
//         }`}
//         disabled={disabled}
//       >
//         <span className="flex items-center gap-2">
//           {selected ? (
//             <>
//               {selected.icon}
//               <span className="dark:text-white">{selected.label}</span>
//             </>
//           ) : (
//             <span className="text-gray-400 dark:text-gray-400">Select</span>
//           )}
//         </span>
//         <ChevronDownIcon
//           className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""} dark:text-white`}
//         />
//       </button>

//       {isOpen && (
//         <div className="absolute z-50 mt-1 w-full">
//           <ul className="rounded-2xl bg-white shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
//             {options.map((option) => (
//               <li
//                 key={option.value}
//                 onClick={() => handleSelect(option)}
//                 className="flex items-center justify-between p-3 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700"
//               >
//                 <span className="flex items-center gap-2 dark:text-white">
//                   {option.icon}
//                   {option.label}
//                 </span>
//                 {selected?.value === option.value && (
//                   <TickMarkIcon className="dark:text-white" />
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }
















// import React, { useState } from "react";
// import { BlueIcon, GoldenIcon, SilverIcon } from "@/icons";

// type Option = {
//   label: string;
//   value: string;
//   icon: any;
// };

// const options: Option[] = [
//   {
//     label: "Golden",
//     value: "golden",
//     icon: <GoldenIcon />,
//   },
//   {
//     label: "Blue",
//     value: "blue",
//     icon: <BlueIcon />,
//   },
//   {
//     label: "Silver",
//     value: "silver",
//     icon: <SilverIcon />,
//   },
// ];

// const CustomSelect: React.FC = () => {
//   const [selected, setSelected] = useState<Option>(options[0]);

//   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedOption = options.find((opt) => opt.value === e.target.value);
//     if (selectedOption) setSelected(selectedOption);
//   };

//   return (
//     <div className="w-full space-y-2">
//       <select
//         className="w-full p-2 border rounded-md text-gray-700"
//         // value={selected.value}
//         onChange={handleChange}
//       >
//         {options.map((opt) => (
//           <option key={opt.value} value={opt.value}>
//             {opt.label}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default CustomSelect;



import React, { useState } from "react";
import { BlueIcon, GoldenIcon, SilverIcon } from "@/icons";
import { IKolBadge } from "@/services/kols-api/kols-api.types"; // ensure correct path

type Option = {
  label: string;
  value: IKolBadge;
  icon: any;
};

type CustomSelectProps = {
  onSelect: (value: IKolBadge) => void;
  disabled?: boolean;
};

const options: Option[] = [
  {
    label: "Golden",
    value: "golden",
    icon: <GoldenIcon />,
  },
  {
    label: "Blue",
    value: "blue",
    icon: <BlueIcon />,
  },
  {
    label: "Silver",
    value: "silver",
    icon: <SilverIcon />,
  },
];

const CustomSelect: React.FC<CustomSelectProps> = ({ onSelect, disabled }) => {
  const [selected, setSelected] = useState<Option>(options[0]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = options.find((opt) => opt.value === e.target.value);
    if (selectedOption) {
      setSelected(selectedOption);
      onSelect(selectedOption.value);
    }
  };

  return (
    <div className="w-full space-y-2">
      <select
        className="w-full p-2 border rounded-md text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        value={selected.value}
        onChange={handleChange}
        disabled={disabled}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
