import React, { FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  type?: "text" | "number" | "email" | "password" | "date" | "time" | string;
  id?: string;
  name?: string;
  placeholder?: string;
  defaultValue?: string | number;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  min?: string;
  max?: string;
  disabled?: boolean;
  success?: boolean;
  error?: string | boolean | undefined; // Can be boolean or error message string
  hint?: string;
  registration?: Partial<UseFormRegisterReturn>; // For react-hook-form integration
}

const Input: FC<InputProps> = ({
  type = "text",
  id,
  name,
  placeholder,
  defaultValue,
  value,
  onChange,
  className = "",
  min,
  max,
  disabled = false,
  success = false,
  error = false,
  hint,
  registration,
}) => {
  // Determine input styles based on state (disabled, success, error)
  let inputClasses = `h-[46px] w-full rounded-[14px] border appearance-none px-4 text-sm transition-all duration-300 placeholder:text-gray-500 focus:outline-hidden ${className}`;

  // Add styles for the different states
  if (disabled) {
    inputClasses += ` bg-white/[0.03] text-gray-500 border-white/5 cursor-not-allowed`;
  } else if (error) {
    inputClasses += ` bg-error-500/[0.05] text-error-400 border-error-500/50 focus:ring-4 focus:ring-error-500/10`;
  } else if (success) {
    inputClasses += ` bg-success-500/[0.05] text-success-400 border-success-500/50 focus:ring-4 focus:ring-success-500/10`;
  } else {
    inputClasses += ` bg-[#0C0C11]/50 text-white border-white/10 focus:border-brand-500/50 focus:ring-4 focus:ring-brand-500/10`;
  }

  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        disabled={disabled}
        className={inputClasses}
        {...registration} // Spread the registration props from react-hook-form
      />

      {/* Error message */}
      {typeof error === 'string' && error && (
        <p className="mt-1.5 text-error-500 text-xs">
          {error}
        </p>
      )}

      {/* Hint Text (only shows when there's no error) */}
      {hint && !error && (
        <p className={`mt-1.5 text-xs ${
          success ? "text-success-500" : "text-gray-500"
        }`}>
          {hint}
        </p>
      )}
    </div>
  );
};

export default Input;
