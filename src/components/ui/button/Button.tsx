import React, { ReactNode } from "react";
import { cn } from "@/utils/cn";
import Loading from "../../atoms/loading/loading";

interface ButtonProps {
  children: ReactNode;
  size?: "sm" | "md";
  variant?: "primary" | "outline" | "success" | "destructive" | "ghost";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onClick?: () => void | Promise<void>;
  disabled?: boolean;
  loading?: boolean;
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
  loading = false,
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
      "bg-brand-500 text-gray-950 shadow-theme-xs hover:bg-brand-400 disabled:bg-brand-500/50",
    outline:
      "bg-transparent text-white border border-brand-500/30 hover:bg-brand-500/10 hover:border-brand-500/50 dark:text-gray-300 dark:border-white/10 dark:bg-[#1C1C24] dark:hover:bg-[#252532] dark:hover:text-white",
    success:
      "bg-success-500 text-white shadow-theme-xs hover:bg-success-600 disabled:bg-success-500/50",
    destructive:
      "bg-error-500 text-white shadow-theme-xs hover:bg-error-600 disabled:bg-error-500/50",
    ghost:
      "bg-transparent text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/[0.05] dark:hover:text-white",
  };

  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 active:scale-[0.98]",
        sizeClasses[size],
        variantClasses[variant],
        (disabled || loading) ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className
      )}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <Loading size="sm" className="border-current" />
      ) : (
        <>
          {startIcon && <span className="flex items-center">{startIcon}</span>}
          <span className="truncate">{children}</span>
          {endIcon && <span className="flex items-center">{endIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
