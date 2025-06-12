import React from "react";
import { GenericButtonProps } from "./generic-button.types";

const GenericButton: React.FC<GenericButtonProps> = ({
  btnText,
  icon,
  bgColor,
  color,
  borderColor = "#1024452E",
  borderRadius = "0.625rem",
  height = "2.75rem",
  width = "2.75rem",
  type = "button",
  disabled,
  disabledBgColor = "#8bb0e9",
  handleClick,
}) => {
  return (
    <button
      disabled={disabled}
      className="flex items-center justify-center gap-2 text-sm px-1 py-1"
      style={{
        backgroundColor: disabled ? disabledBgColor : bgColor,
        background: bgColor,
        border: `1px solid ${borderColor}`,
        borderRadius: borderRadius,
        boxShadow: "0px 1px 2.8px 0px #00000012",
        color: color,
        height: height,
        width: width,
      }}
      onClick={handleClick}
      type={type}
    >
      {icon} {btnText}
    </button>
  );
};

export default GenericButton;
