import React from "react";
import { LoadingProps } from "./loading.types";

const Loading: React.FC<LoadingProps> = ({ size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-4",
    lg: "h-12 w-12 border-[5px]",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-solid border-current border-r-transparent ${sizeClasses[size]}`}
        style={{ animationDuration: "1.5s" }}
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
