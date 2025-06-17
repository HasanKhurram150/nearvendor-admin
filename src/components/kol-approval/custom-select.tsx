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

"use client";
import {
  BlueIcon,
  ChevronDownIcon,
  GoldenIcon,
  SilverIcon,
  TickMarkIcon,
} from "@/icons";
import { useState } from "react";
import { IKolBadge } from "@/services/kols-api/kols-api.types";

interface Option {
  label: string;
  value: IKolBadge;
  icon: any;
}

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

interface CustomDropdownProps {
  onSelect: (value: IKolBadge) => void;
  disabled?: boolean;
}

export default function CustomDropdown({
  onSelect,
  disabled = false,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(null);

  const toggleOpen = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleSelect = (option: Option) => {
    setSelected(option);
    onSelect(option.value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left w-full">
      <button
        onClick={toggleOpen}
        className={`w-full flex items-center justify-between rounded-2xl border p-3 bg-white transition-all dark:bg-gray-800 dark:border-gray-700 ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={disabled}
      >
        <span className="flex items-center gap-2">
          {selected ? (
            <>
              {selected.icon}
              <span className="dark:text-white">{selected.label}</span>
            </>
          ) : (
            <span className="text-gray-400 dark:text-gray-400">Select</span>
          )}
        </span>
        <ChevronDownIcon
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""} dark:text-white`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full">
          <ul className="rounded-2xl bg-white shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option)}
                className="flex items-center justify-between p-3 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700"
              >
                <span className="flex items-center gap-2 dark:text-white">
                  {option.icon}
                  {option.label}
                </span>
                {selected?.value === option.value && (
                  <TickMarkIcon className="dark:text-white" />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
