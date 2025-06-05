import { useState, useRef } from "react";

const ColorPicker = () => {
  const [color, setColor] = useState("#1D4ED8");

  return (
    <div className="flex gap-4 justify-between items-center w-full">
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="w-[48%] h-[3.5rem] cursor-pointer border border-[#D2D2D2] rounded-[0.75rem] p-2"
      />
      <span className="flex items-center text-left text-[#102445] text-sm w-[48%] h-[3.5rem] cursor-pointer border border-[#D2D2D2] rounded-[0.75rem] p-2">{color}</span>
    </div>
  );
};

export default ColorPicker;

// import { useState, useRef } from 'react';

// const ColorPicker = () => {
//   const [color, setColor] = useState('#1D4ED8');
//   const inputRef = useRef<HTMLInputElement>(null);

//   const handleClick = () => {
//     inputRef.current?.click();
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setColor(e.target.value);
//   };

//   return (
//     <div className="p-4 flex flex-col items-center relative">
//       {/* Hidden input */}
//       <input
//         ref={inputRef}
//         type="color"
//         value={color}
//         onChange={handleChange}
//         className="hidden absolute top-0 left-0"
//       />

//       {/* Visible color block, acts as the picker trigger */}
//       <div
//         onClick={handleClick}
//         className="w-16 h-16 rounded border-2 border-gray-300 cursor-pointer"
//         style={{ backgroundColor: color }}
//         title="Click to pick a color"
//       />

//       <span className="mt-2 font-mono text-gray-700">{color}</span>
//     </div>
//   );
// };

// export default ColorPicker;
