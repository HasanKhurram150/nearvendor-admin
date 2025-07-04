export function ToggleSwitch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (e: any) => void;
}) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      {/* The hidden checkbox input that holds the state */}
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
      />

      {/* The background of the toggle switch */}
      <div
        className="w-14 h-8 bg-gray-300 rounded-full peer
                   dark:bg-gray-600 
                   peer-checked:bg-blue-600 
                   dark:peer-checked:bg-blue-500
                   transition-colors duration-300 ease-in-out"
      ></div>

      {/* The handle of the toggle switch */}
      <div
        className="absolute top-1 left-1 bg-white border-gray-300 border 
                   rounded-full h-6 w-6 
                   transition-transform duration-300 ease-in-out
                   peer-checked:translate-x-full 
                   peer-checked:border-white"
      ></div>
    </label>
  );
}
