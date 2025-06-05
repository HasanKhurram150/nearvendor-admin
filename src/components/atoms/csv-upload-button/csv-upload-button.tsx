import React, { useRef } from "react";
import GenericButton from "../generic-button/generic-button";
import { UploadIcon, UploadWhiteIcon } from "@/icons";

const CSVUploadButton = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === "string") {
        console.log("CSV Content:", text);
        // You can parse the CSV string here
      }
    };
    reader.readAsText(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  return (
    <div className="flex items-center justify-center">
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <GenericButton
        icon={<UploadWhiteIcon />}
        btnText="Upload CSV"
        bgColor="#1862D4"
        color="#fff"
        borderColor="#1862D4"
        height="2.5rem"
        width="8.688rem"
        handleClick={handleButtonClick}
      />
    </div>
  );
};

export default CSVUploadButton;
