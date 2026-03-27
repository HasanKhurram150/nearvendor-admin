import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  size?: "sm" | "md";
  variant?: "primary" | "outline" | "success" | "destructive" | "ghost";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = "md",
  variant = "primary",
  startIcon,
  endIcon,
  onClick,
  className = "",
  disabled = false,
  type = "button",
}) => {
  // Size Classes
  const sizeClasses = {
    sm: "px-3 py-2 text-xs rounded-[10px] h-9",
    md: "px-5 py-3 text-sm rounded-[14px] h-[46px]",
  };

  // Variant Classes
  const variantClasses = {
    primary:
      "bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-500/50",
    outline:
      "bg-white/[0.05] text-gray-700 border border-gray-300 hover:bg-gray-100 dark:text-gray-300 dark:border-white/10 dark:bg-[#1C1C24] dark:hover:bg-[#252532] dark:hover:text-white",
    success:
      "bg-[#32AA00] text-gray-900 shadow-theme-xs hover:bg-[#3edb44] disabled:bg-[#32AA00]/50",
    destructive:
      "bg-red-500 text-white shadow-theme-xs hover:bg-red-600 disabled:bg-red-500/50",
    ghost:
      "bg-transparent text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/[0.05] dark:hover:text-white",
  };

  return (
    <button
      type={type}
      className={`inline-flex items-center gap-2 font-semibold transition-all duration-300 active:scale-[0.98] ${
        sizeClasses[size]
      } ${variantClasses[variant]} ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {startIcon && <span className="flex items-center">{startIcon}</span>}
      <span className="truncate">{children}</span>
      {endIcon && <span className="flex items-center">{endIcon}</span>}
    </button>
  );
};

export default Button;
